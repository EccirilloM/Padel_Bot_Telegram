import { Telegraf } from 'telegraf';
import registerPayerCommand from './registerPlayer';
import updatePlayerCommand from './updatePlayer';
import showplayersCommand  from './showPlayers';
import addCalendarCommand from './addCalendar';
import showScheduleWeekCommand from './showScheduleWeek';
import helpCommand from './help';


export default (bot: Telegraf) => {
  registerPayerCommand(bot);
  updatePlayerCommand(bot);
  helpCommand(bot);
  showplayersCommand(bot);
  addCalendarCommand(bot);
  showScheduleWeekCommand(bot);
  // Aggiungi altre registrazioni di comandi qui
};
