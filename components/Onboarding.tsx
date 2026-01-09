
import React from 'react';
import { PlayCircle, ShieldCheck, Zap, ArrowRight, Shield } from 'lucide-react';

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 selection:bg-accent selection:text-accent-foreground">
      <div className="max-w-3xl w-full space-y-12 animate-in fade-in zoom-in-95 duration-1000">
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform cursor-pointer group">
            <Zap className="text-primary-foreground group-hover:scale-110 transition-transform" size={32} fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Protect Capital.<br/>
            <span className="text-muted-foreground">Master Yourself.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            트레이딩 다마고치는 실전 매매 전 당신의 원칙을 정교하게 <br className="hidden md:block" />
            다듬어주는 0원 트레이딩 동행 연습 서비스입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card text-card-foreground rounded-[2rem] p-8 border border-border group cursor-pointer hover:border-primary/50 transition-all">
            <div className="w-10 h-10 bg-background rounded-xl shadow-sm border border-border flex items-center justify-center mb-6 text-primary">
              <Shield size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-xl mb-2 tracking-tight">왜 연습이 필요한가요?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              시장은 자비가 없습니다. 다마고치와 함께하는 모의투자 챌린지는 실전 투입 전 당신의 심리와 원칙을 객관적으로 검증하는 방패가 됩니다.
            </p>
          </div>
          
          <div className="bg-secondary text-secondary-foreground rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 bg-background/10 rounded-xl border border-background/20 flex items-center justify-center mb-6 text-primary/70">
                <PlayCircle size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-xl mb-2 tracking-tight text-white">Introduction Video</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium flex-1">
                서비스의 철학과 챌린지 참여 방법을 60초 요약 영상으로 확인해보세요.
              </p>
              <button className="mt-6 text-xs font-black uppercase tracking-widest flex items-center space-x-2 group-hover:translate-x-1 transition-transform text-white">
                <span>Watch now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={onStart}
            className="w-full py-5 bg-primary hover:opacity-90 text-primary-foreground rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center space-x-3"
          >
            <span>챌린지 시작하기</span>
            <ArrowRight size={20} />
          </button>
          <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-[0.2em]">
            Already joined over 12,402+ traders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
