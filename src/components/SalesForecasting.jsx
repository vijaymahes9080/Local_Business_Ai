import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { FORECAST_DATA } from '../data/mockData';
import {
  TrendingUp,
  Brain,
  Calendar,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  Zap,
  Activity,
  Layers
} from 'lucide-react';

export default function SalesForecasting() {
  const { products } = useBusiness();
  const [horizon, setHorizon] = useState('7Days');

  const maxVal = Math.max(...FORECAST_DATA.map((d) => d.upperBound));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--gradient-dark)', borderLeft: '4px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} color="white" />
            </div>
            <div>
              <span className="badge badge-cyan">AI Predictive Modeling</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginTop: '2px' }}>
                Sales & Stock Predictive Engine
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Powered by LightGBM & Time-Series Forecasting models with confidence boundaries.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['7Days', '30Days', 'Quarter'].map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                style={{
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: horizon === h ? 'var(--accent-cyan)' : 'var(--bg-input)',
                  color: horizon === h ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {h === '7Days' ? 'Next 7 Days' : h === '30Days' ? 'Next 30 Days' : 'Next Quarter'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Predictive Graph Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Revenue Forecast vs Actuals (₹)</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solid bars = Actuals • Gradient bars = AI Predicted bounds</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: '600' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-primary)' }} /> Actual Sales
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-cyan)' }} /> Predicted Upper Bound
            </span>
          </div>
        </div>

        {/* Forecast Chart */}
        <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
          {FORECAST_DATA.map((d, idx) => {
            const isPredicted = d.actual === null;
            const actualVal = d.actual || d.forecast;
            const heightPercent = Math.round((actualVal / maxVal) * 100);

            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', color: isPredicted ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                  ₹{(actualVal / 1000).toFixed(1)}k
                </span>

                <div
                  style={{
                    width: '100%',
                    maxWidth: '46px',
                    height: `${heightPercent}%`,
                    background: isPredicted ? 'var(--gradient-cyan)' : 'var(--gradient-brand)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    opacity: isPredicted ? 0.9 : 1
                  }}
                >
                  {isPredicted && (
                    <span style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--accent-cyan)', fontWeight: '800' }}>
                      AI
                    </span>
                  )}
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isPredicted ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Parameters & Churn Risk Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        
        {/* Model Factors */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.75rem' }}>AI Model Input Variables</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
              <span>Historical Sales Velocity Weight:</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>45%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
              <span>Festival & Seasonal Factor:</span>
              <strong style={{ color: 'var(--accent-amber)' }}>30% (+18% boost)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
              <span>Weather & Local Footfall Index:</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>25%</strong>
            </div>
          </div>
        </div>

        {/* Churn Risk Alert */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <ShieldAlert size={18} color="var(--accent-rose)" />
            <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>Customer Churn Risk Model</h4>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
            AI detected <strong>3 VIP customers</strong> at risk of churning based on declining purchase frequency over 45 days.
          </p>

          <span className="badge badge-rose">High Confidence Churn Alert</span>
        </div>

      </div>

    </div>
  );
}
