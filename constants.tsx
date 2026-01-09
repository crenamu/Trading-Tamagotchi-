
import React from 'react';
import { Challenge, ReviewContent, TradingLog } from './types';

export const APP_NAME = "Trading Tamagotchi";

export const MOCK_CHALLENGE: Challenge = {
  id: 'ch-001',
  title: '제 1회 전설의 모의투자 챌린지',
  duration: '14일 (2주)',
  rules: [
    '반드시 모의계좌만 허용 (실전 금지)',
    '1일 1회 이상 매매 일지 작성 필수',
    '감정적 매매(뇌동매매) 지양하기',
    '타인 비방 및 근거 없는 추천 금지'
  ],
  participants: 124,
  completed: 45,
  startDate: '2024-05-20',
  endDate: '2024-06-03'
};

export const MOCK_REVIEWS: ReviewContent[] = [
  {
    id: 'r-1',
    title: '왜 90%가 손절하는가? 심리 트레이딩의 정석',
    thumbnail: 'https://picsum.photos/seed/trading1/400/225',
    type: 'video',
    url: '#',
    author: '마스터 킴',
    viewCount: 1250
  },
  {
    id: 'r-2',
    title: '손절가 잡는 법: 당신이 털리는 진짜 이유',
    thumbnail: 'https://picsum.photos/seed/trading2/400/225',
    type: 'article',
    url: '#',
    author: '트레이더 리',
    viewCount: 840
  },
  {
    id: 'r-3',
    title: '오늘의 복기: 지지 저항이 무너질 때 대처법',
    thumbnail: 'https://picsum.photos/seed/trading3/400/225',
    type: 'video',
    url: '#',
    author: '운영자 봇',
    viewCount: 2300
  }
];

export const INITIAL_FEED: TradingLog[] = [
  {
    id: 'f-1',
    userId: 'u-1',
    userName: '성공한개미',
    timestamp: '1시간 전',
    content: '오늘 비트코인 숏 포지션 5% 수익 보고 익절했습니다. 욕심 안 부리고 전저점에서 잘 나왔네요.',
    sentiment: 'happy',
    aiFeedback: '훌륭해요! 원칙을 지키는 매매가 다마고치를 성장시킵니다.'
  },
  {
    id: 'f-2',
    userId: 'u-2',
    userName: '한강가기싫어',
    timestamp: '3시간 전',
    content: '나스닥 롱 잡았다가 손절가 터졌습니다... 복구하려고 더 큰 비중으로 들어가려다가 참았어요.',
    sentiment: 'sad',
    aiFeedback: '복수 매매를 참은 것만으로도 큰 승리입니다. 오늘은 푹 쉬세요.'
  }
];
