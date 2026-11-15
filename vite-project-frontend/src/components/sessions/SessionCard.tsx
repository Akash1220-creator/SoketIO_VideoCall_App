import { useNavigate } from 'react-router-dom'
import { Calendar, MessageSquare, Users } from 'lucide-react'
import type { DummySession } from '../../types'
import { formatDateTime } from '../../utils/FormatDate'
import StatusBadge from './SessionStatusBadge'

interface SessionCardProps {
  session: DummySession
  onViewDetails: (session: DummySession) => void
}

/**
 * Summary card for one meeting. Presentational: the parent decides what
 * "View Details" does, while Re-join navigates straight back into the room.
 */
const SessionCard = ({ session, onViewDetails }: SessionCardProps) => {
  const navigate = useNavigate()
console.log(session)
  // Only a meeting that is still running can be re-joined
  const canRejoin = session.status === 'active'

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
          ID: {session.meetingId}
        </span>
        <StatusBadge status={session.status} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{session.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar size={13} />
          {formatDateTime(session.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-200/70 pt-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-2">
          <Users size={14} className="text-blue-600" />
          {session.participants?.length ?? 0} Participants
        </span>
        <span className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-2">
          <MessageSquare size={14} className="text-blue-600" />
          {session.messages?.length ?? 0} Messages
        </span>
      </div>

      <div className="mt-auto flex gap-2">
        <button
          onClick={() => onViewDetails(session)}
          className="flex-1 rounded-xl bg-white/80 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white"
        >
          View Details
        </button>
        {canRejoin && (
          <button
            onClick={() => navigate(`/meeting/${session.meetingId}`)}
            className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Re-join
          </button>
        )}
      </div>
    </div>
  )
}

export default SessionCard