import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  course: string;
  name: string;
  description: string;
  points: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

type NewAssignmentPayload = {
  course: string;
  name: string;
  description: string;
  points: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
};

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload }: PayloadAction<NewAssignmentPayload>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...payload,
      };
      state.assignments.push(newAssignment);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;