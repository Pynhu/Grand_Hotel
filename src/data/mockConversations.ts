import type { ChatMessage } from '../types/chat.types'

export const mockConversation: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    type: 'text',
    content: 'Witaj w GrandHotelu. Jestem Twoim concierge. Czym mogę Cię dzisiaj zachwycić?',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'msg-2',
    sender: 'user',
    type: 'text',
    content: 'Szukam apartamentu dla pary na romantyczny weekend z widokiem na morze.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    type: 'room_recommendation',
    content:
      'Polecam Grand Royale Suite – panoramiczny widok na morze, prywatne spa oraz dedykowany butler.',
    roomId: 401,
    timestamp: new Date().toISOString(),
  },
  {
    id: 'msg-4',
    sender: 'assistant',
    type: 'text',
    content:
      'Czy mam przygotować wstępną rezerwację na 14-16 lutego oraz zaplanować zabieg w naszym spa?',
    timestamp: new Date().toISOString(),
  },
]