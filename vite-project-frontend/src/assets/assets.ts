import type { DummyUser, DummyStats, DummySession, DummyMeetingDetails, DummyRemoteParticipant, DummyChatMessage } from '../types';

export const dummyUser: DummyUser = {
  id: "user_mock_001",
  fullName: "Alex Rivera",
  firstName: "Alex",
  lastName: "Rivera",
  name: "Alex Rivera",
  primaryEmailAddress: {
    emailAddress: "alex.rivera@example.com",
  },
  imageUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

export const dummyStats: DummyStats = {
  plan: "premium",
  monthlyCount: 8,
  monthlyLimit: null, // Unlimited for premium
  maxParticipants: 100,
};

export const dummySessions: DummySession[] = [
  {
    id: 1,
    meetingId: "qwe-rty-uio",
    title: "Sprint Planning & Roadmap Review",
    status: "ended",
    createdAt: "2026-08-14T09:30:00.000Z",
    endedAt: "2026-08-14T10:45:00.000Z",
    host: {
      id: "user_mock_001",
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
    },
    participants: [
      {
        user: { id: "user_mock_001", email: "alex.rivera@example.com" },
        name: "Alex Rivera",
        joinedAt: "2026-08-14T09:30:00.000Z",
        leftAt: "2026-08-14T10:45:00.000Z",
      },
    ],
  },
];

export const dummyMeetingDetails: DummyMeetingDetails = {
  id: 101,
  meetingId: "abc-def-ghi",
  title: "Instant Meeting",
  status: "active",
  createdAt: new Date().toISOString(),
  host: {
    id: "user_mock_001",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
  },
};

export const dummyRemoteParticipants: DummyRemoteParticipant[] = [
  {
    socketId: "socket_sarah_002",
    userId: "user_mock_002",
    userName: "Sarah Chen",
    stream: null,
    audioEnabled: true,
    videoEnabled: true,
  },
  {
    socketId: "socket_marcus_003",
    userId: "user_mock_003",
    userName: "Marcus Vance",
    stream: null,
    audioEnabled: false,
    videoEnabled: true,
  },
  {
    socketId: "socket_elena_004",
    userId: "user_mock_004",
    userName: "Elena Rostova",
    stream: null,
    audioEnabled: true,
    videoEnabled: false,
  },
];

export const dummyInitialChatMessages: DummyChatMessage[] = [
  {
    id: "chat_01",
    senderId: "user_mock_002",
    senderName: "Sarah Chen",
    text: "Hey Alex! Can you hear me clearly?",
    time: "02:15 PM",
  },
  {
    id: "chat_02",
    senderId: "user_mock_003",
    senderName: "Marcus Vance",
    text: "Loud and clear! Ready for the walkthrough.",
    time: "02:16 PM",
  },
];
