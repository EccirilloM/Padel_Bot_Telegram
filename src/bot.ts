import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import allCommands from './commands'; // Importa tutti i comandi

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Inizializza il bot con il token
export const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Registra tutti i comandi
allCommands(bot);

// Imposta i comandi suggeriti
bot.telegram.setMyCommands([
  { command: 'register', description: '(@username... livello) registra uno o più giocatori con il livello specificato' },
  { command: 'update', description: '(@username... livello) aggiorna il livello di uno o più giocatori' },
  { command: 'showplayers', description: 'Mostra tutti i giocatori registrati' },
  { command: 'addcalendar', description: '(@username... calendario) aggiunge un calendario a uno o più giocatori' },
  { command: 'showscheduleweek', description: '(@username...) mostra l’orario settimanale dei corsi attivi per uno o più giocatori' },
  { command: 'updatecalendar', description: '(@username... calendario) aggiorna il calendario per uno o più giocatori' },
  { command: 'showplayerson', description: '<giorno della settimana> mostra i giocatori disponibili in quel giorno' },
  { command: 'showplayersweek', description: '(@username...) mostra gli slot liberi in comune per giocare con uno o più giocatori' },
  { command: 'help', description: 'Mostra una guida al bot' },
]);
