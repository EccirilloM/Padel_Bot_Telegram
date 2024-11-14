// commands/showPlayersOn.ts
import { Telegraf, Context } from 'telegraf';
import { getPlayerAvailabilityForDay } from '../services/availabilityService';
import { isTextMessage } from '../utils/messageUtils';

const showPlayersOnCommand = (bot: Telegraf) => {
  bot.command('showplayerson', async (ctx: Context) => {
    try {
      const message = ctx.message;
      const senderUsername = ctx.from?.username;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Per favore, usa il comando /showplayerson <giorno della settimana> correttamente.');
        return;
      }

      const args = message.text.trim().split(/\s+/).slice(1);
      const day = args[0];

      if (!day) {
        ctx.reply('Specifica un giorno della settimana, ad esempio /showplayerson mercoledì.');
        return;
      }

      if (!senderUsername) {
        ctx.reply('Non è stato possibile identificare il tuo username.');
        return;
      }

      const availability = await getPlayerAvailabilityForDay(day, senderUsername);

      if (availability.length === 0) {
        ctx.reply('Nessun giocatore disponibile per il giorno selezionato.');
        return;
      }

      let response = `*Giocatori disponibili per il giorno ${day}:*\n\n`;
      availability.forEach(player => {
        response += `*@${player.username}*  Livello: ${player.level}\n`;
        player.freeSlots.forEach(slot => {
          response += `Dalle *${slot.startTime}* alle *${slot.endTime}*\n`;
        });
        response += '\n';
      });

      ctx.reply(response, { parse_mode: 'MarkdownV2' });
    } catch (error) {
      ctx.reply(`Errore durante la visualizzazione degli slot liberi: ${error.message}`);
    }
  });
};

export default showPlayersOnCommand;
