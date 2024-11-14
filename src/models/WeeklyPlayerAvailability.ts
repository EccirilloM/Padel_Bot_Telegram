// models/WeeklyPlayerAvailability.ts
import { DailyAvailability } from './DailyAvailability';

export interface WeeklyPlayerAvailability {
    username: string;
    dailyAvailability: DailyAvailability[];
  }