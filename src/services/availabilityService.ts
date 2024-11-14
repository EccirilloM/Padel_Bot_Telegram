// services/availabilityService.ts
import { PrismaClient } from '@prisma/client';
import { calculateFreeSlots } from '../utils/timeUtils';
import { getWeeklyScheduleForPlayer } from './calendarService';
import { PlayerAvailability } from '../models/PlayerAvailability';
import { TimeSlot } from '../models/TimeSlot';
import { WeeklyPlayerAvailability } from '../models/WeeklyPlayerAvailability';
import { DailyAvailability } from '../models/DailyAvailability';

const prisma = new PrismaClient();

export const getPlayerAvailabilityForDay = async (day: string, requestingUsername: string): Promise<PlayerAvailability[]> => {
    const players = await prisma.player.findMany({
        where: { NOT: { username: requestingUsername } },
    });
  
    const availability: PlayerAvailability[] = [];
  
    for (const player of players) {
      // Ottieni l'orario settimanale filtrato per corsi attivi
      const weeklySchedule = await getWeeklyScheduleForPlayer(player.username);
      
      // Filtra solo le lezioni per il giorno richiesto
      const occupiedSlots: TimeSlot[] = weeklySchedule
        .flatMap(course => course.lectures)
        .filter(lecture => lecture.day.toLowerCase() === day.toLowerCase())
        .map(lecture => ({
          startTime: lecture.startTime,
          endTime: lecture.endTime,
        }));
  
      // Calcola gli slot liberi per il giocatore
      const freeSlots = calculateFreeSlots(occupiedSlots);
  
      if (freeSlots.length > 0) {
        availability.push({
          username: player.username,
          level: player.level,
          freeSlots,
        });
      }
    }
  
    return availability;
};

export const getMutualWeeklyAvailability = async (
  requestingUsername: string,
  targetUsername: string
): Promise<WeeklyPlayerAvailability | null> => {
  const requestingPlayerSchedule = await getWeeklyScheduleForPlayer(requestingUsername);
  const targetPlayerSchedule = await getWeeklyScheduleForPlayer(targetUsername);

  const dailyAvailability: DailyAvailability[] = [];

  const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  for (const day of daysOfWeek) {
    // Recupera gli slot occupati per ciascun utente nel giorno specifico
    const occupiedSlotsRequestingUser = requestingPlayerSchedule
      .flatMap(course => course.lectures)
      .filter(lecture => lecture.day.toLowerCase() === day.toLowerCase())
      .map(lecture => ({
        startTime: lecture.startTime,
        endTime: lecture.endTime,
      }));

    const occupiedSlotsTargetUser = targetPlayerSchedule
      .flatMap(course => course.lectures)
      .filter(lecture => lecture.day.toLowerCase() === day.toLowerCase())
      .map(lecture => ({
        startTime: lecture.startTime,
        endTime: lecture.endTime,
      }));

    // Unisci gli slot occupati dei due utenti e ordina cronologicamente
    const combinedOccupiedSlots: TimeSlot[] = [...occupiedSlotsRequestingUser, ...occupiedSlotsTargetUser]
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    // Calcola gli slot liberi comuni basati sugli slot occupati combinati
    const mutualFreeSlots = calculateFreeSlots(combinedOccupiedSlots);

    // Aggiungi la disponibilità giornaliera alla lista settimanale
    dailyAvailability.push({
      day,
      freeSlots: mutualFreeSlots,
    });
  }

  return {
    username: targetUsername,
    dailyAvailability,
  };
};