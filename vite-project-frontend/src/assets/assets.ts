import type { DummyUser, DummyStats, DummySession } from '../types';

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
