"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";
import * as quizzesClient from "../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";
  const [attemptStatus, setAttemptStatus] = useState<any>(null);

  const loadQuiz = async () => {
    if (!qid) return;
    setLoading(true);
    setError(null);
    try {
      // fetch quiz details; server enforces student visibility
      const data = await quizzesClient.getQuiz(qid);
      setQuiz(data);
      if (isStudent) {
        try {
          // load attempt counts/last score for the current student
          const status = await quizzesClient.attemptsStatus(qid);
          setAttemptStatus(status);
        } catch {
          setAttemptStatus(null);
        }
      } else {
        setAttemptStatus(null);
      }
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

  const handlePublishToggle = async () => {
    if (!qid || !quiz) return;
    try {
      // publish/unpublish and refresh local state
      const updated = await quizzesClient.publishQuiz(qid, !quiz.published);
      setQuiz(updated);
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to update publish.";
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="p-3">
        <Spinner animation="border" size="sm" className="me-2" />
        Loading quiz...
      </div>
    );
  }

  if (error) {
    return <div className="text-danger p-3">{error}</div>;
  }

  if (!quiz) return null;

  return (
    <div className="container pt-3" id="wd-quiz-details">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-secondary small mb-1">
            Course {cid} · Quiz
          </div>
          <h3 className="mb-1">{quiz.title || "Untitled Quiz"}</h3>
          <div className="text-secondary">
            {quiz.published ? "Published ✅" : "Unpublished 🚫"} ·{" "}
            {quiz.points || 0} pts · {(quiz.questions || []).length} questions
          </div>
        </div>
        {isFaculty && (
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={handlePublishToggle}>
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Link href={`/Courses/${cid}/Quizzes/${qid}/preview`} className="btn btn-outline-secondary">
              Preview
            </Link>
            <Link href={`/Courses/${cid}/Quizzes/${qid}/edit`} className="btn btn-danger">
              Edit
            </Link>
          </div>
        )}
        {isStudent && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/take`}
            className={`btn btn-danger ${attemptStatus && attemptStatus.canAttempt === false ? "disabled" : ""
              }`}
            aria-disabled={attemptStatus && attemptStatus.canAttempt === false ? "true" : "false"}
          >
            {attemptStatus && attemptStatus.canAttempt === false
              ? "No attempts remaining"
              : "Take Quiz"}
          </Link>
        )}
      </div>

      <div className="mb-3">{quiz.description}</div>

      <div className="row">
        <div className="col-md-6">
          <div><strong>Type:</strong> {quiz.quizType}</div>
          <div><strong>Assignment Group:</strong> {quiz.assignmentGroup}</div>
          <div><strong>Time Limit:</strong> {quiz.timeLimit} minutes</div>
          <div>
            <strong>Multiple Attempts:</strong>{" "}
            {quiz.multipleAttempts ? `Yes (${quiz.maxAttempts})` : "No"}
          </div>
          <div><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</div>
          <div>
            <strong>Show Correct Answers:</strong>{" "}
            {quiz.showCorrectAnswers === "ALWAYS"
              ? "Always"
              : quiz.showCorrectAnswers === "AFTER_DUE"
              ? "After due date"
              : "Never"}
          </div>
        </div>
        <div className="col-md-6">
          {quiz.dueDate && (
            <div>
              <strong>Due:</strong>{" "}
              {new Date(quiz.dueDate).toLocaleString()}
            </div>
          )}
          {quiz.availableFrom && (
            <div>
              <strong>Available From:</strong>{" "}
              {new Date(quiz.availableFrom).toLocaleString()}
            </div>
          )}
          {quiz.availableUntil && (
            <div>
              <strong>Until:</strong>{" "}
              {new Date(quiz.availableUntil).toLocaleString()}
            </div>
          )}
          <div>
            <strong>Access Code:</strong>{" "}
            {quiz.accessCode && quiz.accessCode.trim().length > 0
              ? "Required"
              : "None"}
          </div>
          <div>
            <strong>One Question at a Time:</strong>{" "}
            {quiz.oneQuestionAtATime ? "Yes" : "No"}
          </div>
        </div>
      </div>

      {isStudent && attemptStatus && (
        <div className="mt-3">
          <strong>Attempts:</strong> {attemptStatus.attemptsUsed} /{" "}
          {attemptStatus.maxAttempts}{" "}
          {attemptStatus.latestAttempt
            ? `(Last score: ${attemptStatus.latestAttempt.score})`
            : "(No attempts yet)"}
        </div>
      )}
    </div>
  );
}
