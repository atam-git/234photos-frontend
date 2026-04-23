'use client'

import { useState } from 'react'
import { MessageCircle, Mail, Book, HelpCircle, ChevronDown, ChevronUp, Send, Check } from 'lucide-react'
import Link from 'next/link'
import { LiveChatModal } from '@/components/shared/Modals/LiveChatModal'
import { SUPPORT_FAQ_ITEMS, SUPPORT_CONTACT_OPTIONS } from '@/lib/mock/dashboard'

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleContactAction = (type: string) => {
    switch (type) {
      case 'chat':
        setShowLiveChat(true)
        break
      case 'email':
        navigator.clipboard.writeText('support@234photos.com')
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
        break
      case 'help':
        window.open('/how-it-works', '_blank')
        break
    }
  }

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Support request:', { subject, message })
    // Reset form
    setSubject('')
    setMessage('')
    alert('Your message has been sent! We\'ll get back to you within 24 hours.')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-[28px] font-extrabold text-[#111] mb-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          How can we help you?
        </h1>
        <p className="text-[14px] text-[#666]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Get answers to your questions or reach out to our support team
        </p>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUPPORT_CONTACT_OPTIONS.map((option, index) => {
          const Icon = option.icon === 'MessageCircle' ? MessageCircle : option.icon === 'Mail' ? Mail : Book
          const actionType = index === 0 ? 'chat' : index === 1 ? 'email' : 'help'
          const isEmailCopied = actionType === 'email' && emailCopied
          
          return (
            <div key={option.title} className="bg-white rounded-2xl border border-[#F0F0F0] p-6 hover:border-[#EE2B24] hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FFF0F0] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#EE2B24]" />
              </div>
              <h3 className="text-[15px] font-bold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {option.title}
              </h3>
              <p className="text-[13px] text-[#666] mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {option.description}
              </p>
              <p className="text-[11px] text-[#888] mb-4"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {option.available}
              </p>
              <button
                onClick={() => handleContactAction(actionType)}
                className={`w-full py-2 text-[13px] font-semibold rounded-full transition-colors flex items-center justify-center gap-2 ${
                  isEmailCopied
                    ? 'bg-green-50 text-green-700'
                    : 'bg-[#F5F5F5] text-[#111] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {isEmailCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Email copied!
                  </>
                ) : (
                  option.action
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-[#EE2B24]" />
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {SUPPORT_FAQ_ITEMS.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-[14px] font-bold text-[#888] uppercase tracking-wide mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`
                  const isOpen = openFaq === id
                  return (
                    <div key={id} className="border border-[#F0F0F0] rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8F8F8] transition-colors">
                        <span className="text-[14px] font-semibold text-[#111] pr-4"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#666] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#666] shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-[13px] text-[#666] leading-relaxed"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <h2 className="text-[18px] font-bold text-[#111] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Still need help?
        </h2>
        <p className="text-[13px] text-[#666] mb-6"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Send us a message and we'll get back to you within 24 hours
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What do you need help with?"
              required
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue or question in detail..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF8F8] rounded-2xl border border-[#FFE5E5] p-6">
        <h3 className="text-[16px] font-bold text-[#111] mb-3"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Additional Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/how-it-works" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center shrink-0">
              <Book className="w-4 h-4 text-[#EE2B24]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                How it works
              </p>
              <p className="text-[11px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Learn the basics
              </p>
            </div>
          </Link>
          <Link href="/licence" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center shrink-0">
              <Book className="w-4 h-4 text-[#EE2B24]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                License guide
              </p>
              <p className="text-[11px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Understand usage rights
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showLiveChat && <LiveChatModal onClose={() => setShowLiveChat(false)} />}
    </div>
  )
}
