import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
  showAll: boolean;
}

const initialState: EnrollmentsState = {
  enrollments: [],
  showAll: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (s, { payload }: PayloadAction<Enrollment[]>) => {
      s.enrollments = payload;
    },
    toggleShowAll: (s) => {
      s.showAll = !s.showAll;
    },
    enroll: (s, { payload }: PayloadAction<Enrollment>) => {
      const exists = s.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) s.enrollments.push(payload);
    },
    unenroll: (s, { payload }: PayloadAction<Enrollment>) => {
      s.enrollments = s.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, toggleShowAll, enroll, unenroll } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;