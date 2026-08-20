import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { BookOpen, AlertCircle, Send, CheckCircle, IndianRupee, Clock, ArrowUpRight } from 'lucide-react';

export default function KhataLedger() {
  const { customers, triggerKhataReminder } = useBusiness();

  const khataCustomers = customers.filter((c) => c.khataBalance > 0);
  const totalKhataBalance = khataCustomers.reduce((sum, c) => sum + c.khataBalance, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL KHATA OUTSTANDING</span>
            <BookOpen size={20} color="var(--accent-amber)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-amber)' }}>
            ₹{totalKhataBalance.toLocaleString()}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across {khataCustomers.length} credit customers</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>RECOVERY RATE (30 DAYS)</span>
            <CheckCircle size={20} color="var(--accent-emerald)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-emerald)' }}>
            94.2%
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>+12% faster collection via WhatsApp UPI links</p>
        </div>

      </div>

      {/* Customer Credit List */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Khata Account Ledger</h3>
          <span className="badge badge-amber">Instant UPI Link Reminders</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {khataCustomers.map((c) => (
            <div key={c.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{c.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.phone} • Last purchase: {c.lastPurchase}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
                  ₹{c.khataBalance.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Pending Credit</span>
              </div>

              <button className="btn btn-amber" onClick={() => triggerKhataReminder(c)}>
                <Send size={15} /> Send WhatsApp Payment Link
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
