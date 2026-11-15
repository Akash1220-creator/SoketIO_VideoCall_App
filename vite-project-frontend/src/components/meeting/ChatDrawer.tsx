import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'
import type { DummyChatMessage } from '../../types'

interface ChatDrawerProps {
  messages: DummyChatMessage[]
  currentUserId: string
  onSend: (text: string) => void
  onClose: () => void
}

/**
 * Side panel with the in-meeting chat. Stateless regarding the message list:
 * MeetingRoom owns the messages so they survive the drawer being closed.
 */
const ChatDrawer = ({ messages, currentUserId, onSend, onClose }: ChatDrawerProps) => {
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Keep the newest message in view whenever the list changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return // ignore empty / whitespace-only messages
    onSend(trimmed)
    setText('')
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-900">In-meeting chat</h3>
        <button onClick={onClose} aria-label="Close chat" className="text-slate-500 hover:text-slate-900">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => {
          const isMine = m.senderId === currentUserId
          return (
            <div key={m.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
              <span className="mb-0.5 text-xs text-slate-500">
                {isMine ? 'You' : m.senderName} · {m.time}
              </span>
              <p
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  isMine ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
                }`}
              >
                {m.text}
              </p>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-200 p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a message"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Send size={16} />
        </button>
      </form>
    </aside>
  )
}

export default ChatDrawer
