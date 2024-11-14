// utils/timeUtils.ts
import dayjs from 'dayjs';
import { LectureSchedule } from '../models/LectureSchedule';
import { TimeSlot } from '../models/TimeSlot';

/**
 * Calcola gli slot liberi a partire da una lista di slot occupati e un orario di apertura e chiusura.
 * @param occupiedSlots Lista degli slot occupati
 * @param openTime Orario di apertura, es. "08:30"
 * @param closeTime Orario di chiusura, es. "21:30"
 * @returns Lista degli slot liberi
 */
export function calculateFreeSlots(occupiedSlots: TimeSlot[], openTime = '08:30', closeTime = '21:30'): TimeSlot[] {
    const freeSlots: TimeSlot[] = [];
    const startOfDay = dayjs(openTime, 'HH:mm');
    const endOfDay = dayjs(closeTime, 'HH:mm');
  
    let currentStart = startOfDay;
  
    for (const slot of occupiedSlots) {
      const slotStart = dayjs(slot.startTime, 'HH:mm');
      const slotEnd = dayjs(slot.endTime, 'HH:mm');
  
      if (currentStart.isBefore(slotStart)) {
        freeSlots.push({
          startTime: currentStart.format('HH:mm'),
          endTime: slotStart.format('HH:mm')
        });
      }
      currentStart = slotEnd.isAfter(currentStart) ? slotEnd : currentStart;
    }
  
    if (currentStart.isBefore(endOfDay)) {
      freeSlots.push({
        startTime: currentStart.format('HH:mm'),
        endTime: endOfDay.format('HH:mm')
      });
    }
  
    return freeSlots;
  }