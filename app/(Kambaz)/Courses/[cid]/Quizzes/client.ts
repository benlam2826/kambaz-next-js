import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const listQuizzes = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return data;
};

export const createQuiz = async (courseId: string, quiz: any = {}) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const publishQuiz = async (quizId: string, published: boolean) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/publish`,
    { published }
  );
  return data;
};

export const getQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    updates
  );
  return data;
};

export const latestAttempt = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/latest`
  );
  return data;
};

export const attemptsStatus = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/status`
  );
  return data;
};

export const submitAttempt = async (
  quizId: string,
  answers: any[],
  accessCode?: string
) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    { answers, accessCode }
  );
  return data;
};
