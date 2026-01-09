
import React, { useState } from 'react';
import { Home, Trophy, BookOpen, User, MessageCircle, Menu, X, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'challenge', label: 'Challenge', icon: Trophy },
    { id: 'feed', label: 'Trading Feed', icon: MessageCircle },
    { id: 'academy', label: 'Academy', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans selection:bg-accent selection:text-accent-foreground">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">T</div>
          <h1 className="text-lg font-bold tracking-tight">Tamagotchi</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8 hidden md:block">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black shadow-lg">T</div>
              <h1 className="text-xl font-bold tracking-tighter text-sidebar-foreground">Trading</h1>
            </div>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest pl-1">Tamagotchi Service</p>
          </div>
          
          <nav className="flex-1 px-4 py-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    isActive 
                    ? 'bg-secondary text-secondary-foreground shadow-sm' 
                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-6">
            <div className="bg-muted border border-border rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Live Status</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed font-medium">
                "성공적인 트레이더는 <br/>예측하지 않고 대응합니다."
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-secondary/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 md:px-10 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
