export interface SessionHost {
  id: string;
  name: string;
  email: string;
}

export interface SessionParticipantUser {
  id: string;
  email: string;
}

export interface SessionParticipant {
  user: SessionParticipantUser;
  name: string;
  joinedAt: string;
  leftAt: string;
}

export interface DummySession {
  id: number;
  meetingId: string;
  title: string;
  status: string;
  createdAt: string;
  endedAt: string;
  host: SessionHost;
  participants: SessionParticipant[];
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
