"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaRegEdit, FaTrashAlt, FaCheckCircle, FaBan } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as quizzesClient from "./client";

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  published: boolean;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  points?: number;
  questions?: any[];
};

export default function QuizzesPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, any>>({});

  const isFaculty = useMemo(
    () => currentUser?.role === "FACULTY",
    [currentUser]
  );
  const isStudent = useMemo(
    () => currentUser?.role === "STUDENT",
    [currentUser]
  );

  const fetchQuizzes = async () => {
    if (!cid) return;
    setLoading(true);
    setError(null);
    try {
      // load quizzes for this course (server already role-filters)
      const data = await quizzesClient.listQuizzes(cid);
      // sort by availability (earliest first), then title as a tie-breaker
      const sorted = [...(data || [])].sort((a, b) => {
        const aDate = a.availableFrom ? new Date(a.availableFrom).getTime() : Infinity;
        const bDate = b.availableFrom ? new Date(b.availableFrom).getTime() : Infinity;
        if (aDate !== bDate) return aDate - bDate;
        return (a.title || "").localeCompare(b.title || "");
      });
      setQuizzes(sorted);

      if (isStudent && data?.length) {
        const attemptsByQuiz: Record<string, any> = {};
        await Promise.all(
          data.map(async (q: any) => {
            try {
              const attempt = await quizzesClient.latestAttempt(q._id);
              attemptsByQuiz[q._id] = attempt;
            } catch {
              // ignore per-quiz errors
            }
          })
        );
        setAttempts(attemptsByQuiz);
      } else {
        setAttempts({});
      }
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load quizzes. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, isStudent]);

  const handleCreate = async () => {
    if (!cid) return;
    try {
      const quiz = await quizzesClient.createQuiz(cid, { title: "New Quiz" });
      router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to create quiz.";
      setError(message);
    }
  };

  const handlePublishToggle = async (quizId: string, published: boolean) => {
    try {
      await quizzesClient.publishQuiz(quizId, published);
      fetchQuizzes();
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to update publish.";
      setError(message);
    }
  };

  const handleDelete = async (quizId: string) => {
    if (!window.confirm("Delete this quiz?")) return;
    try {
      await quizzesClient.deleteQuiz(quizId);
      fetchQuizzes();
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to delete quiz.";
      setError(message);
    }
  };

  const availabilityLabel = (quiz: Quiz) => {
    // derive student-facing availability text
    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
    if (from && now < from) {
      return `Not available until ${from.toLocaleDateString()}`;
    }
    if (until && now > until) {
      return "Closed";
    }
    return "Available";
  };

  return (
    <div id="wd-quizzes" className="container pt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Quizzes</h3>
        {isFaculty && (
          <Button variant="danger" onClick={handleCreate} className="d-flex align-items-center">
            <FaPlus className="me-2" /> Quiz
          </Button>
        )}
      </div>

      {loading && <div>Loading quizzes...</div>}
      {error && <div className="text-danger mb-2">{error}</div>}

      {!loading && quizzes.length === 0 && (
        <div className="text-secondary">
          No quizzes yet. {isFaculty ? "Click + Quiz to add one." : ""}
        </div>
      )}

      <div className="list-group">
        {quizzes.map((quiz) => {
          const publishedIcon = quiz.published ? (
            <FaCheckCircle className="text-success" />
          ) : (
            <FaBan className="text-danger" />
          );
          const questionsCount = quiz.questions ? quiz.questions.length : 0;
          const attempt = attempts[quiz._id];
          return (
            <div
              key={quiz._id}
              className="list-group-item d-flex justify-content-between align-items-start">
              <div className="me-3">
                <div className="d-flex align-items-center mb-1">
                  <Button
                    variant="link"
                    className="p-0 me-2"
                    onClick={() =>
                      handlePublishToggle(quiz._id, !quiz.published)
                    }
                    disabled={!isFaculty}
                    title={quiz.published ? "Unpublish" : "Publish"}>
                    {publishedIcon}
                  </Button>
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="fw-semibold text-decoration-none">
                    {quiz.title || "Untitled Quiz"}
                  </Link>
                </div>
                <div className="text-secondary small">
                  <div>{availabilityLabel(quiz)}</div>
                  {quiz.dueDate && (
                    <div>Due {new Date(quiz.dueDate).toLocaleString()}</div>
                  )}
                  <div>
                    {quiz.points || 0} pts · {questionsCount} questions
                    {isStudent && attempt
                      ? ` · Score: ${attempt.score ?? 0}`
                      : ""}
                  </div>
                </div>
              </div>
              {isFaculty && (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id={`quiz-menu-${quiz._id}`}>
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}>
                      <FaRegEdit className="me-2" />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                      <FaTrashAlt className="me-2" />
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handlePublishToggle(quiz._id, !quiz.published)
                      }>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
