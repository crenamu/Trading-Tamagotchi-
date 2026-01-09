
export enum ChallengeStatus {
  NOT_STARTED = 'NOT_STARTED',
  JOINED = 'JOINED',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED'
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  badges: string[];
  status: ChallengeStatus;
  currentChallengeId?: string;
}

export interface TradingLog {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  aiFeedback?: string;
  sentiment?: 'happy' | 'neutral' | 'sad';
}

export interface Challenge {
  id: string;
  title: string;
  duration: string;
  rules: string[];
  participants: number;
  completed: number;
  startDate: string;
  endDate: string;
}

export interface ReviewContent {
  id: string;
  title: string;
  thumbnail: string;
  type: 'video' | 'article';
  url: string;
  author: string;
  viewCount: number;
}
