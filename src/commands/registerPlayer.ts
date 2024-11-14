// commands/registerPlayerCommand.ts
import { Telegraf, Context } from 'telegraf';
import { registerPlayer } from '../services/playerService';
import { isTextMessage, parseCommandArguments } from '../utils/messageUtils';

const registerPlayerCommand = (bot: Telegraf) => {
  bot.command('register', async (ctx: Context, next) => {
    try {
      const message = ctx.message;

      if (!message || !isTextMessage(message)) {
        ctx.reply('Formato non valido. Usa: /register <@username>... <livello> o /register <livello> per registrarti.');
        return;
      }

      const result = parseCommandArguments(message.text);

      if (!result) {
        ctx.reply('Formato non valido. Usa: /register <@username>... <livello> o /register <livello> per registrarti.');
        return;
      }

      const { usernames, args } = result;
      const level = parseFloat(args[0]);

      if (isNaN(level)) {
        ctx.reply('Livello non valido. Assicurati di fornire un numero.');
        return;
      }

      // Itera su ogni username e registralo
      for (const username of usernames) {
        const player = await registerPlayer(username, level);
        ctx.reply(`Registrazione completata! Username: ${player.username}, Livello: ${player.level}`);
      }

      await next();
    } catch (err) {
      if (err instanceof Error) {
        ctx.reply(`Errore durante la registrazione: ${err.message}`);
      }
    }
  });
};

export default registerPlayerCommand;
