import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { dummySessions } from '../assets/assets'
import type { DummySession } from '../types'
import SessionCard from '../components/sessions/SessionCard'
import SessionDetailsModal from '../components/sessions/SessionDetailsModal'

/**
 * Meeting history page. Lists every session as a card and opens a details
 * modal for the one the user selects. Uses mock data until the API exists.
 */
const Session = () => {
  // null = modal closed
  const [selected, setSelected] = useState<DummySession | null>(null)

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={14} />
        Go to Dashboard
      </Link>

      <h1 className="text-3xl font-semibold text-slate-900">Meeting sessions.</h1>
      <p className="mt-2 text-sm text-slate-600">
        Review your past and active meeting history, participant logs, and chat transcripts.
      </p>

      {dummySessions.length === 0 ? (
        <p className="mt-10 text-slate-500">No sessions yet. Start a meeting from the dashboard.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummySessions.map((s) => (
            <SessionCard key={s.id} session={s} onViewDetails={setSelected} />
          ))}
        </div>
      )}

      {selected && <SessionDetailsModal session={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default Session