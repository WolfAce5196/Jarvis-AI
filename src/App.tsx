/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, Video, Library, Settings, Zap, Wand2, Play } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Zap className="text-accent-primary" />
          <h1 className="text-xl font-bold tracking-wider text-accent-primary glow-text">STARK VIDEO AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-text-secondary">Quota: 85%</div>
          <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary"></div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 border-r border-white/10 p-4 space-y-2">
          {[
            { id: 'create', label: 'Tạo Video', icon: Video },
            { id: 'library', label: 'Thư viện', icon: Library },
            { id: 'dashboard', label: 'Thống kê', icon: LayoutDashboard },
            { id: 'settings', label: 'Cài đặt', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-bg-tertiary text-accent-primary border border-accent-primary/30' : 'text-text-secondary hover:bg-bg-secondary'}`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="hud-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-accent-primary">
              {activeTab === 'create' && 'Tạo Video Mới'}
              {activeTab === 'library' && 'Thư viện Video'}
              {activeTab === 'dashboard' && 'Dashboard Thống kê'}
              {activeTab === 'settings' && 'Cài đặt Hệ thống'}
            </h2>
            
            {activeTab === 'create' && (
              <div className="grid grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Bước 1: Kịch bản</label>
                    <textarea className="w-full h-48 bg-bg-secondary border border-border-subtle rounded-lg p-3 text-sm font-mono" placeholder="Nhập kịch bản video của bạn..."></textarea>
                    <button className="flex items-center gap-2 text-accent-primary text-sm hover:text-accent-secondary">
                      <Wand2 size={16} /> AI Viết hộ
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Bước 2: Cài đặt</label>
                    <select className="w-full bg-bg-secondary border border-border-subtle rounded-lg p-2 text-sm">
                      <option>Tỷ lệ: 9:16 (TikTok)</option>
                    </select>
                  </div>
                  <button className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-bold py-3 rounded-lg hover:shadow-[0_0_20px_var(--accent-glow)] transition-all">
                    TẠO VIDEO
                  </button>
                </div>

                {/* Preview Panel */}
                <div className="hud-panel rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="w-full aspect-[9/16] bg-bg-primary rounded-lg border border-border-subtle flex items-center justify-center text-text-muted">
                    <Play size={48} />
                  </div>
                  <div className="mt-4 w-full h-12 bg-bg-secondary rounded-lg border border-border-subtle"></div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <footer className="h-9 border-t border-white/10 flex items-center px-6 text-xs text-text-muted bg-slate-950">
        System Status: Online | API: Connected | Latency: 42ms
      </footer>
    </div>
  );
}
