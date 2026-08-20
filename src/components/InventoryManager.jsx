import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Clock,
  PlusCircle,
  Truck,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function InventoryManager() {
  const { products, setProducts, createPurchaseOrder } = useBusiness();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductForPo, setSelectedProductForPo] = useState(null);
  const [poQty, setPoQty] = useState(50);
  const [poSuccessMessage, setPoSuccessMessage] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'LowStock') return p.stock <= p.minStock;
    if (filter === 'Critical') return p.velocityStatus === 'Critical';
    if (filter === 'FastMoving') return p.velocityStatus === 'Fast-Moving';
    return true;
  });

  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  const handleGeneratePo = (product) => {
    setSelectedProductForPo(product);
    setPoQty(Math.max(30, product.minStock * 2));
  };

  const handleConfirmPo = () => {
    if (!selectedProductForPo) return;
    const po = createPurchaseOrder(selectedProductForPo.id, poQty, selectedProductForPo.supplier);
    setPoSuccessMessage(`✅ Generated Purchase Order ${po.poNumber} for ${poQty} units! Stock updated.`);
    setSelectedProductForPo(null);
    setTimeout(() => setPoSuccessMessage(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL CATALOG ITEMS</span>
            <Package size={20} color="var(--accent-primary)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px' }}>{products.length} Products</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>Active SKUs in inventory</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>LOW STOCK ALERTS</span>
            <AlertTriangle size={20} color="var(--accent-amber)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-amber)' }}>
            {lowStockCount} Products
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Below recommended min stock</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>FASTEST MOVING SKU</span>
            <TrendingUp size={20} color="var(--accent-emerald)" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '6px' }}>Amul Toned Milk</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>Sales Velocity: 35 pkts/day</p>
        </div>

      </div>

      {/* AI Stock Run-Out Predictor Insight Banner */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(99, 102, 241, 0.08)', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '4px' }}>AI Stock Run-Out Engine</span>
              <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>
                Automated Inventory Reorder Recommendation
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Based on <strong style={{ color: 'var(--accent-emerald)' }}>Sales Velocity + Seasonality + Historical Demand</strong>, 2 products require urgent replenishment.
              </p>
            </div>
          </div>

          <button
            className="btn btn-emerald"
            onClick={() => {
              createPurchaseOrder('p2', 80, 'Adani Wilmar Dist.');
              createPurchaseOrder('p4', 100, 'Amul Dairy Federation');
              setPoSuccessMessage('✅ Generated POs for Sunflower Oil (80 units) & Milk (100 units)!');
              setTimeout(() => setPoSuccessMessage(null), 4000);
            }}
          >
            <Truck size={16} /> 1-Click Auto Reorder All Low Stock
          </button>
        </div>
      </div>

      {poSuccessMessage && (
        <div className="glass-panel" style={{ padding: '0.875rem 1.25rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: '700', fontSize: '0.85rem' }}>
          {poSuccessMessage}
        </div>
      )}

      {/* Table Filter & Search Controls */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'LowStock', 'Critical', 'FastMoving'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.45rem 0.875rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: filter === f ? 'var(--accent-primary)' : 'var(--bg-input)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {f === 'LowStock' ? '⚠️ Low Stock' : f === 'FastMoving' ? '⚡ Fast Moving' : f}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="input-field"
          placeholder="Filter inventory by name..."
          style={{ maxWidth: '280px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inventory Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.875rem 1rem' }}>PRODUCT NAME</th>
              <th style={{ padding: '0.875rem 1rem' }}>CATEGORY</th>
              <th style={{ padding: '0.875rem 1rem' }}>STOCK LEVEL</th>
              <th style={{ padding: '0.875rem 1rem' }}>REORDER MIN</th>
              <th style={{ padding: '0.875rem 1rem' }}>SALES VELOCITY</th>
              <th style={{ padding: '0.875rem 1rem' }}>PRICE / COST</th>
              <th style={{ padding: '0.875rem 1rem' }}>SUPPLIER</th>
              <th style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const daysRemaining = (p.stock / (p.salesVelocity || 1)).toFixed(1);
              const isLow = p.stock <= p.minStock;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: '700' }}>
                    {p.name}
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Barcode: {p.barcode} • Exp: {p.expiryDate}
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span className="badge badge-cyan">{p.category}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '800', color: isLow ? 'var(--accent-rose)' : 'var(--text-primary)', fontSize: '1rem' }}>
                        {p.stock} {p.unit}s
                      </span>
                      {isLow && <span className="badge badge-amber">Low</span>}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Runs out in ~{daysRemaining} days
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>
                    {p.minStock} {p.unit}s
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span className={`badge ${p.velocityStatus === 'Fast-Moving' ? 'badge-emerald' : p.velocityStatus === 'Critical' ? 'badge-rose' : 'badge-indigo'}`}>
                      {p.salesVelocity} / day
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <strong style={{ color: 'var(--accent-emerald)' }}>₹{p.price}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Cost: ₹{p.costPrice}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>
                    {p.supplier}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => handleGeneratePo(p)}
                    >
                      <PlusCircle size={14} /> Create PO
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PO Creation Modal */}
      {selectedProductForPo && (
        <div className="modal-overlay" onClick={() => setSelectedProductForPo(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
              Create Purchase Order
            </h3>

            <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
              <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>{selectedProductForPo.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Supplier: <strong>{selectedProductForPo.supplier}</strong>
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Current Stock: {selectedProductForPo.stock} | Cost Price: ₹{selectedProductForPo.costPrice}/unit
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                ORDER QUANTITY
              </label>
              <input
                type="number"
                className="input-field"
                value={poQty}
                onChange={(e) => setPoQty(Number(e.target.value))}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '800', marginBottom: '1.5rem', background: 'rgba(99,102,241,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <span>Estimated PO Cost:</span>
              <span style={{ color: 'var(--accent-emerald)' }}>₹{(poQty * selectedProductForPo.costPrice).toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedProductForPo(null)}>Cancel</button>
              <button className="btn btn-emerald" onClick={handleConfirmPo}>
                Confirm & Issue Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
