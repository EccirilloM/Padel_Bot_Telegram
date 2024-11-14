// commands/updateCalendarCommand.ts
import { Telegraf, Context } from 'telegraf';
import { updateCalendarForPlayer } from '../services/calendarService';
import { parseCourseData } from '../utils/calendarUtils';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const updateCalendarCommand = (bot: Telegraf) => {
  bot.command('updatecalendar', async (ctx: Context) => {
    try {
      const message = ctx.message;
      const senderUsername = ctx.from?.username;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, invia il calendario come testo dopo il comando /updatecalendar.');
        return;
      }

      const result = parseCommandArguments(message.text, senderUsername);
      if (!result) {
        ctx.reply('Non è stato possibile rilevare l’username o il calendario.');
        return;
      }

      const { username, args } = result;
      const calendarText = args.join(' ').trim();
      const newCourses = parseCourseData(calendarText);

      if (!newCourses.length) {
        ctx.reply('Nessun corso valido trovato nel testo incollato.');
        return;
      }

      await updateCalendarForPlayer(username, newCourses);
      ctx.reply(`Calendario aggiornato con successo per ${username}!`);
    } catch (err) {
      ctx.reply(`Errore durante l'aggiornamento del calendario: ${err.message}`);
    }
  });
};

export default updateCalendarCommand;
