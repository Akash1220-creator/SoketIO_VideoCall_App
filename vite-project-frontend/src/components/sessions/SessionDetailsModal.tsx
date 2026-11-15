import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { DummySession } from '../../types'
import { formatDateTime, formatTime } from '../../utils/FormatDate'
import StatusBadge from './SessionStatusBadge'

interface SessionDetailsModalProps {
  session: DummySession
  onClose: () => void
}

type Tab = 'chat' | 'participants'


 //Modal with the chat transcript and participant log of a past or active meeting.
const SessionDetailsModal = ({ session, onClose }: SessionDetailsModalProps) => {
  const [tab, setTab] = useState<Tab>('chat')

  // Close on Escape; the listener is removed on unmount to avoid leaks
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const tabClass = (active: boolean) =>
    `border-b-2 px-1 pb-2 text-sm font-medium transition-colors ${
      active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
    }`

  return (
    // Clicking the dimmed backdrop closes the modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${session.title} details`}
    >
      {/* stopPropagation so clicks inside the panel do not reach the backdrop */}
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
                ID: {session.meetingId}
              </span>
              <StatusBadge status={session.status} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">{session.title}</h2>
            <p className="mt-1 text-xs text-slate-500">
              Host: {session.host.name} · Created {formatDateTime(session.createdAt)}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close details" className="text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-6 border-b border-slate-200 px-6">
          <button onClick={() => setTab('chat')} className={tabClass(tab === 'chat')}>
            Chat Transcript ({session.messages?.length ?? 0})
          </button>
          <button onClick={() => setTab('participants')} className={tabClass(tab === 'participants')}>
            Participants Log ({session.participants?.length ?? 0})
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto p-6">
          {tab === 'chat' &&
            (!session.messages || session.messages.length === 0 ? (
              <p className="text-sm text-slate-500">No messages were sent in this meeting.</p>
            ) : (
              session.messages.map((m) => (
                <div key={m.id} className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">{m.senderName}</span>
                    <span className="text-[11px] text-slate-400">{formatTime(m.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{m.text}</p>
                </div>
              ))
            ))}

          {tab === 'participants' &&
            session.participants.map((p) => (
              <div key={p.user.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.user.email}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Joined {formatTime(p.joinedAt)}</p>
                  {/* leftAt is null while the participant is still in the meeting */}
                  <p>{p.leftAt ? `Left ${formatTime(p.leftAt)}` : 'Still in meeting'}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SessionDetailsModal