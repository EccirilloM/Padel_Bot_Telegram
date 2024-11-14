import { PrismaClient, Prisma } from '@prisma/client';
import { Player } from '../models/Player';
import { PlayerSummary } from '../models/PlayerSummary';

const prisma = new PrismaClient();

// Registrazione di un nuovo giocatore
export const registerPlayer = async (username: string, level: number): Promise<Player | null> => {
  try {
    const player = await prisma.player.create({
      data: {
        username,
        level,
      },
    });

    return {
      id: player.id,
      username: player.username,
      level: player.level,
    } as Player;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new Error(`L'utente con username ${username} esiste già.`);
    }
    throw err; // Rilancia gli altri errori
  }
};

export const getAllPlayers = async (): Promise<PlayerSummary[]> => {
  const players = await prisma.player.findMany();
  return players.map(player => ({
    username: player.username,
    level: player.level,
  }));
};

export const updatePlayerLevel = async (username: string, newLevel: number): Promise<Player | null> => {
  try {
    const player = await prisma.player.update({
      where: { username },
      data: { level: newLevel },
    });

    return {
      id: player.id,
      username: player.username,
      level: player.level,
    } as Player;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      // Codice errore P2025: giocatore non trovato per l'aggiornamento
      throw new Error(`Nessun giocatore trovato con username ${username}.`);
    }
    throw err; // Rilancia gli altri errori
  }
};

// // Funzione per ottenere un utente dal DB tramite username
// export const getPlayerByUsername = async (username: string): Promise<Player | null> => {
//   try {
//     const player = await prisma.player.findUnique({
//       where: { username },
//     });
//     return player ? { id: player.id, username: player.username, level: player.level } as Player : null;
//   } catch (err) {
//     console.error('Errore nel recupero dell\'utente:', err);
//     throw err;
//   }
// };

// // Aggiornamento del livello di un giocatore esistente
// export const updatePlayerLevel = async (username: string, newLevel: number): Promise<Player | null> => {
//   try {
//     const player = await prisma.player.update({
//       where: { username },
//       data: { level: newLevel },
//     });

//     return {
//       id: player.id,
//       username: player.username,
//       level: player.level,
//     } as Player;
//   } catch (err) {
//     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
//       // Codice errore P2025: nessun record trovato per aggiornare
//       throw new Error(`L'utente con username ${username} non esiste.`);
//     }
//     throw err; // Rilancia gli altri errori
//   }
// };

/// Funzione per convertire un orario (es. "08:15") in minuti
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Funzione per convertire minuti in formato "HH:MM" con zero iniziale
function minutesToTime(minutes: number): string {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
}



