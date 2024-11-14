// models/PlayerAvailability.ts
import { TimeSlot } from './TimeSlot';

export interface PlayerAvailability {
  username: string;
  level: number;
  freeSlots: TimeSlot[];
}