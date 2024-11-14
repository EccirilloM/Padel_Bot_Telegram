// models/WeeklyPlayerAvailability.ts
import { DailyAvailability } from './DailyAvailability';

export interface WeeklyPlayerAvailability {
    usernames: string[];
    dailyAvailability: DailyAvailability[];
  }