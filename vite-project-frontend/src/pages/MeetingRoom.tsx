import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Copy } from 'lucide-react'
import { dummyMeetingDetails, dummyRemoteParticipants, dummyInitialChatMessages } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import { useWebRTC } from '../hooks'
import VideoGrid from '../components/meeting/VideoGrid'
import ControlBar from '../components/meeting/ControlBar'
import ChatDrawer from '../components/meeting/ChatDrawer'
import ParticipantsDrawer from '../components/meeting/ParticipantsDrawer'

// Only one side panel can be open at a time
type Panel = 'chat' | 'participants' | null

// Meeting page (container component).
// Reads the meeting ID from the URL, wires up media via useWebRTC, and passes
// the resulting state down to presentational components.

const MeetingRoom = () => {
  const { meetingId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [activePanel, setActivePanel] = useState<Panel>(null)
  const [messages, setMessages] = useState(dummyInitialChatMessages)

  // The host is whoever created the meeting. 
  const isHost = dummyMeetingDetails.host.id === user?.id

  // Runs for participants when the host ends the meeting for everyone.
  // Wrapped in useCallback so the hook receives a stable function reference
  // and does not re-run its effects on every render.
  const handleMeetingEnded = useCallback(() => {
    toast.success('Meeting ended for all participants')
    navigate('/dashboard')
  }, [navigate])

  // Handles camera/mic access and the real-time connection for this room.
  const { localStream, audioEnabled, videoEnabled, toggleAudio, toggleVideo } = useWebRTC(
    meetingId,
    user,
    handleMeetingEnded
  )

  // Clicking the active panel's button closes it; otherwise switch to that panel
  const togglePanel = (panel: Exclude<Panel, null>) =>
    setActivePanel((current) => (current === panel ? null : panel))

  // Local-only for now; this will emit a Socket.IO event once the server is connected
  const handleSendMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        senderId: user?.id ?? '',
        senderName: user?.fullName ?? 'You',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  // Any participant can leave; the meeting continues for everyone else
  const handleLeave = () => {
    toast.success('You left the meeting')
    navigate('/dashboard')
  }

  // Host-only: ends the meeting for everyone. Will emit a Socket.IO event later
  // so that handleMeetingEnded runs for all other participants.
  const handleEndMeeting = () => {
    toast.success('Meeting ended')
    navigate('/dashboard')
  }

  // Copies the shareable meeting URL; clipboard access can fail
  // (denied permission, insecure context), so the error is handled.
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/meeting/${meetingId ?? ''}`)
      toast.success('Meeting link copied')
    } catch {
      toast.error('Could not copy the meeting link')
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-100 text-slate-900 flex flex-col overflow-hidden relative font-sans">
      {/* Top bar: meeting title, ID from the URL, and a live-status indicator */}
      <header className="w-full bg-white/90 backdrop-blur-md px-6 py-3 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            {dummyMeetingDetails.title} ({meetingId})
          </h2>
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      {/* Main area: video grid plus an optional side panel */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 p-6 flex items-center justify-center">
          {/* Remote participants are mocked until the signaling server is connected */}
          <VideoGrid
            localStream={localStream}
            localUser={user}
            remoteUsers={dummyRemoteParticipants}
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
          />
        </main>

        {activePanel === 'chat' && (
          <ChatDrawer
            messages={messages}
            currentUserId={user?.id ?? ''}
            onSend={handleSendMessage}
            onClose={() => setActivePanel(null)}
          />
        )}

        {activePanel === 'participants' && (
          <ParticipantsDrawer
            localUser={user}
            remoteUsers={dummyRemoteParticipants}
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
            onClose={() => setActivePanel(null)}
          />
        )}
      </div>

      {/* Footer: meeting ID + copy on the left, controls in the center, branding on the right */}
      <footer className="relative z-20 grid grid-cols-3 items-center border-t border-slate-200 bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-500">Id: {meetingId}</span>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Copy size={14} />
            Copy Link
          </button>
        </div>

        <div className="justify-self-center">
          <ControlBar
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
            activePanel={activePanel}
            isHost={isHost}
            participantCount={1 + dummyRemoteParticipants.length}
            onToggleAudio={toggleAudio}
            onToggleVideo={toggleVideo}
            onToggleChat={() => togglePanel('chat')}
            onToggleParticipants={() => togglePanel('participants')}
            onLeave={isHost ? handleEndMeeting : handleLeave}
          />
        </div>

        <span className="justify-self-end text-sm font-semibold text-slate-400">MeetUp Room</span>
      </footer>
    </div>
  )
}

export default MeetingRoom