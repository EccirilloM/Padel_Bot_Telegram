import { ParsedLecture } from './ParsedLectures';

export interface ParsedCourse {
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    lectures: ParsedLecture[];
  }