import { useState,useRef,useEffect } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";


interface Message{
    id:number
    text:string
    sender:'user'|'ai'
    timestamp: Date
}

const Chat=()=>{
    const [messages,setMessages]=useState<Message[]>([
        {
            id:1,
            text: "Witaj w Grand Hotel! Jestem twoim asystentem AI. Jak mogę ci pomóc?",
            sender:'ai',
            timestamp:new Date()
        }
    ])
    const [inputMessage,setInputMessage]=useState('')
    const messageEndRef=useRef<HTMLDivElement>(null)
    const messRef=useRef<HTMLDivElement>(null)

    const scrollToBottom=()=>{
        if(messRef.current){
            messRef.current.scroll({
              top: messRef.current.scrollHeight,
              behavior: 'smooth'
            })
        }
    }
    useEffect(()=>{
        scrollToBottom()
    },[messages])

    const handleSendMessage=()=>{
        if (inputMessage.trim()===''){
            return
        }
  

    const userMessage: Message={
        id:messages.length+1,
        text:inputMessage,
        sender:'user',
        timestamp:new Date()
    }

    setMessages([...messages,userMessage])
    setInputMessage('')

    setTimeout(()=>{
        const aiMessage:Message={
            id:messages.length+2,
            text:"narazie placeholder",
            sender:"ai",
            timestamp:new Date()
        }
        setMessages(prev=>[...prev,aiMessage])
    },1000)
}
const handleKeyPress=(e: React.KeyboardEvent)=>{
    if(e.key==='Enter'&& !e.shiftKey){
        e.preventDefault()
        handleSendMessage()
    }
}
     return (
       <Card className="w-full max-w-3xl mx-auto">
         <div className="border-b border-gray-200 pb-4 mb-4">
           <h2 className="text-2xl font-bold text-grand-navy flex items-center gap-2">
             💬 <span className="text-grand-gold">Grand</span> AI Assistant
           </h2>
           <p className="text-sm text-grand-slate/70 mt-1">
             Zapytaj o pokoje, restaurację lub rezerwacje
           </p>
         </div>
         <div ref={messRef} className="h-[600px] overflow-y-auto mb-4 space-y-4">
           {messages.map((message) => (
             <div
               key={message.id}
               className={`flex ${message.sender === 'user' ? 'justify-end' :
   'justify-start'}`}
             >
               <div
                 className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                   message.sender === 'user'
                     ? 'bg-grand-gold text-grand-navy'
                     : 'bg-gray-100 text-grand-slate'
                 }`}
               >
                 <p className="text-sm">{message.text}</p>
                 <p className="text-xs opacity-60 mt-1">
                   {message.timestamp.toLocaleTimeString('pl-PL', {
                     hour: '2-digit',
                     minute: '2-digit'
                   })}
                 </p>
               </div>
             </div>
           ))}
           <div ref={messageEndRef} />
         </div>
         <div className="flex gap-2">
           <div className="flex-1">
             <Input
               placeholder="Wpisz wiadomość..."
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               onKeyPress={handleKeyPress}
             />
           </div>
           <Button
             variant="pierwszy"
             size="srednie"
             onClick={handleSendMessage}
           >
             Wyślij →
           </Button>
         </div>
       </Card>
     )
   }
export default Chat