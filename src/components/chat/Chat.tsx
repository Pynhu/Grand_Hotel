import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mic, Square, RefreshCcw, Send, MessageSquare, Volume2 } from 'lucide-react';
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import * as chatService from "../../services/chatService";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      text: "Witaj w Grand Hotel! Jestem twoim asystentem AI. Możesz do mnie pisać lub mówić.",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const messRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (messRef.current) {
      messRef.current.scroll({ top: messRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, isRecording, isPlaying])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return
    stopPlaying()

    const userMsg = { id: Date.now(), text: inputMessage, sender: 'user', timestamp: new Date() }
    const loadingMsg = { id: Date.now() + 1, text: "Myślę...", sender: 'ai', timestamp: new Date(), isLoading: true }

    setMessages(prev => [...prev, userMsg, loadingMsg])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await chatService.sendMessage(inputMessage)
      handleResponse(response)
    } catch (error) {
      handleError()
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    stopPlaying()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        await sendAudio(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Błąd mikrofonu:", err)
      alert("Brak dostępu do mikrofonu.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const sendAudio = async (audioBlob: Blob) => {
    const loadingMsg = { id: Date.now(), text: "Przetwarzam głos...", sender: 'user', timestamp: new Date() }
    const thinkingMsg = { id: Date.now() + 1, text: "Słucham...", sender: 'ai', timestamp: new Date(), isLoading: true }

    setMessages(prev => [...prev, loadingMsg, thinkingMsg])
    setIsLoading(true)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1]
        const response = await chatService.sendVoiceMessage(base64Audio, audioBlob.type)
        handleResponse(response)
      }
    } catch (error) {
      handleError()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResponse = (response: any) => {
    stopPlaying()

    if (response.audio && response.audio.data) {
      const audio = new Audio(`data:${response.audio.mimeType};base64,${response.audio.data}`)
      audioRef.current = audio

      audio.onplay = () => setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
      audio.play().catch(e => console.error("Błąd audio:", e))
    }

    setMessages(prev => prev.map(msg =>
      msg.isLoading ? { ...msg, text: response.reply, isLoading: false } : msg
    ))
  }

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setIsPlaying(false)
  }

  const handleError = () => {
    setMessages(prev => prev.map(msg =>
      msg.isLoading ? { ...msg, text: "Błąd połączenia.", isLoading: false } : msg
    ))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto backdrop-blur-lg bg-white/95 transition-all duration-300 relative overflow-hidden flex flex-col h-[900px]">
      <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center relative z-10 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-grand-navy flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-grand-gold" />
            <span className="text-grand-gold">Grand</span> AI Assistant
          </h2>
          <p className="text-sm text-grand-slate/70 mt-1">Rozmawiaj głosowo lub tekstowo</p>
        </div>
        <Button variant="linie" size="male" onClick={() => { stopPlaying(); chatService.clearSession(); window.location.reload() }}>
          <RefreshCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      {isPlaying && (
        <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center animate-fadeIn backdrop-blur-sm">
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <div className="absolute w-full h-full bg-grand-gold/10 rounded-full animate-ping"></div>
            <div className="absolute w-32 h-32 bg-grand-gold/20 rounded-full animate-ping delay-150"></div>
            <div className="absolute w-24 h-24 bg-grand-gold/30 rounded-full animate-pulse"></div>
            <div className="relative w-20 h-20 bg-grand-gold rounded-full flex items-center justify-center shadow-xl shadow-grand-gold/40">
              <Volume2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-grand-navy font-bold text-xl animate-pulse mb-2">Grand AI mówi...</p>
          <p className="text-sm text-gray-500 mb-8">Kliknij poniżej aby przerwać</p>

          <button
            onClick={stopPlaying}
            className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 font-medium"
          >
            <Square className="w-4 h-4" /> Zatrzymaj odtwarzanie
          </button>
        </div>
      )}

      <div ref={messRef} className="flex-1 overflow-y-auto mb-4 space-y-4 px-2 relative z-10">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm 
                            ${msg.sender === 'user' ? 'bg-grand-gold text-grand-navy rounded-br-none' : 'bg-gray-100 text-grand-slate rounded-bl-none'} 
                            ${msg.isLoading ? 'animate-pulse' : ''}`}>

              {msg.sender === 'ai' && !msg.isLoading ? (
                <div className="prose prose-sm max-w-none prose-headings:text-grand-navy prose-a:text-grand-gold prose-strong:text-grand-navy">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              )}

              <p className="text-[10px] opacity-60 mt-1 text-right">
                {msg.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isRecording && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-pulse flex items-center gap-2 text-red-500 font-bold bg-red-50 px-4 py-2 rounded-full border border-red-100 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Nagrywanie...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-end relative z-10 shrink-0">
        <div className="flex-1">
          <Input
            placeholder={isRecording ? "Mów teraz..." : "Wpisz wiadomość..."}
            value={inputMessage}
            onChange={(e: any) => setInputMessage(e.target.value)}
            onKeyPress={(e: any) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading || isRecording || isPlaying}
            className="transition-all focus:ring-grand-gold"
          />
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading || isPlaying}
          className={`h-[42px] w-[42px] flex items-center justify-center rounded-lg transition-all duration-300 border-2
                        ${isRecording
              ? 'bg-red-500 border-red-600 text-white hover:bg-red-600 scale-110 shadow-lg shadow-red-200 animate-pulse'
              : 'bg-white border-grand-gold text-grand-gold hover:bg-grand-gold hover:text-white'
            } ${(isLoading || isPlaying) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          title={isRecording ? "Zatrzymaj nagrywanie" : "Rozpocznij nagrywanie"}
        >
          {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <Button variant="pierwszy" size="srednie" onClick={handleSendMessage} disabled={isLoading || isRecording || isPlaying || !inputMessage.trim()}>
          {isLoading ? '...' : <><Send className="w-4 h-4 mr-1" /> Wyślij</>}
        </Button>
      </div>
    </Card>
  )
}

export default Chat