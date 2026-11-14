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
