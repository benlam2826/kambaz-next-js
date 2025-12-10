"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, FormCheck, FormControl, Spinner } from "react-bootstrap";
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

export default function QuizPreviewPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [shuffledChoices, setShuffledChoices] = useState<Record<string, any[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadQuiz = async () => {
    if (!qid) return;
    setLoading(true);
    setError(null);
    try {
      const data = await quizzesClient.getQuiz(qid);
      setQuiz(data);
      // build per-question shuffled choices if enabled
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

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Grade the quiz based on current answers
  const grade = () => {
    if (!quiz) return;
    let total = 0;
    (quiz.questions || []).forEach((q: Question) => {
      const ans = answers[q._id];
      if (ans === undefined || ans === null) return;
      if (q.type === "MULTIPLE_CHOICE") {
        if (ans === q.correctAnswer) total += q.points || 0;
      } else if (q.type === "TRUE_FALSE") {
        const correct =
          q.correctAnswer === "true"
            ? true
            : q.correctAnswer === "false"
              ? false
              : null;
        if (correct !== null && ans === correct) total += q.points || 0;
      } else if (q.type === "FILL_BLANK") {
        const acceptable = (q.correctAnswers || []).map((a) =>
          (a || "").trim().toLowerCase()
        );
        const normalized = `${ans || ""}`.trim().toLowerCase();
        if (acceptable.includes(normalized)) total += q.points || 0;
      }
    });
    setScore(total);
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

  const totalPoints = (quiz.questions || []).reduce(
    (sum: number, q: Question) => sum + (q.points || 0),
    0
  );

  // Determine if the answer to a question is correct, incorrect, or unanswered
  const isCorrect = (q: Question) => {
    const ans = answers[q._id];
    if (ans === undefined || ans === null) return null;
    if (q.type === "MULTIPLE_CHOICE") return ans === q.correctAnswer;
    if (q.type === "TRUE_FALSE") {
      const correct =
        q.correctAnswer === "true"
          ? true
          : q.correctAnswer === "false"
            ? false
            : null;
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

  return (
    <div className="container pt-3" id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-secondary small mb-1">
            Course {cid} · Preview Quiz
          </div>
          <h3>{quiz.title || "Untitled Quiz"}</h3>
          <div className="text-secondary">
            {totalPoints} pts · {(quiz.questions || []).length} questions
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}`}
            className="btn btn-outline-secondary"
          >
            Back to details
          </Link>
          <Button variant="danger" onClick={grade}>
            Grade Preview
          </Button>
        </div>
      </div>

      {score !== null && (
        <div className="alert alert-info">
          Preview score: {score} / {totalPoints}
          <Button
            size="sm"
            variant="link"
            className="ms-2"
            onClick={() => setScore(null)}
          >
            Clear
          </Button>
        </div>
      )}

      <div className="d-flex flex-column gap-4">
        {/* show one question at a time when configured, otherwise all */}
        {(quiz.oneQuestionAtATime && (quiz.questions || []).length > 0
          ? [quiz.questions[currentIndex]]
          : quiz.questions || []
        ).map((q: Question, idx: number) => {
          const absoluteIndex = quiz.oneQuestionAtATime ? currentIndex : idx;
          const correct = isCorrect(q);
          return (
            <div
              key={q._id}
              className={`border rounded p-3 ${correct === true
                  ? "border-success"
                  : correct === false
                    ? "border-danger"
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
                    onChange={() => setAnswer(q._id, true)}
                  />
                  <FormCheck
                    type="radio"
                    id={`${q._id}-false`}
                    name={`q-${q._id}`}
                    label="False"
                    checked={answers[q._id] === false}
                    onChange={() => setAnswer(q._id, false)}
                  />
                </div>
              )}

              {q.type === "FILL_BLANK" && (
                <div className="mt-2">
                  <FormControl
                    placeholder="Your answer"
                    value={answers[q._id] || ""}
                    onChange={(e) => setAnswer(q._id, e.target.value)}
                  />
                </div>
              )}

              {correct !== null && (
                <div
                  className={`mt-2 small ${correct ? "text-success" : "text-danger"
                    }`}
                >
                  {correct ? "Correct" : "Incorrect"}
                </div>
              )}
            </div>
          );
        })}
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
    </div>
  );
}
