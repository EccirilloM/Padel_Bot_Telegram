// commands/showPlayerWeekCommand.ts
import { Telegraf, Context } from 'telegraf';
import { getMutualWeeklyAvailability } from '../services/availabilityService';
import { isTextMessage } from '../utils/messageUtils';

const showPlayerWeekCommand = (bot: Telegraf) => {
  bot.command('showplayerweek', async (ctx: Context) => {
    try {
      const message = ctx.message;
      const senderUsername = ctx.from?.username;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, usa il comando /showplayerweek @username correttamente.');
        return;
      }

      const args = message.text.trim().split(/\s+/).slice(1);
      const targetUsername = args[0]?.replace('@', '');

      if (!targetUsername) {
        ctx.reply('Specifica un username, ad esempio /showplayerweek @username.');
        return;
      }

      if (!senderUsername) {
        ctx.reply('Non è stato possibile identificare il tuo username.');
        return;
      }

      const availability = await getMutualWeeklyAvailability(senderUsername, targetUsername);

      if (!availability) {
        ctx.reply('Nessun giocatore trovato con l\'username specificato.');
        return;
      }

      let response = `*Slot liberi per giocare con @${targetUsername} durante la settimana:*\n\n`;
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

export default showPlayerWeekCommand;
