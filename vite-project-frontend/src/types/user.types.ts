export interface UserEmail {
  emailAddress: string;
}

export interface DummyUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  name: string;
  primaryEmailAddress: UserEmail;
  imageUrl: string;
}

export interface DummyStats {
  plan: string;
  monthlyCount: number;
  monthlyLimit: number | null;
  maxParticipants: number;
}
