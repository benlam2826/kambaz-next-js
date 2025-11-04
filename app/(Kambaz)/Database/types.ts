export interface Course {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Lesson {
  _id?: string;
  name: string;
  description?: string;
  module?: string;
}

export interface Module {
  _id: string;
  course: string;
  name: string;
  description?: string;
  lessons?: Lesson[];
}

export interface Assignment {
  _id: string;
  course: string;
  name: string;
  description: string;
  points: number;
  due: string;
  availableFrom: string;
  availableUntil: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section?: string;
  dob: string;
  role: "STUDENT" | "TA" | "FACULTY" | string;
  lastActivity?: string;
  totalActivity?: string;
}


export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}