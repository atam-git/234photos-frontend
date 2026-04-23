'use client'

import { X, Send, Paperclip, Smile } from 'lucide-react'
import { useState } from 'react'

interface LiveChatModalProps {
  onClose: () => void
}

const MOCK_MESSAGES = [
  { id: '1', sender: 'agent', text: 'Hi! I\'m Sarah from 234photos support. How can I help you today?', time: '2:34 PM' },
]

export function LiveChatModal({ onClose }: LiveChatModalProps) {
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setInput('')

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: 'Thanks for your message! A support agent will respond shortly.',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentResponse])
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md sm:h-[600px] h-[calc(100vh-60px)] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#EE2B24] to-[#d42520] px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-[16px]">💬</span>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Live Chat
              </h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[11px] text-white/90"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Online
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F8F8]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl px-4 py-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-white text-[#111] border border-[#E0E0E0]'
                }`}>
                  <p className="text-[13px] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {msg.text}
                  </p>
                </div>
                <p className={`text-[10px] text-[#888] mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-[#E0E0E0] p-4 bg-white rounded-b-2xl">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-2.5 pr-20 border border-[#E0E0E0] rounded-xl text-[13px] resize-none focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button className="w-7 h-7 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
                  <Paperclip className="w-4 h-4 text-[#888]" />
                </button>
                <button className="w-7 h-7 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
                  <Smile className="w-4 h-4 text-[#888]" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#EE2B24] text-white flex items-center justify-center hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-[#888] mt-2 text-center"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Typically replies within a few minutes
          </p>
        </div>
      </div>
    </div>
  )
}
