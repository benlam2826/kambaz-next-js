import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const fetchMyEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(
        `${USERS_API}/current/enrollments`
    );
    return data;
};

export const enrollInCourse = async (courseId: string) => {
    await axiosWithCredentials.post(`${COURSES_API}/${courseId}/enroll`);
};

export const unenrollFromCourse = async (courseId: string) => {
    await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/enroll`);
};