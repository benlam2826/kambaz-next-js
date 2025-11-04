import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as dbCourses } from "../../Database";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: string;
  department?: string;
  credits?: number;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: dbCourses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = [...state.courses, payload];
    },
    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) => (c._id === payload._id ? payload : c));
    },
    setCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;