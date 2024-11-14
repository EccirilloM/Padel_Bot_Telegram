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
    await addCoursesAndLecturesToPlayer(player.id, courses);
  } catch (error) {
    throw new Error("Errore durante l'aggiunta del calendario. Riprova più tardi.");
  }
};

export const updateCalendarForPlayer = async (username: string, newCourses: ParsedCourse[]): Promise<void> => {
  const player = await prisma.player.findUnique({ where: { username } });
  if (!player) {
    throw new Error(`Nessun giocatore trovato con username ${username}.`);
  }

  // Elimina il calendario corrente dell'utente
  await prisma.calendar.deleteMany({ where: { playerId: player.id } });

  // Aggiungi i nuovi corsi e le lezioni
  await addCoursesAndLecturesToPlayer(player.id, newCourses);
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

// Helper function per aggiungere corsi e lezioni
async function addCoursesAndLecturesToPlayer(playerId: number, courses: ParsedCourse[]): Promise<void> { // playerId è di tipo number
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
    } else {
    }

    for (const lectureData of courseData.lectures) {
      const startTime = dayjs(`${lectureData.startTime}`, 'HH:mm').toDate();
      const endTime = dayjs(`${lectureData.endTime}`, 'HH:mm').toDate();

      const existingLecture = await prisma.lecture.findFirst({
        where: {
          courseId: course.id,
          day: lectureData.day,
          startTime,
          endTime,
        },
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
      } else {
      }

      const existingCalendar = await prisma.calendar.findFirst({
        where: {
          playerId, // `playerId` è già number
          courseId: course.id,
          day: lectureData.day,
          startTime,
          endTime,
        },
      });

      if (!existingCalendar) {
        await prisma.calendar.create({
          data: {
            playerId, // `playerId` è già number
            courseId: course.id,
            startTime,
            endTime,
            day: lectureData.day,
          },
        });
      } else {
      }
    }
  }
}