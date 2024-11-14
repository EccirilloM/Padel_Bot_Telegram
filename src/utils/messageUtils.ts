// utils/messageUtils.ts
import { Message } from 'telegraf/typings/core/types/typegram';

export function isTextMessage(message: Message): message is Message.TextMessage {
  return message && 'text' in message;
}

export function escapeMarkdown(text: string): string {
  return text.replace(/([*_`\[\]()\-+.!])/g, '\\$1'); // Escapes special MarkdownV2 characters
}

// Funzione estesa per estrarre uno o più username e argomenti
export function parseCommandArguments(
  text: string
): { usernames: string[]; args: string[] } | null {
  const parts = text.trim().split(/\s+/);
  const usernames: string[] = [];
  let args: string[] = [];

  // Raccogli tutti gli username con prefisso '@'
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith('@')) {
      usernames.push(parts[i].substring(1)); // Rimuovi '@' dagli username
    } else {
      // Tutto quello che segue dopo gli username viene considerato come argomenti
      args = parts.slice(i);
      break;
    }
  }

  // Verifica che almeno un username sia presente
  if (usernames.length === 0) {
    return null;
  }

  return { usernames, args };
}