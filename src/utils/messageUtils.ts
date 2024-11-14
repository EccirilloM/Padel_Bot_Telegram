// utils/messageUtils.ts
import { Message } from 'telegraf/typings/core/types/typegram';

export function isTextMessage(message: Message): message is Message.TextMessage {
  return message && 'text' in message;
}

// utils/messageUtils.ts
export function escapeMarkdown(text: string): string {
  return text.replace(/([*_`\[\]()\-+.!])/g, '\\$1'); // Escapes special MarkdownV2 characters
}

// Funzione unificata per estrarre username e argomenti
export function parseCommandArguments(text: string, senderUsername: string | undefined): { username: string; args: string[] } | null {
  const parts = text.trim().split(/\s+/);
  if (parts.length < 2) return null;

  let username: string;
  let args: string[];

  if (parts[1].startsWith('@')) {
    username = parts[1].substring(1);
    args = parts.slice(2);
  } else {
    username = senderUsername || '';
    args = parts.slice(1);
  }

  if (!username) return null;
  return { username, args };
}