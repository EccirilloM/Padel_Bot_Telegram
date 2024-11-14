import { Telegraf } from 'telegraf';
import registerPayerCommand from './registerPlayer';
import updatePlayerCommand from './updatePlayer';
import showplayersCommand  from './showPlayers';
import addCalendarCommand from './addCalendar';
import showScheduleWeekCommand from './showScheduleWeek';
import updateCalendarCommand from './updatecalendar';
import showPlayersOnCommand from './showplayerson';
import showPlayerWeekCommand from './showPlayersWeek';
import helpCommand from './help';


export default (bot: Telegraf) => {
  registerPayerCommand(bot);
  updatePlayerCommand(bot);
  helpCommand(bot);
  showplayersCommand(bot);
  addCalendarCommand(bot);
  showScheduleWeekCommand(bot);
  updateCalendarCommand(bot);
  showPlayersOnCommand(bot);
  showPlayerWeekCommand(bot);
  // Aggiungi altre registrazioni di comandi qui
};
