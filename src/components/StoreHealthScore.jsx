import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { ShieldCheck, Award, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function StoreHealthScore() {
  const { products, customers, transactions } = useBusiness();

  // Calculate Health Index (0-100)
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;
  const stockScore = Math.max(0, 100 - lowStockCount * 15);
  const returningRateScore = 85;
  const overallScore = Math.round((stockScore + returningRateScore + 92) / 3);

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--gradient-dark)', borderLeft: '4px solid var(--accent-emerald)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--gradient-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.25rem',
            color: 'white',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            {overallScore}
          </div>

          <div>
            <span className="badge badge-emerald">
              <ShieldCheck size={12} /> AI Store Health Score
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginTop: '2px' }}>
              Operational Health Index: Excellent ({overallScore}/100)
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Margins optimized • Low stockout risk • High credit recovery rate
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ textAlign: 'center', padding: '0.5rem 0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>STOCK HEALTH</span>
            <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>{stockScore}%</p>
          </div>
          <div style={{ textAlign: 'center', padding: '0.5rem 0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>RETIREMENT INDEX</span>
            <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>92/100</p>
          </div>
        </div>
      </div>
    </div>
  );
}
