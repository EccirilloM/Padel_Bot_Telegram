// commands/addCalendarCommand.ts
import { Telegraf, Context } from 'telegraf';
import { addCalendarToPlayer } from '../services/calendarService';
import { parseCourseData } from '../utils/calendarUtils';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const addCalendarCommand = (bot: Telegraf) => {
  bot.command('addcalendar', async (ctx: Context) => {
    try {
      const message = ctx.message;
      const senderUsername = ctx.from?.username;

      // Verifica che il messaggio sia di tipo testo
      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, invia il calendario come testo dopo il comando /addcalendar.');
        return;
      }

      const result = parseCommandArguments(message.text, senderUsername);

      if (!result) {
        ctx.reply('Non è stato possibile rilevare l’username o il calendario.');
        return;
      }

      const { username, args } = result;
      const calendarText = args.join(' ').trim();
      const courses = parseCourseData(calendarText);

      if (!courses.length) {
        ctx.reply('Nessun corso valido trovato nel testo incollato.');
        return;
      }

      await addCalendarToPlayer(username, courses);
      ctx.reply(`Calendario aggiunto con successo per ${username}!`);
    } catch (err) {
      ctx.reply(`Errore durante l'aggiunta del calendario: ${err.message}`);
    }
  });
};

export default addCalendarCommand;
