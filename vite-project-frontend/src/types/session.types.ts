
export interface SessionHost {
  id: string
  name: string
  email: string
}

export interface SessionParticipant {
  user: { id: string; email: string }
  name: string
  joinedAt: string
  leftAt: string | null // null while the participant is still in the meeting
}

export interface SessionMessage {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
}

export interface DummySession {
  id: number
  meetingId: string
  title: string
  status: string
  createdAt: string
  endedAt: string | null
  host: SessionHost
  participants: SessionParticipant[]
  messages: SessionMessage[]
}






export interface DummyMeetingDetails {
  id: number;
  meetingId: string;
  title: string;
  status: string;
  createdAt: string;
  host: SessionHost;
}

export interface DummyRemoteParticipant {
  socketId: string;
  userId: string;
  userName: string;
  stream: MediaStream | null;
  audioEnabled: boolean;
  videoEnabled: boolean;
}

export interface DummyChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
}
