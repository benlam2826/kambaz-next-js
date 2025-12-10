"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, FormCheck, FormControl, Spinner, Form } from "react-bootstrap";
import * as quizzesClient from "../../client";

type Question = {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
  title: string;
  prompt: string;
  points: number;
  choices?: { _id: string; text: string }[];
  correctAnswer?: any;
  correctAnswers?: string[];
};

export default function QuizTakePage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [attemptStatus, setAttemptStatus] = useState<any>(null);
  const [accessCode, setAccessCode] = useState<string>("");
  const [accessValidated, setAccessValidated] = useState(false);
  const [inReview, setInReview] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState<
    Record<string, any[]>
  >({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const canShowCorrect = useMemo(() => {
    if (!quiz) return false;
    const mode = quiz.showCorrectAnswers || "NEVER";
    if (mode === "ALWAYS") return true;
    if (mode === "AFTER_DUE") {
      if (!quiz.dueDate) return false;
      return new Date() >= new Date(quiz.dueDate);
    }
    return false; // NEVER or default
  }, [quiz]);

  const loadQuiz = async () => {
    if (!qid) return;
    setLoading(true);
    setError(null);
    try {
      // fetch quiz definition
      const data = await quizzesClient.getQuiz(qid);
      setQuiz(data);
      // prepare shuffled choices when quiz asks for shuffle
      if (data.shuffleAnswers) {
        const choiceMap: Record<string, any[]> = {};
        (data.questions || []).forEach((q: any) => {
          if (q.choices && q.choices.length) {
            const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
            choiceMap[q._id] = shuffled;
          }
        });
        setShuffledChoices(choiceMap);
      } else {
        setShuffledChoices({});
      }
      try {
        // load attempt status for current student
        const status = await quizzesClient.attemptsStatus(qid);
        setAttemptStatus(status);
      } catch {
        setAttemptStatus(null);
      }
      if (data.accessCode && `${data.accessCode}`.trim().length > 0) {
        setAccessValidated(false);
      } else {
        setAccessValidated(true);
      }
      setCurrentIndex(0);
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to load quiz.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid]);

  const availabilityState = useMemo(() => {
    // derive availability status for students (published + window)
    if (!quiz) return { available: false, label: "" };
    if (!quiz.published) {
      return { available: false, label: "Quiz is unpublished." };
    }
    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
    if (from && now < from) {
      return {
        available: false,
        label: `Not available until ${from.toLocaleString()}`,
      };
    }
    if (until && now > until) {
      return { available: false, label: "Quiz is closed." };
    }
    return { available: true, label: "" };
  }, [quiz]);

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const submit = async () => {
    if (!qid) return;
    // enforce availability, attempts, and access code
    if (!availabilityState.available) {
      setError(availabilityState.label || "Quiz not available.");
      return;
    }
    if (attemptStatus && attemptStatus.canAttempt === false) {
      setError("No attempts remaining.");
      return;
    }
    if (quiz.accessCode && quiz.accessCode.trim().length > 0) {
      if (!accessValidated) {
        setError("Unlock with the access code before taking the quiz.");
        return;
      }
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      // submit answers to backend for grading/persistence
      const attempt = await quizzesClient.submitAttempt(
        qid,
        payload,
        accessCode
      );
      setResult(attempt);
      setInReview(true);
      // refresh attempt status
      try {
        const status = await quizzesClient.attemptsStatus(qid);
        setAttemptStatus(status);
      } catch {
        // ignore
      }
      // keep validated for retakes without re-entering during this session view
      setAccessValidated(true);
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to submit attempt.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isCorrect = (q: Question) => {
    // decide correctness for review highlighting
    const ans =
      result?.answers?.find((a: any) => a.questionId === q._id)?.answer ??
      answers[q._id];
    if (ans === undefined || ans === null) return null;
    if (q.type === "MULTIPLE_CHOICE") {
      const correctChoice = (quiz?.questions || []).find(
        (qq: any) => qq._id === q._id
      )?.correctAnswer;
      return ans === correctChoice;
    }
    if (q.type === "TRUE_FALSE") {
      let correct: boolean | null = null;
      if (q.correctAnswer === "true") correct = true;
      else if (q.correctAnswer === "false") correct = false;
      return correct !== null ? ans === correct : null;
    }
    if (q.type === "FILL_BLANK") {
      const acceptable = (q.correctAnswers || []).map((a) =>
        (a || "").trim().toLowerCase()
      );
      const normalized = `${ans || ""}`.trim().toLowerCase();
      return acceptable.includes(normalized);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-3">
        <Spinner size="sm" className="me-2" /> Loading quiz...
      </div>
    );
  }

  if (error) {
    return <div className="p-3 text-danger">{error}</div>;
  }

  if (!quiz) return null;

  return (
    <div className="container pt-3" id="wd-quiz-take">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-secondary small mb-1">
            Course {cid} · Take Quiz
          </div>
          <h3>{quiz.title || "Untitled Quiz"}</h3>
          <div className="text-secondary">
            {quiz.points || 0} pts · {(quiz.questions || []).length} questions
          </div>
        </div>
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}`}
          className="btn btn-outline-secondary"
        >
          Back to details
        </Link>
      </div>

      {result && (
        <div className="alert alert-success">
          Submitted. Score: {result.score}
          {attemptStatus && attemptStatus.canAttempt && (
            <Button
              size="sm"
              variant="link"
              className="ps-2"
              onClick={() => {
                setResult(null);
                setAnswers({});
                setInReview(false);
              }}
            >
              Take again
            </Button>
          )}
          {!canShowCorrect && (
            <div className="small text-secondary">
              Correct answers are hidden until the allowed time.
            </div>
          )}
        </div>
      )}

      {attemptStatus && (
        <div className="alert alert-info">
          Attempts: {attemptStatus.attemptsUsed} / {attemptStatus.maxAttempts}{" "}
          {attemptStatus.latestAttempt
            ? `(Last score: ${attemptStatus.latestAttempt.score})`
            : "(No attempts yet)"}
        </div>
      )}

      {quiz.accessCode && quiz.accessCode.trim().length > 0 && !accessValidated && (
        <div className="alert alert-warning">
          <Form className="d-flex flex-column gap-2">
            <Form.Label className="mb-0 fw-semibold">Access Code Required</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter access code to unlock"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  if (quiz.accessCode === accessCode) {
                    setAccessValidated(true);
                    setError(null);
                  } else {
                    setError("Incorrect access code.");
                  }
                }}
              >
                Unlock
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setAccessCode("");
                  setError(null);
                }}
              >
                Clear
              </Button>
            </div>
          </Form>
        </div>
      )}

      {!availabilityState.available && (
        <div className="alert alert-warning">{availabilityState.label}</div>
      )}

      {(!quiz.accessCode || quiz.accessCode.trim().length === 0 || accessValidated) && (
        <div className="d-flex flex-column gap-4">
          {/* show a single question with nav when oneQuestionAtATime is on */}
          {(quiz.oneQuestionAtATime && (quiz.questions || []).length > 0
            ? [quiz.questions[currentIndex]]
            : quiz.questions || []
          ).map((q: Question, idx: number) => {
            const absoluteIndex = quiz.oneQuestionAtATime
              ? currentIndex
              : idx;
            return (
            <div
              key={q._id}
              className={`border rounded p-3 ${
                inReview && canShowCorrect
                  ? isCorrect(q) === true
                    ? "border-success"
                    : isCorrect(q) === false
                    ? "border-danger"
                    : ""
                  : ""
              }`}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">
                    Q{absoluteIndex + 1}. {q.title}
                  </div>
                  <div className="text-secondary">{q.prompt}</div>
                </div>
                <div className="text-secondary">{q.points} pts</div>
              </div>

              {q.type === "MULTIPLE_CHOICE" && (
                <div className="mt-2 d-flex flex-column gap-2">
                  {(shuffledChoices[q._id] || q.choices || []).map((choice) => (
                    <FormCheck
                      key={choice._id}
                      type="radio"
                      id={`${q._id}-${choice._id}`}
                      name={`q-${q._id}`}
                      label={choice.text}
                      checked={answers[q._id] === choice._id}
                      disabled={inReview}
                      onChange={() => setAnswer(q._id, choice._id)}
                    />
                  ))}
                </div>
              )}

              {q.type === "TRUE_FALSE" && (
                <div className="mt-2 d-flex flex-column gap-2">
                  <FormCheck
                    type="radio"
                    id={`${q._id}-true`}
                    name={`q-${q._id}`}
                    label="True"
                    checked={answers[q._id] === true}
                    disabled={inReview}
                    onChange={() => setAnswer(q._id, true)}
                  />
                  <FormCheck
                    type="radio"
                    id={`${q._id}-false`}
                    name={`q-${q._id}`}
                    label="False"
                    checked={answers[q._id] === false}
                    disabled={inReview}
                    onChange={() => setAnswer(q._id, false)}
                  />
                </div>
              )}

              {q.type === "FILL_BLANK" && (
                <div className="mt-2">
                  <FormControl
                    placeholder="Your answer"
                    value={answers[q._id] || ""}
                    disabled={inReview}
                    onChange={(e) => setAnswer(q._id, e.target.value)}
                  />
                </div>
              )}

              {inReview && canShowCorrect && (
                <div
                  className={`mt-2 small ${
                    isCorrect(q) ? "text-success" : "text-danger"
                  }`}
                >
                  {isCorrect(q) ? "Correct" : "Incorrect"}
                </div>
              )}
            </div>
          )})}
          {quiz.oneQuestionAtATime && (quiz.questions || []).length > 1 && (
            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <div className="text-secondary">
                Question {currentIndex + 1} of {quiz.questions.length}
              </div>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setCurrentIndex((i) =>
                    Math.min((quiz.questions || []).length - 1, i + 1)
                  )
                }
                disabled={currentIndex >= (quiz.questions || []).length - 1}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 d-flex gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={
            submitting ||
            (!availabilityState.available ||
              (attemptStatus && attemptStatus.canAttempt === false) ||
              (quiz.accessCode &&
                quiz.accessCode.trim().length > 0 &&
                !accessValidated))
          }
          onClick={submit}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
