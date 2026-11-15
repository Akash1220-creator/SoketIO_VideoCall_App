import { useEffect, useRef } from 'react'
import { MicOff, VideoOff } from 'lucide-react'
import type { DummyUser, DummyRemoteParticipant } from '../../types'

interface VideoGridProps {
  localStream: MediaStream | null
  localUser: DummyUser | null
  remoteUsers: DummyRemoteParticipant[]
  audioEnabled: boolean
  videoEnabled: boolean
}

interface VideoTileProps {
  name: string
  stream: MediaStream | null
  isLocal?: boolean
  audioEnabled: boolean
  videoEnabled: boolean
}

/**
 * Returns the responsive grid layout for a given participant count.
 * Full class strings are used on purpose: Tailwind scans source files at
 * build time, so dynamically built names like `grid-cols-${n}` get purged.
 */
const getGridClass = (total: number) => {
  if (total === 1) return 'grid-cols-1 max-w-2xl'
  if (total === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-4xl'
  if (total <= 4) return 'grid-cols-2 max-w-4xl'
  return 'grid-cols-2 lg:grid-cols-3 max-w-6xl'
}

/**
 * A single participant tile. Renders one of three states:
 *  1. Live video       - camera is on and a MediaStream is attached
 *  2. Empty dark tile  - camera is on but no stream yet (e.g. still connecting)
 *  3. Avatar fallback  - camera is turned off by the participant
 */
const VideoTile = ({ name, stream, isLocal, audioEnabled, videoEnabled }: VideoTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const showVideo = videoEnabled && !!stream

  // `srcObject` cannot be passed as a JSX prop, so the stream is attached
  // imperatively. `showVideo` is a dependency because the <video> element
  // unmounts when the camera is toggled off, and a fresh element needs the
  // stream re-attached when it comes back (otherwise: black screen).
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream
  }, [stream, showVideo])

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-md">
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          // Mute the local preview to avoid audio feedback (echo) from our own mic.
          muted={isLocal}
          // Mirror only the local preview so it behaves like a mirror; remote video stays unflipped.
          className={`h-full w-full object-cover ${isLocal ? '-scale-x-100' : ''}`}
        />
      ) : (
        !videoEnabled && (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            {/* Initial-letter avatar shown while the camera is off */}
            <div className="flex size-14 items-center justify-center rounded-full bg-indigo-900 text-xl font-semibold text-indigo-200 ring-1 ring-indigo-500/40">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="flex items-center gap-1 rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
              <VideoOff size={12} className="text-red-400" />
              Camera Off
            </span>
          </div>
        )
      )}

      {/* Name label with a muted-mic indicator */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-white">
        <span>{isLocal ? `${name} (You)` : name}</span>
        {!audioEnabled && <MicOff size={13} className="text-red-400" />}
      </div>
    </div>
  )
}

/**
 * Presentational component: lays out the local participant plus all remote
 * participants in an adaptive grid. It owns no meeting state; everything
 * arrives via props from MeetingRoom, which keeps it easy to test and reuse.
 */
const VideoGrid = ({
  localStream,
  localUser,
  remoteUsers,
  audioEnabled,
  videoEnabled,
}: VideoGridProps) => {
  // Local user + remote participants, used to pick the grid layout
  const total = 1 + remoteUsers.length

  return (
    <div className={`mx-auto grid w-full gap-4 ${getGridClass(total)}`}>
      {/* Local participant always renders first */}
      <VideoTile
        name={localUser?.fullName ?? 'You'}
        stream={localStream}
        isLocal
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
      />

      {/* Remote participants. socketId is a stable, unique key per connection */}
      {remoteUsers.map((p) => (
        <VideoTile
          key={p.socketId}
          name={p.userName}
          stream={p.stream}
          audioEnabled={p.audioEnabled}
          videoEnabled={p.videoEnabled}
        />
      ))}
    </div>
  )
}

export default VideoGrid