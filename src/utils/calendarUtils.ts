// utils/calendarUtils.ts
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ParsedCourse } from '../models/ParsedCourse';

// Estendi dayjs con il plugin customParseFormat per supportare formati di parsing personalizzati
dayjs.extend(customParseFormat);

export function parseCourseData(text: string): ParsedCourse[] {
  const courseBlocks = text.split(/(?=\d{6}\s+-\s+[A-Z\s]+)/g);

  courseBlocks.forEach((block, index) => {
  });

  const courses: ParsedCourse[] = [];

  // Pattern per estrarre le informazioni del corso
  const coursePattern = /(\d+)\s*-\s*([^\(]+)\s+\(Docente: .+\)\s*Inizio lezioni:\s*(\d{2}\/\d{2}\/\d{4})\s+Fine lezioni:\s*(\d{2}\/\d{2}\/\d{4})/;
  
  // Pattern flessibile per estrarre le lezioni
  const lecturePattern = /(Lunedì|Martedì|Mercoledì|Giovedì|Venerdì|Sabato|Domenica)\s+dalle\s+(\d{2}:\d{2})\s+alle\s+(\d{2}:\d{2})/g;

  for (const block of courseBlocks) {
    const courseMatch = coursePattern.exec(block);
    if (!courseMatch) {
      continue;
    }

    const [_, code, name, startDate, endDate] = courseMatch;
    const parsedStartDate = dayjs(startDate, 'DD/MM/YYYY');
    const parsedEndDate = dayjs(endDate, 'DD/MM/YYYY');

    if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
      continue;
    }

    const parsedCourse: ParsedCourse = {
      code,
      name: name.trim(),
      startDate: parsedStartDate.toDate(),
      endDate: parsedEndDate.toDate(),
      lectures: []
    };

    // Estrai tutte le lezioni presenti nel blocco
    const lectures = [...block.matchAll(lecturePattern)];
    lectures.forEach((lectureMatch) => {
      const [_, day, startTime, endTime] = lectureMatch;
      parsedCourse.lectures.push({
        day,
        startTime,
        endTime
      });
    });

    if (parsedCourse.lectures.length === 0) {
    }

    courses.push(parsedCourse);
  }


  return courses;
}

/**
 * Filtra i corsi attivi in base alla data corrente.
 * @param courses Lista dei corsi da filtrare.
 * @returns Corsi che sono ancora attivi.
 */
export function filterActiveCourses(courses: ParsedCourse[]): ParsedCourse[] {
  const today = dayjs();

  return courses.filter(course => 
    dayjs(course.startDate).isBefore(today) && 
    dayjs(course.endDate).isAfter(today)
  );
}
