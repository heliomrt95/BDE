// src/types/program.ts

export type CourseType = 'mandatory' | 'elective' | 'workshop';
export type Semester = 1 | 2 | 3 | 4 | 5 | 6;

export interface Course {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  semester: Semester;
  credits: number;
  instructor?: string;
  tags: string[];
}
