// commands/updatePlayerCommand.ts
import { Telegraf, Context } from 'telegraf';
import { updatePlayerLevel } from '../services/playerService';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const updatePlayerCommand = (bot: Telegraf) => {
  bot.command('update', async (ctx: Context) => {
    try {
      const message = ctx.message;
      const senderUsername = ctx.from?.username;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Formato non valido. Usa: /update <@username> <livello> o /update <livello> per aggiornare il tuo livello.');
        return;
      }

      const result = parseCommandArguments(message.text, senderUsername);

      if (!result) {
        ctx.reply('Formato non valido. Usa: /update <@username> <livello> o /update <livello> per aggiornare il tuo livello.');
        return;
      }

      const { username, args } = result;
      const level = parseFloat(args[0]);

      if (isNaN(level)) {
        ctx.reply('Livello non valido. Assicurati di fornire un numero.');
        return;
      }

      const updatedPlayer = await updatePlayerLevel(username, level);
      ctx.reply(`Livello aggiornato! Username: ${updatedPlayer.username}, Nuovo livello: ${updatedPlayer.level}`);
    } catch (err) {
      if (err instanceof Error) {
        ctx.reply(`Errore durante l'aggiornamento: ${err.message}`);
      }
    }
  });
};

export default updatePlayerCommand;

