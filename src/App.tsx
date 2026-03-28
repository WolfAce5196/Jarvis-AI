/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, Video, Library, Settings, Zap, Wand2, Play, Download, Trash2, Edit, Volume2 } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const CreateVideoPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
    const steps = ['Phân tích kịch bản...', 'Tạo hình ảnh...', 'Tạo giọng đọc...', 'Ghép video...', 'Hoàn thành!'];
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps.length) * 100);
      setStatus(steps[currentStep - 1]);
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setIsGenerating(false), 1000);
      }
    }, 1500);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
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
          <div className="flex gap-2">
            <select 
              className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg p-2 text-sm"
              onChange={(e) => console.log('Selected voice:', e.target.value)}
            >
              <option value="voice1">ElevenLabs: Rachel</option>
              <option value="voice2">ElevenLabs: Adam</option>
              <option value="voice3">ElevenLabs: Bella</option>
            </select>
            <button 
              className="p-2 bg-bg-secondary border border-border-subtle rounded-lg hover:text-accent-primary"
              onClick={() => {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance('Đây là bản thử nghiệm giọng đọc AI.');
                synth.speak(utterance);
              }}
            >
              <Volume2 size={16} />
            </button>
          </div>
          <select className="w-full bg-bg-secondary border border-border-subtle rounded-lg p-2 text-sm">
            <option>Tỷ lệ: 9:16 (TikTok)</option>
          </select>
        </div>
        <button 
          onClick={startGeneration}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-bold py-3 rounded-lg hover:shadow-[0_0_20px_var(--accent-glow)] transition-all disabled:opacity-50"
        >
          {isGenerating ? 'ĐANG XỬ LÝ...' : 'TẠO VIDEO'}
        </button>
      </div>

      <div className="hud-panel rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
        {isGenerating && <div className="scan-line"></div>}
        <div className="w-full aspect-[9/16] bg-bg-primary rounded-lg border border-border-subtle flex items-center justify-center text-text-muted relative">
          {isGenerating ? (
            <div className="text-center p-4">
              <div className="typewriter text-accent-primary font-mono text-sm">{status}</div>
              <div className="w-48 h-2 bg-bg-secondary rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-accent-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <Play size={48} />
          )}
        </div>
        <div className="mt-4 w-full h-12 bg-bg-secondary rounded-lg border border-border-subtle"></div>
      </div>
    </div>
  );
};
// ... rest of the components remain same

const LibraryPage = () => {
  const videos = [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid grid-cols-4 gap-4">
      {videos.map(i => (
        <div key={i} className="hud-panel rounded-lg p-3 space-y-2 group">
          <div className="aspect-[9/16] bg-bg-primary rounded border border-border-subtle flex items-center justify-center text-text-muted">
            <Play size={24} />
          </div>
          <div className="text-sm font-bold">Video Thời trang {i}</div>
          <div className="text-xs text-text-muted">12/03/2026</div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:text-accent-primary"><Download size={16} /></button>
            <button className="p-1 hover:text-accent-primary"><Edit size={16} /></button>
            <button className="p-1 hover:text-accent-danger"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  const data = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [{
      label: 'Video tạo',
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: '#00d4ff',
      backgroundColor: 'rgba(0, 212, 255, 0.1)',
    }]
  };
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="hud-panel p-4 rounded-lg">
        <Line data={data} options={{ responsive: true, plugins: { legend: { labels: { color: '#e8eaff' } } } }} />
      </div>
      <div className="hud-panel p-4 rounded-lg">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { labels: { color: '#e8eaff' } } } }} />
      </div>
    </div>
  );
};

const SettingsPage = () => <div className="text-text-secondary">Cài đặt hệ thống (Đang phát triển)</div>;

export default function App() {
  const [activeTab, setActiveTab] = useState('create');

  const renderContent = () => {
    switch (activeTab) {
      case 'create': return <CreateVideoPage />;
      case 'library': return <LibraryPage />;
      case 'dashboard': return <DashboardPage />;
      case 'settings': return <SettingsPage />;
      default: return <CreateVideoPage />;
    }
  };

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
            {renderContent()}
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
