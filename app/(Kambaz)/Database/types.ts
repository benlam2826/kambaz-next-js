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
  title: string;
  points: number;
  due: string;
  available: string;
  description: string;
}