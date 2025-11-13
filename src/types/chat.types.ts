export type MessageSender = 'user'|'assistant'|'system'

export type MessageType ='text'|'room_recommendation'|'booking_summary'

export interface ChatMessage {
  id: string
  sender: MessageSender
  type: MessageType
  content: string
  timestamp: string
  roomId?: number
  metadata?: Record<string, unknown>
}

export interface ConversationState {
  messages: ChatMessage[]
  isLoading: boolean
  error?: string
}
