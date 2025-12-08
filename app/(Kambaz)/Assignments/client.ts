import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(
    `${HTTP_SERVER}/api/courses/${courseId}/assignments`
  );
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get(
    `${HTTP_SERVER}/api/assignments/${assignmentId}`
  );
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/courses/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/assignments/${assignmentId}`
  );
  return data;
};
