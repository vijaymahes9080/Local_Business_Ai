import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Truck, CheckCircle2, Phone, Mail, Package, ShieldCheck } from 'lucide-react';

export default function SupplierPortal() {
  const { products, createPurchaseOrder } = useBusiness();

  const suppliers = [
    { name: 'ITC Wholesale Ltd', contact: '+91 98450 11223', leadTime: '1 day', rating: '4.9 ★', category: 'Staples' },
    { name: 'Adani Wilmar Dist.', contact: '+91 94420 55667', leadTime: '2 days', rating: '4.8 ★', category: 'Cooking Oil' },
    { name: 'Amul Dairy Federation', contact: '+91 97890 88990', leadTime: 'Daily morning', rating: '5.0 ★', category: 'Dairy' },
    { name: 'Xiaomi Direct India', contact: '+91 91234 99887', leadTime: '3 days', rating: '4.7 ★', category: 'Mobiles' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Supplier Network & PO Auto-Negotiation</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {suppliers.map((s, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{s.name}</h4>
                <span className="badge badge-emerald">{s.rating}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Category: {s.category} • Lead Time: {s.leadTime}
              </p>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Contact: {s.contact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
