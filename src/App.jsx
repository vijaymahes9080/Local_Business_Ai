import React, { useState } from 'react';
import { BusinessProvider, useBusiness } from './context/BusinessContext';
import Header from './components/Header';
import VoiceCopilotModal from './components/VoiceCopilotModal';
import POSBilling from './components/POSBilling';
import InventoryManager from './components/InventoryManager';
import WhatsAppAssistant from './components/WhatsAppAssistant';
import AIMarketing from './components/AIMarketing';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SalesForecasting from './components/SalesForecasting';
import AutonomousAgentPanel from './components/AutonomousAgentPanel';

import {
  CreditCard,
  Package,
  MessageSquare,
  Megaphone,
  BarChart3,
  TrendingUp,
  Bot,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('pos');
  const { currentBusiness, agentLogs } = useBusiness();

  const pendingAgentCount = agentLogs.filter((l) => l.status === 'Pending Approval').length;

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Grid Layout */}
      <div className="main-layout">
        
        {/* Sidebar Nav */}
        <aside className="nav-sidebar">
          
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MAIN OPERATING MODULES
            </span>
          </div>

          <button
            className={`nav-item ${activeTab === 'pos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pos')}
          >
            <CreditCard size={18} />
            <span>Smart Billing POS</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={18} />
            <span>AI Inventory & PO</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            <MessageSquare size={18} />
            <span>WhatsApp AI Chat</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketing')}
          >
            <Megaphone size={18} />
            <span>AI Marketing Suite</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={18} />
            <span>Customer Analytics</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'forecast' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecast')}
          >
            <TrendingUp size={18} />
            <span>Sales Predictive AI</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent')}
            style={{ position: 'relative' }}
          >
            <Bot size={18} />
            <span>Autonomous Agent</span>
            {pendingAgentCount > 0 && (
              <span className="badge badge-amber" style={{ marginLeft: 'auto', padding: '2px 6px', fontSize: '0.65rem' }}>
                {pendingAgentCount}
              </span>
            )}
          </button>

          {/* Quick Business Card Summary */}
          <div className="glass-panel" style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(99, 102, 241, 0.08)' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '6px' }}>Store Profile</span>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800' }}>{currentBusiness.name}</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{currentBusiness.location}</p>
          </div>

        </aside>

        {/* Main Workspace Body */}
        <main>
          {activeTab === 'pos' && <POSBilling />}
          {activeTab === 'inventory' && <InventoryManager />}
          {activeTab === 'whatsapp' && <WhatsAppAssistant />}
          {activeTab === 'marketing' && <AIMarketing />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'forecast' && <SalesForecasting />}
          {activeTab === 'agent' && <AutonomousAgentPanel />}
        </main>

      </div>

      {/* Voice Assistant Modal */}
      <VoiceCopilotModal />
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <AppContent />
    </BusinessProvider>
  );
}
