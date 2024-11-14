// commands/showScheduleWeekCommand.ts
import { Telegraf, Context } from 'telegraf';
import { getWeeklyScheduleForPlayer } from '../services/calendarService';
import { isTextMessage, parseCommandArguments, escapeMarkdown } from '../utils/messageUtils';
import dayjs from 'dayjs';

const showScheduleWeekCommand = (bot: Telegraf) => {
  bot.command('showscheduleweek', async (ctx: Context) => {
    try {
      const message = ctx.message;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, usa il comando /showscheduleweek con il testo corretto.');
        return;
      }

      const result = parseCommandArguments(message.text);
      if (!result) {
        ctx.reply('Non è stato possibile rilevare l’username.');
        return;
      }

      const { usernames } = result;

      let response = '*Orario settimanale dei corsi attivi:*\n\n';

      for (const username of usernames) {
        const schedule = await getWeeklyScheduleForPlayer(username);

        if (schedule.length === 0) {
          response += `Non ci sono corsi attivi per questa settimana per @${username}.\n\n`;
          continue;
        }

        response += `*Orario settimanale per @${escapeMarkdown(username)}:*\n\n`;
        schedule.forEach(course => {
          response += `*${escapeMarkdown(course.code)} ${escapeMarkdown(course.name)}*\n`;
          response += `Inizio lezioni: ${dayjs(course.startDate).format('DD/MM/YYYY')} Fine lezioni: ${dayjs(course.endDate).format('DD/MM/YYYY')}\n`;
          course.lectures.forEach(lecture => {
            response += `${lecture.day} dalle ${lecture.startTime} alle ${lecture.endTime}\n`;
          });
          response += '\n';
        });
      }

      ctx.reply(response, { parse_mode: 'MarkdownV2' });
    } catch (err) {
      ctx.reply(`Errore durante la visualizzazione dell'orario: ${err.message}`);
    }
  });
};

export default showScheduleWeekCommand;
