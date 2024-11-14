// models/WeeklySchedule.ts
import { Course } from './Course';
import { LectureSchedule } from './LectureSchedule';

export interface WeeklySchedule extends Course {
  lectures: LectureSchedule[];
}