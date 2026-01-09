
import React from 'react';
import { Smile, Frown, Meh, Sparkles } from 'lucide-react';

interface Props {
  sentiment: 'happy' | 'neutral' | 'sad';
  message?: string;
}

const TradingTamagotchiAI: React.FC<Props> = ({ sentiment, message }) => {
  const getAvatar = () => {
    switch (sentiment) {
      case 'happy':
        return <Smile size={48} className="text-primary" />;
      case 'sad':
        return <Frown size={48} className="text-destructive" />;
      default:
        return <Meh size={48} className="text-muted-foreground" />;
    }
  };

  const getStatusInfo = () => {
    switch (sentiment) {
      case 'happy': return { label: 'Excellent', color: 'bg-primary/10 text-primary' };
      case 'sad': return { label: 'Needs Focus', color: 'bg-destructive/10 text-destructive' };
      default: return { label: 'Stable', color: 'bg-muted text-muted-foreground' };
    }
  };

  const status = getStatusInfo();

  return (
    <div className="bg-card text-card-foreground rounded-radius border border-border shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles size={16} className="text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-tight">AI Coach Tamagotchi</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-4 text-center">
        <div className="mb-6 relative">
          <div className={`absolute -inset-4 rounded-full blur-xl opacity-20 ${sentiment === 'happy' ? 'bg-primary' : sentiment === 'sad' ? 'bg-destructive' : 'bg-muted-foreground'}`} />
          <div className="relative">
            {getAvatar()}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm leading-relaxed font-medium">
            {message ? `"${message}"` : "매매 일지를 공유해주시면 제가 성장을 돕는 피드백을 드릴게요."}
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground font-bold uppercase">Growth Progress</span>
          <span className="text-[11px] font-black">Level 1 (12%)</span>
        </div>
        <div className="mt-2 w-full bg-muted h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-[12%] transition-all duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default TradingTamagotchiAI;
