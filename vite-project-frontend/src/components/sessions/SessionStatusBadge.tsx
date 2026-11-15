interface SessionStatusBadgeProps {
  status: string
}

/** Small pill showing whether a meeting is still running or has ended. */
const SessionStatusBadge = ({ status }: SessionStatusBadgeProps) => {
  const isActive = status === 'active'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
      }`}
    >
      <span className={`size-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      {isActive ? 'Active' : 'Ended'}
    </span>
  )
}

export default SessionStatusBadge