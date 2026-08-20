import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Megaphone,
  Sparkles,
  Users,
  Send,
  TrendingUp,
  Share2,
  Calendar,
  CheckCircle2,
  Copy,
  Zap,
  Tag
} from 'lucide-react';

export default function AIMarketing() {
  const { customers, campaigns, setCampaigns, currentBusiness } = useBusiness();
  const [selectedSegment, setSelectedSegment] = useState('All Customers');
  const [promoType, setPromoType] = useState('Festival Offer');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateCopy = () => {
    let copyText = '';
    if (promoType === 'Festival Offer') {
      copyText = `🎉 Festive Super Sale at ${currentBusiness.name}! Get flat 15% OFF on all grocery staples & dairy. Order directly on WhatsApp or visit our store today! Valid till Sunday.`;
      setCampaignTitle(`Ganesh Chaturthi Special Blast`);
    } else if (promoType === 'Inactive Customer Win-Back') {
      copyText = `We miss you at ${currentBusiness.name}! Enjoy ₹100 OFF on your next purchase above ₹500. Use coupon code: BACK100 when you visit us!`;
      setCampaignTitle(`Win-Back Campaign (>60 Days)`);
    } else if (promoType === 'VIP Customer Reward') {
      copyText = `🌟 Special VIP Appreciation! As a valued regular customer at ${currentBusiness.name}, claim your complimentary gift hamper on your next order above ₹1,000!`;
      setCampaignTitle(`VIP Customer Loyalty Reward`);
    } else {
      copyText = `🔥 Weekend Clearance Sale at ${currentBusiness.name}! Buy 2 get 1 FREE on select items. Stock up now before items run out!`;
      setCampaignTitle(`Weekend Flash Clearance`);
    }
    setGeneratedCopy(copyText);
  };

  const handleLaunchCampaign = () => {
    if (!generatedCopy) return;

    const newCamp = {
      id: `camp-${Date.now()}`,
      title: campaignTitle || `${promoType} Campaign`,
      segment: selectedSegment,
      channel: 'WhatsApp & SMS Broadcast',
      status: 'Active',
      sentCount: selectedSegment === 'VIP Customer' ? 42 : selectedSegment === 'Inactive Customer' ? 180 : 1245,
      conversions: 0,
      revenueDriven: 0,
      content: generatedCopy
    };

    setCampaigns([newCamp, ...campaigns]);
    setGeneratedCopy('');
    alert(`🚀 Campaign "${newCamp.title}" launched successfully to ${newCamp.sentCount} recipients via WhatsApp!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--gradient-dark)', borderLeft: '4px solid var(--accent-pink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Megaphone size={24} color="white" />
            </div>
            <div>
              <span className="badge badge-indigo">AI Marketing Suite</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginTop: '2px' }}>
                Automated Customer Campaign Engine
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Target customers by purchase frequency, generate high-converting WhatsApp copy, and measure ROI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segmentation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { title: 'VIP Customers', count: customers.filter((c) => c.segment === 'VIP Customer').length, color: 'var(--accent-emerald)', desc: 'High lifetime value' },
          { title: 'Regular Customers', count: customers.filter((c) => c.segment === 'Regular').length, color: 'var(--accent-cyan)', desc: 'Weekly buyers' },
          { title: 'Inactive (>60 Days)', count: customers.filter((c) => c.daysInactive >= 60).length, color: 'var(--accent-rose)', desc: 'Win-back candidates' },
          { title: 'Price-Sensitive', count: customers.filter((c) => c.segment === 'Price-Sensitive').length, color: 'var(--accent-amber)', desc: 'Discount responders' }
        ].map((seg, idx) => (
          <div key={idx} className="glass-card" style={{ borderLeft: `4px solid ${seg.color}` }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)' }}>SEGMENT</span>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', marginTop: '2px' }}>{seg.title}</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '6px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: seg.color }}>{seg.count}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{seg.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Generator & Active List split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        
        {/* LEFT: AI Generator */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <Sparkles size={18} color="var(--accent-pink)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>AI Campaign Generator</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                TARGET CUSTOMER SEGMENT
              </label>
              <select
                className="input-field"
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
              >
                <option value="All Customers">All Customers (1,245 contacts)</option>
                <option value="VIP Customer">VIP Customers (42 contacts)</option>
                <option value="Inactive Customer">Inactive Customers &gt;60 Days (180 contacts)</option>
                <option value="Price-Sensitive">Price Sensitive Bargain Hunters (95 contacts)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                CAMPAIGN GOAL / TYPE
              </label>
              <select
                className="input-field"
                value={promoType}
                onChange={(e) => setPromoType(e.target.value)}
              >
                <option value="Festival Offer">Festival & Holiday Sale Offer</option>
                <option value="Inactive Customer Win-Back">Inactive Customer Win-Back Discount</option>
                <option value="VIP Customer Reward">VIP Appreciation Gift Hamper</option>
                <option value="Clearance Sale">Weekend Flash Clearance</option>
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleGenerateCopy} style={{ justifyContent: 'center' }}>
              <Zap size={16} /> Generate AI Campaign Copy
            </button>

            {generatedCopy && (
              <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.08)', borderLeft: '4px solid var(--accent-pink)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-rose">Generated Copy</span>
                  <button
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCopy);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <Copy size={15} /> {copied ? 'Copied!' : ''}
                  </button>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.5', fontWeight: '500' }}>
                  {generatedCopy}
                </p>

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-emerald" onClick={handleLaunchCampaign} style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={15} /> Broadcast via WhatsApp & SMS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Active Campaigns List */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Active & Past Campaigns</h3>
            <span className="badge badge-emerald">{campaigns.length} Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {campaigns.map((camp) => (
              <div key={camp.id} className="glass-card" style={{ padding: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{camp.title}</h4>
                  <span className="badge badge-indigo">{camp.status}</span>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Target: {camp.segment} • Channel: {camp.channel}
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>RECIPIENTS</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '800' }}>{camp.sentCount}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>CONVERSIONS</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>{camp.conversions}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>REVENUE GENERATED</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>₹{camp.revenueDriven.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
