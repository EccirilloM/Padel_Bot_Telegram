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
  { command: 'register', description: '(@username livello*) registra un giocatore con il livello' },
  { command: 'update', description: '(@username livello*) aggiorna il livello del giocatore' },
  { command: 'showplayers', description: 'Mostra tutti i giocatori registrati' },
  { command: 'addcalendar', description: '(@username calendario) aggiunge un calendario al giocatore' },
  { command: 'showscheduleweek', description: 'Mostra l’orario settimanale dei corsi attivi' },
  { command: 'updatecalendar', description: '(@username calendario) aggiorna il calendario del giocatore' },
  { command: 'showplayerson', description: '<giorno della settimana> mostra i giocatori disponibili in quel giorno' },
  { command: 'showplayerweek', description: '(@username) mostra gli slot liberi per giocare con un giocatore' },
  { command: 'help', description: 'Mostra una guida al bot' },
]);