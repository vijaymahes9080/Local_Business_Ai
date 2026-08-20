import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { BUSINESS_TYPES } from '../data/mockData';
import { Mic, Store, Globe, Sun, Moon, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Header() {
  const {
    currentBusiness,
    setCurrentBusiness,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsVoiceModalOpen,
    agentLogs
  } = useBusiness();

  const pendingApprovalsCount = agentLogs.filter((l) => l.status === 'Pending Approval').length;

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '0.875rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand & Store Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Store size={22} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '800', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Local Business AI
                </h1>
                <span className="badge badge-indigo">
                  <Sparkles size={11} /> AI OS
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Autonomous Business Co-Pilot
              </p>
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />

          {/* Business Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Store size={15} color="var(--accent-primary)" />
            <select
              value={currentBusiness.id}
              onChange={(e) => {
                const found = BUSINESS_TYPES.find((b) => b.id === e.target.value);
                if (found) setCurrentBusiness(found);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {BUSINESS_TYPES.map((b) => (
                <option key={b.id} value={b.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  {b.name} ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions & Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          
          {/* Voice Co-Pilot Launcher */}
          <button
            className="btn btn-primary animate-pulse-glow"
            onClick={() => setIsVoiceModalOpen(true)}
            style={{ padding: '0.55rem 1.1rem', borderRadius: 'var(--radius-full)' }}
          >
            <Mic size={18} />
            <span>AI Voice Co-Pilot</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.8, background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px' }}>
              {language === 'ta' ? 'தமிழ்' : language === 'hi' ? 'हिंदी' : 'Ask Anything'}
            </span>
          </button>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-input)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Globe size={14} color="var(--text-muted)" style={{ marginLeft: '4px' }} />
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: language === 'en' ? 'var(--accent-primary)' : 'transparent',
                color: language === 'en' ? 'white' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: language === 'ta' ? 'var(--accent-primary)' : 'transparent',
                color: language === 'ta' ? 'white' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguage('hi')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: language === 'hi' ? 'var(--accent-primary)' : 'transparent',
                color: language === 'hi' ? 'white' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              हिंदी
            </button>
          </div>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button className="btn btn-secondary btn-icon">
              <Bell size={17} />
              {pendingApprovalsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--accent-rose)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pendingApprovalsCount}
                </span>
              )}
            </button>
          </div>

          {/* Theme Toggle */}
          <button className="btn btn-secondary btn-icon" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

      </div>
    </header>
  );
}
