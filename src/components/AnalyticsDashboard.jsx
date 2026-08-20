import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { HOURLY_SALES_DATA } from '../data/mockData';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Repeat,
  Sparkles,
  BarChart2,
  Clock,
  ArrowUpRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { transactions, customers, products } = useBusiness();

  const totalRevenue = transactions.reduce((sum, t) => sum + t.totalAmount, 0) + 280000;
  const avgOrderValue = Math.round(totalRevenue / 410);

  const maxHourlySales = Math.max(...HOURLY_SALES_DATA.map((d) => d.sales));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL MONTHLY REVENUE</span>
            <TrendingUp size={20} color="var(--accent-emerald)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-emerald)' }}>
            ₹{(totalRevenue / 100000).toFixed(2)} Lakh
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +14.2% vs last month
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>ACTIVE CUSTOMERS</span>
            <Users size={20} color="var(--accent-primary)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px' }}>
            1,245
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +86 new this month
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>AVG ORDER VALUE (AOV)</span>
            <ShoppingBag size={20} color="var(--accent-amber)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px' }}>
            ₹{avgOrderValue}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            +₹42 increase per basket
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>RETURNING CUSTOMERS</span>
            <Repeat size={20} color="var(--accent-cyan)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-cyan)' }}>
            42%
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            Generates 61% of total revenue
          </span>
        </div>

      </div>

      {/* AI Narrative Intelligence Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.08)', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', items: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <span className="badge badge-indigo">AI Plain-Language Reasoning Engine</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Executive Business Insights</h3>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="glass-card" style={{ background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
              <Lightbulb size={16} /> Key Growth Driver
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <strong>Returning customers generated 61% of total revenue this month.</strong> Customers purchasing Fortune Sunflower Oil have an <strong>85% probability</strong> of purchasing Aashirvaad Atta within 14 days.
            </p>
          </div>

          <div className="glass-card" style={{ background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
              <Clock size={16} /> Peak Hour Opportunity
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <strong>Peak store footfall occurs between 6:00 PM and 8:00 PM</strong> (contributing 38% of daily sales). Staffing should be maximized during evening peak billing hours.
            </p>
          </div>
        </div>
      </div>

      {/* Hourly Sales Visualization Chart */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Hourly Store Revenue Distribution</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily peak transaction times & footfall intensity</p>
          </div>
          <span className="badge badge-emerald">Real-time Feed</span>
        </div>

        {/* SVG Bar Chart */}
        <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
          {HOURLY_SALES_DATA.map((item, idx) => {
            const heightPercent = Math.round((item.sales / maxHourlySales) * 100);
            const isPeak = item.sales === maxHourlySales;

            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: isPeak ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  ₹{(item.sales / 1000).toFixed(1)}k
                </span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '42px',
                    height: `${heightPercent}%`,
                    background: isPeak ? 'var(--gradient-emerald)' : 'var(--gradient-brand)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.4s ease',
                    boxShadow: isPeak ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
