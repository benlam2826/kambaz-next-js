"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  Nav,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as quizzesClient from "../../client";

type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";

type Question = {
  _id: string;
  type: QuestionType;
  title: string;
  prompt: string;
  points: number;
  choices?: { _id: string; text: string }[];
  correctAnswer?: any;
  correctAnswers?: string[];
};

const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatDateTimeLocal = (value: any) => {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => `${n}`.padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function QuizEditPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"DETAILS" | "QUESTIONS">(
    "DETAILS"
  );
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useAccessCode, setUseAccessCode] = useState(false);

  const isFaculty = useMemo(
    () => currentUser?.role === "FACULTY",
    [currentUser]
  );

  const loadQuiz = async () => {
    if (!qid) return;
    setLoading(true);
    setError(null);
    try {
      // fetch quiz to populate editor
      const data = await quizzesClient.getQuiz(qid);
      setQuiz(data);
      setUseAccessCode(!!(data?.accessCode && `${data.accessCode}`.trim().length > 0));
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

  const updateQuizField = (field: string, value: any) => {
    setQuiz((q: any) => ({ ...q, [field]: value }));
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    setQuiz((q: any) => ({
      ...q,
      questions: (q?.questions || []).map((question: Question) =>
        question._id === id ? { ...question, ...patch } : question
      ),
    }));
  };

  const addQuestion = () => {
    const q: Question = {
      _id: newId(),
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      prompt: "",
      points: 1,
      choices: [
        { _id: newId(), text: "Choice 1" },
        { _id: newId(), text: "Choice 2" },
        { _id: newId(), text: "Choice 3" },
      ],
      correctAnswer: "",
    };
    setQuiz((quiz: any) => ({
      ...quiz,
      questions: [...(quiz?.questions || []), q],
    }));
  };

  const removeQuestion = (id: string) => {
    setQuiz((quiz: any) => ({
      ...quiz,
      questions: (quiz?.questions || []).filter((q: Question) => q._id !== id),
    }));
  };

  const save = async (publishAfter = false) => {
    if (!qid) return;
    setSaving(true);
    setError(null);
    try {
      // apply access-code toggle before save
      const payload = {
        ...quiz,
        accessCode: useAccessCode ? quiz.accessCode : "",
      };
      const updated = await quizzesClient.updateQuiz(qid, payload);
      if (publishAfter) {
        await quizzesClient.publishQuiz(qid, true);
      }
      setQuiz(updated);
      if (publishAfter) {
        router.push(`/Courses/${cid}/Quizzes`);
      } else {
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e?.message || "Failed to save quiz.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !quiz) {
    return (
      <div className="p-3">
        {loading && (
          <>
            <Spinner size="sm" className="me-2" /> Loading quiz...
          </>
        )}
        {!loading && !quiz && "Quiz not found"}
      </div>
    );
  }

  if (!isFaculty) {
    return (
      <div className="p-3 text-danger">
        Only faculty can edit quizzes.{" "}
        <Link href={`/Courses/${cid}/Quizzes/${qid}`}>Back</Link>
      </div>
    );
  }

  const totalPoints = (quiz.questions || []).reduce(
    (sum: number, q: Question) => sum + (q.points || 0),
    0
  );

  return (
    <div className="container pt-3" id="wd-quiz-editor">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-secondary small mb-1">
            Course {cid} · Edit Quiz
          </div>
          <h3 className="mb-1">{quiz.title || "Untitled Quiz"}</h3>
          <div className="text-secondary">
            {quiz.published ? "Published ✅" : "Unpublished 🚫"} · {totalPoints}{" "}
            pts · {(quiz.questions || []).length} questions
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
          >
            Cancel
          </Button>
          <Button variant="secondary" disabled={saving} onClick={() => save()}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="danger"
            disabled={saving}
            onClick={() => save(true)}
          >
            {saving ? "Saving..." : "Save & Publish"}
          </Button>
        </div>
      </div>

      {error && <div className="text-danger mb-2">{error}</div>}

      <Nav variant="tabs" activeKey={activeTab} className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="DETAILS" onClick={() => setActiveTab("DETAILS")}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="QUESTIONS"
            onClick={() => setActiveTab("QUESTIONS")}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "DETAILS" && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <FormControl
              value={quiz.title || ""}
              onChange={(e) => updateQuizField("title", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows={4}
              value={quiz.description || ""}
              onChange={(e) => updateQuizField("description", e.target.value)}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) => updateQuizField("quizType", e.target.value)}
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) =>
                    updateQuizField("assignmentGroup", e.target.value)
                  }
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (minutes)</Form.Label>
                <FormControl
                  type="number"
                  min={0}
                  value={quiz.timeLimit || 0}
                  onChange={(e) =>
                    updateQuizField("timeLimit", Number(e.target.value))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="accessCodeToggle"
                  label="Require Access Code"
                  checked={useAccessCode}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    setUseAccessCode(enabled);
                    if (!enabled) {
                      updateQuizField("accessCode", "");
                    }
                  }}
                />
                {useAccessCode && (
                  <FormControl
                    className="mt-2"
                    value={quiz.accessCode || ""}
                    placeholder="Enter access code"
                    onChange={(e) =>
                      updateQuizField("accessCode", e.target.value)
                    }
                  />
                )}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="shuffle"
                  label="Shuffle Answers"
                  checked={!!quiz.shuffleAnswers}
                  onChange={(e) =>
                    updateQuizField("shuffleAnswers", e.target.checked)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="multipleAttempts"
                  label="Multiple Attempts"
                  checked={!!quiz.multipleAttempts}
                  onChange={(e) =>
                    updateQuizField("multipleAttempts", e.target.checked)
                  }
                />
              </Form.Group>
              {quiz.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>Max Attempts</Form.Label>
                  <FormControl
                    type="number"
                    min={1}
                    value={quiz.maxAttempts || 1}
                    onChange={(e) =>
                      updateQuizField("maxAttempts", Number(e.target.value))
                    }
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="oneQuestionAtATime"
                  label="One Question at a Time"
                  checked={!!quiz.oneQuestionAtATime}
                  onChange={(e) =>
                    updateQuizField("oneQuestionAtATime", e.target.checked)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Select
                  value={quiz.showCorrectAnswers || "NEVER"}
                  onChange={(e) =>
                    updateQuizField("showCorrectAnswers", e.target.value)
                  }
                >
                  <option value="NEVER">Never</option>
                  <option value="AFTER_DUE">After due date</option>
                  <option value="ALWAYS">Always</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="webcamRequired"
                  label="Webcam Required"
                  checked={!!quiz.webcamRequired}
                  onChange={(e) =>
                    updateQuizField("webcamRequired", e.target.checked)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormCheck
                  type="switch"
                  id="lockAfterAnswer"
                  label="Lock Questions After Answering"
                  checked={!!quiz.lockAfterAnswer}
                  onChange={(e) =>
                    updateQuizField("lockAfterAnswer", e.target.checked)
                  }
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <FormControl
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.dueDate)}
                  onChange={(e) => updateQuizField("dueDate", e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <FormControl
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.availableFrom)}
                  onChange={(e) =>
                    updateQuizField("availableFrom", e.target.value)
                  }
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Available Until</Form.Label>
                <FormControl
                  type="datetime-local"
                  value={formatDateTimeLocal(quiz.availableUntil)}
                  onChange={(e) =>
                    updateQuizField("availableUntil", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      )}

      {activeTab === "QUESTIONS" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Questions</h5>
            <Button variant="outline-danger" onClick={addQuestion}>
              + New Question
            </Button>
          </div>
          {(quiz.questions || []).length === 0 && (
            <div className="text-secondary">No questions yet.</div>
          )}
          <div className="d-flex flex-column gap-3">
            {(quiz.questions || []).map((question: Question) => (
              <div key={question._id} className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>{question.title || "Untitled Question"}</strong>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Select
                      size="sm"
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(question._id, {
                          type: e.target.value as QuestionType,
                          correctAnswer:
                            e.target.value === "TRUE_FALSE"
                              ? "true"
                              : question.correctAnswer,
                          correctAnswers:
                            e.target.value === "FILL_BLANK"
                              ? question.correctAnswers || [""]
                              : [],
                        })
                      }
                    >
                      <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                      <option value="TRUE_FALSE">True/False</option>
                      <option value="FILL_BLANK">Fill in the Blank</option>
                    </Form.Select>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => removeQuestion(question._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <FormControl
                    value={question.title || ""}
                    onChange={(e) =>
                      updateQuestion(question._id, { title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Prompt</Form.Label>
                  <FormControl
                    as="textarea"
                    rows={3}
                    value={question.prompt || ""}
                    onChange={(e) =>
                      updateQuestion(question._id, { prompt: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Points</Form.Label>
                  <FormControl
                    type="number"
                    min={0}
                    value={question.points || 0}
                    onChange={(e) =>
                      updateQuestion(question._id, {
                        points: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>

                {question.type === "MULTIPLE_CHOICE" && (
                  <div>
                    <Form.Label>Choices (select the correct one)</Form.Label>
                    <div className="d-flex flex-column gap-2">
                      {(question.choices || []).map((choice, idx) => (
                        <div
                          key={choice._id}
                          className="d-flex align-items-center gap-2"
                        >
                          <FormCheck
                            type="radio"
                            name={`correct-${question._id}`}
                            checked={question.correctAnswer === choice._id}
                            onChange={() =>
                              updateQuestion(question._id, {
                                correctAnswer: choice._id,
                              })
                            }
                          />
                          <FormControl
                            value={choice.text || ""}
                            onChange={(e) => {
                              const newChoices = [...(question.choices || [])];
                              newChoices[idx] = {
                                ...choice,
                                text: e.target.value,
                              };
                              updateQuestion(question._id, {
                                choices: newChoices,
                              });
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => {
                              const newChoices = (question.choices || []).filter(
                                (c) => c._id !== choice._id
                              );
                              updateQuestion(question._id, {
                                choices: newChoices,
                                correctAnswer:
                                  question.correctAnswer === choice._id
                                    ? ""
                                    : question.correctAnswer,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          const newChoices = [
                            ...(question.choices || []),
                            { _id: newId(), text: "New choice" },
                          ];
                          updateQuestion(question._id, { choices: newChoices });
                        }}
                      >
                        + Choice
                      </Button>
                    </div>
                  </div>
                )}

                {question.type === "TRUE_FALSE" && (
                  <div>
                    <Form.Label>Answer</Form.Label>
                    <div className="d-flex gap-3">
                      <FormCheck
                        type="radio"
                        id={`${question._id}-true`}
                        label="True"
                        name={`tf-${question._id}`}
                        checked={question.correctAnswer === "true"}
                        onChange={() =>
                          updateQuestion(question._id, {
                            correctAnswer: "true",
                          })
                        }
                      />
                      <FormCheck
                        type="radio"
                        id={`${question._id}-false`}
                        label="False"
                        name={`tf-${question._id}`}
                        checked={question.correctAnswer === "false"}
                        onChange={() =>
                          updateQuestion(question._id, {
                            correctAnswer: "false",
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {question.type === "FILL_BLANK" && (
                  <div>
                    <Form.Label>Accepted Answers</Form.Label>
                    <div className="d-flex flex-column gap-2">
                      {(question.correctAnswers || [""]).map(
                        (ans: string, idx: number) => (
                          <div
                            key={`${question._id}-ans-${idx}`}
                            className="d-flex gap-2"
                          >
                            <FormControl
                              value={ans}
                              onChange={(e) => {
                                const updated = [
                                  ...(question.correctAnswers || []),
                                ];
                                updated[idx] = e.target.value;
                                updateQuestion(question._id, {
                                  correctAnswers: updated,
                                });
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                const updated = [
                                  ...(question.correctAnswers || []),
                                ].filter((_, i) => i !== idx);
                                updateQuestion(question._id, {
                                  correctAnswers: updated,
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          const updated = [
                            ...(question.correctAnswers || []),
                            "",
                          ];
                          updateQuestion(question._id, {
                            correctAnswers: updated,
                          });
                        }}
                      >
                        + Answer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
