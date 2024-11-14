// commands/showPlayersWeekCommand.ts
import { Telegraf, Context } from 'telegraf';
import { getMutualWeeklyAvailability } from '../services/availabilityService';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const showPlayersWeekCommand = (bot: Telegraf) => {
  bot.command('showplayersweek', async (ctx: Context) => {
    try {
      const message = ctx.message;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, usa il comando /showplayersweek con il formato corretto: /showplayersweek @username1 @username2 ...');
        return;
      }

      const result = parseCommandArguments(message.text);

      // Controllo se il numero di username è sufficiente
      if (!result || result.usernames.length < 2) {
        ctx.reply('Per favore, specifica almeno due username per confrontare gli slot liberi.');
        return;
      }

      const usernames = result.usernames;
      const availability = await getMutualWeeklyAvailability(usernames);

      if (!availability) {
        ctx.reply('Non è stato possibile trovare i giocatori con gli username specificati.');
        return;
      }

      let response = '*Slot liberi comuni per i giocatori specificati durante la settimana:*\n\n';
      availability.dailyAvailability.forEach(dayAvailability => {
        response += `*${dayAvailability.day}:*\n`;
        if (dayAvailability.freeSlots.length > 0) {
          dayAvailability.freeSlots.forEach(slot => {
            response += `Dalle ${slot.startTime} alle ${slot.endTime}\n`;
          });
        } else {
          response += 'Nessun orario disponibile.\n';
        }
        response += '\n';
      });

      ctx.reply(response, { parse_mode: 'MarkdownV2' });
    } catch (error) {
      ctx.reply(`Errore durante la visualizzazione degli slot liberi: ${error.message}`);
    }
  });
};

export default showPlayersWeekCommand;
