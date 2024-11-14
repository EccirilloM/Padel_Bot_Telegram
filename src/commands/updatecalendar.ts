// commands/updateCalendarCommand.ts
import { Telegraf, Context } from 'telegraf';
import { updateCalendarForPlayer } from '../services/calendarService';
import { parseCourseData } from '../utils/calendarUtils';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const updateCalendarCommand = (bot: Telegraf) => {
  bot.command('updatecalendar', async (ctx: Context) => {
    try {
      const message = ctx.message;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, invia il calendario come testo dopo il comando /updatecalendar.');
        return;
      }

      const result = parseCommandArguments(message.text);
      if (!result) {
        ctx.reply('Non è stato possibile rilevare l’username o il calendario.');
        return;
      }

      const { usernames, args } = result;
      const calendarText = args.join(' ').trim();
      const newCourses = parseCourseData(calendarText);

      if (!newCourses.length) {
        ctx.reply('Nessun corso valido trovato nel testo incollato.');
        return;
      }

      let response = '';
      for (const username of usernames) {
        try {
          await updateCalendarForPlayer(username, newCourses);
          response += `Calendario aggiornato con successo per @${username}!\n`;
        } catch (error) {
          response += `Errore durante l'aggiornamento del calendario per @${username}: ${error.message}\n`;
        }
      }

      ctx.reply(response.trim());
    } catch (err) {
      ctx.reply(`Errore durante l'aggiornamento del calendario: ${err.message}`);
    }
  });
};

export default updateCalendarCommand;
