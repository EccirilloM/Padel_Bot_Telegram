// models/WeeklyPlayerAvailability.ts
import { TimeSlot } from './TimeSlot';

export interface DailyAvailability {
  day: string;
  freeSlots: TimeSlot[];
}