import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Clock,
  CheckCircle,
  Zap,
  ShieldCheck
} from 'lucide-react';

export default function AutonomousAgentPanel() {
  const { agentLogs, approveAgentAction } = useBusiness();

  const pendingLogs = agentLogs.filter((l) => l.status === 'Pending Approval');
  const executedLogs = agentLogs.filter((l) => l.status === 'Executed');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Loop Diagram Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--gradient-dark)', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={24} color="white" />
            </div>
            <div>
              <span className="badge badge-indigo">Autonomous AI Employee</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginTop: '2px' }}>
                Business Agent Co-Pilot Loop
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Continuous background intelligence loop: <strong>Detect → Decide → Request Approval → Execute → Verify</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { step: '1. DETECT', desc: 'Stock depletion & low sales', color: 'var(--accent-amber)' },
            { step: '2. DECIDE', desc: 'Predict reorder & discount', color: 'var(--accent-cyan)' },
            { step: '3. APPROVAL', desc: 'Ask owner confirmation', color: 'var(--accent-primary)' },
            { step: '4. EXECUTE', desc: 'Issue PO & WhatsApp campaign', color: 'var(--accent-emerald)' },
            { step: '5. VERIFY', desc: 'Audit revenue impact', color: 'var(--accent-pink)' }
          ].map((s, idx) => (
            <React.Fragment key={idx}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: s.color }}>{s.step}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.desc}</span>
              </div>
              {idx < 4 && <ArrowRight size={16} color="var(--text-muted)" style={{ opacity: 0.5 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Pending Action Approvals Queue */}
      {pendingLogs.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertCircle size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Pending Approval Requests ({pendingLogs.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {pendingLogs.map((log) => (
              <div key={log.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-amber">{log.type}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Confidence: {log.confidence}</span>
                  </div>
                  <p style={{ fontWeight: '700', fontSize: '0.9rem', marginTop: '4px' }}>{log.description}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
                    Action: {log.actionRequired}
                  </p>
                </div>

                <button
                  className="btn btn-emerald"
                  onClick={() => approveAgentAction(log.id)}
                >
                  <CheckCircle2 size={16} /> Approve & Execute
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executed Agent Activity History */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Agent Execution Log History</h3>
          <span className="badge badge-emerald">Audit Trail Verified</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {agentLogs.map((log) => (
            <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={16} color={log.status === 'Executed' ? 'var(--accent-emerald)' : 'var(--accent-amber)'} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem' }}>{log.type}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{log.description}</p>
                </div>
              </div>

              <span className={`badge ${log.status === 'Executed' ? 'badge-emerald' : 'badge-amber'}`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
