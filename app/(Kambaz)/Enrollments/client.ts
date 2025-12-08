import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchMyEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(
        `${HTTP_SERVER}/api/users/current/enrollments`
    );
    return data;
};

export const enrollInCourse = async (courseId: string) => {
    await axiosWithCredentials.post(`${HTTP_SERVER}/api/courses/${courseId}/enroll`);
};

export const unenrollFromCourse = async (courseId: string) => {
    await axiosWithCredentials.delete(`${HTTP_SERVER}/api/courses/${courseId}/enroll`);
};