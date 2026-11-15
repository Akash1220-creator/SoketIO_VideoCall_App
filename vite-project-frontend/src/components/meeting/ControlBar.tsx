import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users } from 'lucide-react'

interface ControlBarProps {
  audioEnabled: boolean
  videoEnabled: boolean
  // Which side panel is currently open (null = none); used to highlight its button
  activePanel: 'chat' | 'participants' | null
  // Hosts end the meeting for everyone; other participants simply leave
  isHost: boolean
  participantCount: number
  onToggleAudio: () => void
  onToggleVideo: () => void
  onToggleChat: () => void
  onToggleParticipants: () => void
  onLeave: () => void
}

//Row of in-call controls (mic, camera, chat, participants, leave/end).
  
const ControlBar = ({
  audioEnabled,
  videoEnabled,
  activePanel,
  isHost,
  participantCount,
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onToggleParticipants,
  onLeave,
}: ControlBarProps) => {
  // Neutral style when the device is on, red when it is turned off
  const deviceButtonClass = (enabled: boolean) =>
    `flex size-12 items-center justify-center rounded-full transition-colors ${
      enabled
        ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
        : 'bg-red-500 text-white hover:bg-red-600'
    }`

  // Neutral style normally, blue highlight while the matching panel is open
  const panelButtonClass = (active: boolean) =>
    `flex size-12 items-center justify-center rounded-full transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
    }`

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggleAudio}
        className={deviceButtonClass(audioEnabled)}
        aria-label={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
      >
        {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
      </button>

      <button
        onClick={onToggleVideo}
        className={deviceButtonClass(videoEnabled)}
        aria-label={videoEnabled ? 'Turn camera off' : 'Turn camera on'}
      >
        {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
      </button>

      <button
        onClick={onToggleChat}
        className={panelButtonClass(activePanel === 'chat')}
        aria-label="Toggle chat"
      >
        <MessageSquare size={20} />
      </button>

      <button
        onClick={onToggleParticipants}
        className={`relative ${panelButtonClass(activePanel === 'participants')}`}
        aria-label="Toggle participants"
      >
        <Users size={20} />
        {/* Live participant count badge */}
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-slate-700 text-[10px] font-semibold text-white">
          {participantCount}
        </span>
      </button>

      <button
        onClick={onLeave}
        className="flex h-12 items-center gap-2 rounded-full bg-red-500 px-5 font-medium text-white transition-colors hover:bg-red-600"
        aria-label={isHost ? 'End meeting for everyone' : 'Leave meeting'}
      >
        <PhoneOff size={20} />
        {isHost ? 'End Meeting' : 'Leave'}
      </button>
    </div>
  )
}

export default ControlBar