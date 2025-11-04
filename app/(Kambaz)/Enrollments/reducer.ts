import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

const initialState = {
  enrollments: dbEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { user, course } }) => {
      const exists = state.enrollments.some(
        (e: any) => e.user === user && e.course === course
      );
      if (!exists) state.enrollments.push({ user, course } as any);
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;