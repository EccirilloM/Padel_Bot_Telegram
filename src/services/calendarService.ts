// services/calendarService.ts
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { ParsedCourse } from '../models/ParsedCourse';
import { WeeklySchedule } from '../models/WeeklySchedule';
import { filterActiveCourses } from '../utils/calendarUtils';
import { LectureSchedule } from '../models/LectureSchedule';

const prisma = new PrismaClient();

export const addCalendarToPlayer = async (username: string, courses: ParsedCourse[]): Promise<void> => {
  try {
    const player = await prisma.player.findUnique({ where: { username } });
    if (!player) {
      throw new Error(`Nessun giocatore trovato con username ${username}.`);
    }

    for (const courseData of courses) {
      let course = await prisma.course.findUnique({ where: { code: courseData.code } });

      if (!course) {
        course = await prisma.course.create({
          data: {
            code: courseData.code,
            name: courseData.name,
            courseStart: courseData.startDate,
            courseEnd: courseData.endDate,
          },
        });
        console.log(`Creato nuovo corso: ${courseData.code}`);
      } else {
        console.log(`Corso esistente trovato: ${courseData.code}`);
      }

      for (const lectureData of courseData.lectures) {
        const startTime = dayjs(`${lectureData.startTime}`, 'HH:mm').toDate();
        const endTime = dayjs(`${lectureData.endTime}`, 'HH:mm').toDate();

        const existingLecture = await prisma.lecture.findFirst({
          where: {
            courseId: course.id,
            day: lectureData.day,
            startTime: startTime,
            endTime: endTime
          }
        });

        if (!existingLecture) {
          await prisma.lecture.create({
            data: {
              day: lectureData.day,
              startTime,
              endTime,
              courseId: course.id,
            },
          });
          console.log(`Aggiunta nuova lezione per il corso ${courseData.code}: ${lectureData.day} dalle ${lectureData.startTime} alle ${lectureData.endTime}`);
        } else {
          console.log(`Lezione esistente trovata per ${courseData.code}: ${lectureData.day} dalle ${lectureData.startTime} alle ${lectureData.endTime}`);
        }

        const existingCalendar = await prisma.calendar.findFirst({
          where: {
            playerId: player.id,
            courseId: course.id,
            day: lectureData.day,
            startTime: startTime,
            endTime: endTime,
          },
        });

        if (!existingCalendar) {
          await prisma.calendar.create({
            data: {
              playerId: player.id,
              courseId: course.id,
              startTime,
              endTime,
              day: lectureData.day,
            },
          });
          console.log(`Aggiunto calendario per ${username}, corso ${courseData.code}, ${lectureData.day} dalle ${lectureData.startTime} alle ${lectureData.endTime}`);
        } else {
          console.log(`Calendario esistente trovato per ${username}, corso ${courseData.code}, ${lectureData.day} dalle ${lectureData.startTime} alle ${lectureData.endTime}`);
        }
      }
    }
  } catch (error) {
    console.error("Errore durante l'aggiunta del calendario:", error);
    throw new Error("Errore durante l'aggiunta del calendario. Riprova più tardi.");
  }
};

export const getWeeklyScheduleForPlayer = async (username: string): Promise<WeeklySchedule[]> => {
  const player = await prisma.player.findUnique({
    where: { username },
    include: {
      calendars: {
        include: {
          course: {
            include: {
              lectures: true
            }
          }
        }
      }
    }
  });

  if (!player) {
    throw new Error(`Nessun giocatore trovato con username ${username}.`);
  }

  // Creiamo un dizionario per raggruppare le lezioni di ciascun corso
  const coursesMap: { [code: string]: WeeklySchedule } = {};

  player.calendars.forEach(calendar => {
    const { code, name, courseStart, courseEnd } = calendar.course;
    const lecture: LectureSchedule = {
      day: calendar.day,
      startTime: dayjs(calendar.startTime).format('HH:mm'),
      endTime: dayjs(calendar.endTime).format('HH:mm'),
    };

    // Se il corso esiste già nella mappa, aggiungi la lezione
    if (coursesMap[code]) {
      coursesMap[code].lectures.push(lecture);
    } else {
      // Altrimenti, crea un nuovo corso nella mappa
      coursesMap[code] = {
        code,
        name,
        startDate: courseStart,
        endDate: courseEnd,
        lectures: [lecture]
      };
    }
  });

  // Converti la mappa dei corsi in un array e filtra i corsi attivi
  const activeCourses = filterActiveCourses(Object.values(coursesMap));
  return activeCourses;
};