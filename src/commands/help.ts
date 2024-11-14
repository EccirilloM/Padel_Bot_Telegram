import { Telegraf, Context } from 'telegraf';

const helpMessage = `
Benvenuto nel Padel Bot!

Questo bot ti aiuta a gestire le disponibilità per le partite di padel. Ecco i comandi disponibili:

/register @username... <livello> - Registra uno o più giocatori con un livello specifico. Specifica uno o più username seguiti dal livello.

/update @username... <nuovo livello> - Aggiorna il livello di uno o più giocatori specificati.

/addcalendar @username... <calendario testuale polimi> - Aggiungi un calendario di lezioni per uno o più giocatori. Specifica uno o più username e incolla il calendario in formato testo.

/updatecalendar @username... <calendario testuale polimi> - Aggiorna il calendario di lezioni per uno o più giocatori. Specifica uno o più username e incolla il calendario in formato testo.

/showplayers - Mostra tutti i giocatori registrati nel bot.

/showscheduleweek @username... - Mostra l’orario settimanale dei corsi attivi per uno o più giocatori specificati.

/showplayerson <giorno> - Mostra i giocatori disponibili per il giorno specificato (ad es. /showplayerson Lunedì).

/showplayersweek @username... - Mostra gli slot liberi comuni per giocare con uno o più giocatori durante la settimana.

/help - Mostra questo messaggio di aiuto.
`;

const helpCommand = (bot: Telegraf) => {
  bot.command('help', (ctx: Context) => {
    ctx.reply(helpMessage);
  });
};

export default helpCommand;

