import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react'
import type { DummyUser, DummyRemoteParticipant } from '../../types'

interface ParticipantsDrawerProps {
  localUser: DummyUser | null
  remoteUsers: DummyRemoteParticipant[]
  audioEnabled: boolean
  videoEnabled: boolean
  onClose: () => void
}

interface RowProps {
  name: string
  isLocal?: boolean
  audioEnabled: boolean
  videoEnabled: boolean
}

/** One participant row: avatar initial, name, and mic/camera status icons. */
const ParticipantRow = ({ name, isLocal, audioEnabled, videoEnabled }: RowProps) => (
  <li className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-slate-50">
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-slate-800">
        {name}
        {isLocal && <span className="ml-1 text-slate-500">(You)</span>}
      </span>
    </div>

    <div className="flex items-center gap-2 text-slate-500">
      {audioEnabled ? <Mic size={16} /> : <MicOff size={16} className="text-red-500" />}
      {videoEnabled ? <Video size={16} /> : <VideoOff size={16} className="text-red-500" />}
    </div>
  </li>
)

/**
 * Side panel listing everyone in the meeting. Read-only: it derives
 * everything from props, so it stays in sync with the video grid.
 */
const ParticipantsDrawer = ({
  localUser,
  remoteUsers,
  audioEnabled,
  videoEnabled,
  onClose,
}: ParticipantsDrawerProps) => {
  // Local user plus everyone else
  const total = 1 + remoteUsers.length

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-900">Participants ({total})</h3>
        <button onClick={onClose} aria-label="Close participants" className="text-slate-500 hover:text-slate-900">
          <X size={18} />
        </button>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto p-3">
        <ParticipantRow
          name={localUser?.fullName ?? 'You'}
          isLocal
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
        />
        {remoteUsers.map((p) => (
          <ParticipantRow
            key={p.socketId}
            name={p.userName}
            audioEnabled={p.audioEnabled}
            videoEnabled={p.videoEnabled}
          />
        ))}
      </ul>
    </aside>
  )
}

export default ParticipantsDrawer