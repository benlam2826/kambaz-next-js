import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export type Assignment = {
  _id: string;
  course: string;
  name: string;
  description: string;
  points: number;
  due: string;
  availableFrom: string;
  availableUntil: string; 
};

type DBRow = Partial<Assignment> & {
  _id: string;
  course: string;
  title?: string;
  available?: string;
};

const normalize = (a: DBRow): Assignment => ({
  _id: a._id,
  course: a.course,
  name: a.name ?? a.title ?? "Untitled Assignment",
  description: a.description ?? "",
  points: typeof a.points === "number" ? a.points : 0,
  due: a.due ?? "",
  availableFrom: a.availableFrom ?? a.available ?? "",
  availableUntil: a.availableUntil ?? "",
});

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: (dbAssignments as DBRow[]).map(normalize),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload }: PayloadAction<Partial<Assignment> & { course: string }>
    ) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        course: payload.course,
        name: payload.name ?? "New Assignment",
        description: payload.description ?? "",
        points: typeof payload.points === "number" ? payload.points : 100,
        due: payload.due ?? "",
        availableFrom: payload.availableFrom ?? "",
        availableUntil: payload.availableUntil ?? "",
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },

    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;