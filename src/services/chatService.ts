import axios from 'axios'

const AGENT_URL = import.meta.env.VITE_AGENT_URL || 'http://localhost:8000'

const agentClient = axios.create({
    baseURL: AGENT_URL,
    headers: { 'Content-Type': 'application/json' }
})

agentClient.interceptors.request.use((config) => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`
    }
    return config
})

const getSessionId = (): string => {
    let sessionId = localStorage.getItem('chatSessionId')
    if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem('chatSessionId', sessionId)
    }
    return sessionId
}

export const sendMessage = async (message: string): Promise<any> => {
    const { data } = await agentClient.post('/agent/chat', {
        sessionId: getSessionId(),
        message,
        voiceMode: false
    })
    return data
}

export const sendVoiceMessage = async (base64Audio: string, mimeType: string): Promise<any> => {
    const { data } = await agentClient.post('/agent/chat', {
        sessionId: getSessionId(),
        audio: {
            mimeType: mimeType,
            data: base64Audio
        },
        voiceMode: true
    })
    return data
}

export const checkHealth = async (): Promise<any> => {
    const { data } = await agentClient.get('/agent/health')
    return data
}

export const clearSession = (): void => {
    localStorage.removeItem('chatSessionId')
}


export const startNewConversation = (): string => {
    clearSession()
    return getSessionId()
}