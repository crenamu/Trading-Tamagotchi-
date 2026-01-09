
import React, { useState } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import TradingTamagotchiAI from './components/TradingTamagotchiAI';
import { 
  MOCK_CHALLENGE, 
  MOCK_REVIEWS, 
  INITIAL_FEED 
} from './constants';
import { 
  ChallengeStatus, 
  User, 
  TradingLog 
} from './types';
import { getAiFeedback } from './services/geminiService';
import { Send, Image as ImageIcon, ExternalLink, Award, Users, Calendar, Trophy, ShieldCheck, Zap, ArrowUpRight, TrendingUp, History, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>({
    id: 'u-123',
    nickname: '초보트레이더',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    badges: [],
    status: ChallengeStatus.NOT_STARTED
  });
  
  const [feed, setFeed] = useState<TradingLog[]>(INITIAL_FEED);
  const [newLog, setNewLog] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{message?: string, sentiment: 'happy' | 'neutral' | 'sad'}>({
    sentiment: 'neutral'
  });

  const handleJoinChallenge = () => {
    setUser(prev => ({ ...prev, status: ChallengeStatus.JOINED, currentChallengeId: MOCK_CHALLENGE.id }));
    setActiveTab('dashboard');
  };

  const handleSubmitLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.trim()) return;

    setIsSubmitting(true);
    const feedback = await getAiFeedback(newLog);
    
    const log: TradingLog = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.nickname,
      timestamp: '방금 전',
      content: newLog,
      aiFeedback: feedback.feedback,
      sentiment: feedback.sentiment as any
    };

    setFeed([log, ...feed]);
    setLastFeedback({ message: feedback.feedback, sentiment: feedback.sentiment as any });
    setNewLog('');
    setIsSubmitting(false);
  };

  if (!isOnboarded) {
    return <Onboarding onStart={() => setIsOnboarded(true)} />;
  }

  const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-8 space-y-1">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground font-medium">{subtitle}</p>}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader title="Welcome back, 준호" subtitle="오늘도 감정에 휘둘리지 않는 매매를 이어가세요." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <TradingTamagotchiAI 
            sentiment={lastFeedback.sentiment} 
            message={lastFeedback.message} 
          />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground p-6 rounded-radius border border-border shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Remaining Days</span>
                <Calendar size={16} className="text-muted-foreground" />
              </div>
              <div>
                <span className="text-3xl font-black">D-12</span>
                <div className="mt-3 flex items-center space-x-2">
                  <div className="flex-1 bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[15%]" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">14.3%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card text-card-foreground p-6 rounded-radius border border-border shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Verified Logs</span>
                <History size={16} className="text-muted-foreground" />
              </div>
              <div>
                <span className="text-3xl font-black">1</span>
                <p className="text-xs text-muted-foreground mt-1 font-medium">챌린지 목표인 14회 중 1회 달성</p>
              </div>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-radius border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp size={18} className="text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-tight">Community Activity</h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground">Past 7 Days</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Mon', count: 45 }, { name: 'Tue', count: 52 },
                  { name: 'Wed', count: 38 }, { name: 'Thu', count: 65 },
                  { name: 'Fri', count: 88 }, { name: 'Sat', count: 20 },
                  { name: 'Sun', count: 15 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'currentColor'}} className="text-muted-foreground" />
                  <Tooltip 
                    cursor={{fill: 'var(--muted)'}} 
                    contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                  />
                  <Bar dataKey="count" radius={[4, 4, 4, 4]}>
                    { [45, 52, 38, 65, 88, 20, 15].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? 'var(--primary)' : 'var(--muted)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChallenge = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Challenge Details" subtitle="연습이 실전이 되는 순간, 챌린지 원칙을 확인하세요." />
      
      <div className="bg-card text-card-foreground rounded-radius border border-border overflow-hidden shadow-sm">
        <div className="bg-secondary p-8 text-secondary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <Trophy size={160} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 bg-primary/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20 text-primary">
              Session One
            </div>
            <h2 className="text-3xl font-black tracking-tight">{MOCK_CHALLENGE.title}</h2>
            <p className="text-secondary-foreground/70 font-medium text-sm max-w-lg">
              이 챌린지는 수익률 대결이 아닙니다. 자신의 원칙을 얼마나 정교하게 지켰는지를 '다마고치'와 동료들이 함께 검증합니다.
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Principles</h4>
              <div className="space-y-2">
                {MOCK_CHALLENGE.rules.map((rule, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-muted rounded-xl border border-border group transition-colors hover:bg-background">
                    <span className="text-[10px] font-black text-primary mt-0.5">0{i+1}</span>
                    <p className="text-sm font-semibold">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Statistics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-xl border border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                    <Users size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Participants</span>
                  </div>
                  <p className="text-xl font-black">{MOCK_CHALLENGE.participants}명 참여중</p>
                </div>
                <div className="p-4 bg-muted rounded-xl border border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                    <Award size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Completion Rate</span>
                  </div>
                  <p className="text-xl font-black">36.2% 예상</p>
                </div>
              </div>
              <div className="p-4 bg-accent rounded-xl border border-border">
                <div className="flex items-center space-x-2 text-accent-foreground/60 mb-1">
                  <Calendar size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Schedule</span>
                </div>
                <p className="text-sm font-bold text-accent-foreground">{MOCK_CHALLENGE.startDate} ~ {MOCK_CHALLENGE.endDate}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleJoinChallenge}
            disabled={user.status !== ChallengeStatus.NOT_STARTED}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
              user.status === ChallengeStatus.NOT_STARTED
              ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {user.status === ChallengeStatus.NOT_STARTED ? (
              <>
                <Zap size={18} fill="currentColor" />
                <span>챌린지 참가 선언하기</span>
              </>
            ) : (
              <span>현재 참여 중인 챌린지입니다</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderFeed = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Trading Feed" subtitle="동료들의 매매를 보고 배우며, 나의 원칙을 기록하세요." />
      
      <div className="bg-card text-card-foreground p-6 rounded-radius border border-border shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <ImageIcon size={16} className="text-muted-foreground" />
          <h3 className="text-xs font-black uppercase tracking-widest">Write Today's Log</h3>
        </div>
        <form onSubmit={handleSubmitLog} className="space-y-4">
          <textarea
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            placeholder="오늘의 매매 종목, 이유, 결과 그리고 당신의 감정은 어땠나요?"
            className="w-full p-4 bg-muted border border-border rounded-xl focus:ring-1 focus:ring-primary focus:bg-background focus:outline-none min-h-[140px] transition-all text-sm font-medium resize-none"
          />
          <button 
            type="submit"
            disabled={isSubmitting || !newLog.trim()}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
              isSubmitting || !newLog.trim() ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Send size={16} />
                <span>인증 일지 제출하기</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {feed.map((log) => (
          <div key={log.id} className="bg-card text-card-foreground rounded-radius border border-border shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-400">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.userId}`} className="w-8 h-8 rounded-lg bg-muted" />
                <div>
                  <p className="font-bold text-xs">{log.userName}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">{log.timestamp}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                log.sentiment === 'happy' ? 'bg-primary/10 text-primary' : 
                log.sentiment === 'sad' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
              }`}>
                {log.sentiment === 'happy' ? 'Successful' : log.sentiment === 'sad' ? 'Insightful' : 'Neutral'}
              </span>
            </div>
            
            <div className="p-5 text-sm leading-relaxed font-medium">
              <p>{log.content}</p>
            </div>
            
            {log.aiFeedback && (
              <div className="m-5 mt-0 p-4 bg-accent text-accent-foreground border border-border rounded-xl relative">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles size={12} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">AI Mentor's Choice</span>
                </div>
                <p className="text-xs leading-normal italic font-semibold">
                  "{log.aiFeedback}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAcademy = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Academy" subtitle="숙련된 트레이더의 복기 자료를 통해 시장을 보는 눈을 키우세요." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="bg-card text-card-foreground rounded-radius border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img src={review.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-secondary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 shadow-lg">
                  <span>View Content</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
              {review.type === 'video' && (
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[9px] px-2 py-1 rounded font-black uppercase tracking-widest">Video</div>
              )}
            </div>
            <div className="p-5">
              <h4 className="font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{review.title}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-muted rounded-full border border-border" />
                  <span className="text-[11px] font-bold text-muted-foreground">{review.author}</span>
                </div>
                <span className="text-[11px] font-bold text-muted-foreground italic">{review.viewCount.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Profile" subtitle="당신의 성장 궤적과 획득한 성취를 확인하세요." />
      
      <div className="bg-card text-card-foreground p-10 rounded-radius border border-border text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2 bg-muted rounded-[2rem] -z-10" />
          <img src={user.avatar} className="w-24 h-24 rounded-[2rem] bg-background shadow-xl mx-auto" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">{user.nickname}</h2>
        <p className="text-muted-foreground text-xs font-bold uppercase mt-1 tracking-widest">Training Apprentice</p>
        
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Days Spent</p>
            <p className="text-2xl font-black">12</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Logs</p>
            <p className="text-2xl font-black">4</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Status</p>
            <p className="text-2xl font-black text-primary">Lv.1</p>
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-8 rounded-radius border border-border shadow-sm">
        <div className="flex items-center space-x-2 mb-8">
          <Award size={18} className="text-primary" />
          <h3 className="text-sm font-black uppercase tracking-widest">Achievements</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { id: 'badge-1', title: 'Winner', icon: Award, color: 'bg-accent text-accent-foreground border-border', active: false },
            { id: 'badge-2', title: 'Shield', icon: ShieldCheck, color: 'bg-accent text-accent-foreground border-border', active: false },
            { id: 'badge-3', title: 'Novice', icon: Zap, color: 'bg-primary/10 text-primary border-primary/20', active: true }
          ].map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className={`flex flex-col items-center space-y-3 ${!badge.active && 'opacity-20 grayscale'}`}>
                <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center ${badge.color} transition-transform hover:scale-105 cursor-help`}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-tighter">{badge.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'challenge': return renderChallenge();
      case 'feed': return renderFeed();
      case 'academy': return renderAcademy();
      case 'profile': return renderProfile();
      default: return renderDashboard();
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
