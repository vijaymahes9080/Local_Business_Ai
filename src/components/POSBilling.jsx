import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  UserCheck,
  CreditCard,
  QrCode,
  Banknote,
  BookOpen,
  Sparkles,
  CheckCircle,
  Printer,
  X,
  AlertTriangle,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function POSBilling() {
  const {
    products,
    customers,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    selectedCustomer,
    setSelectedCustomer,
    cartDiscount,
    setCartDiscount,
    completeTransaction,
    currentBusiness
  } = useBusiness();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePaymentModal, setActivePaymentModal] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);

  // Filter products by search and category
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal + tax - cartDiscount);

  // AI Cross-Sell Upsell Recommendation
  const getAiUpsellRecommendation = () => {
    if (cart.length === 0) return null;
    const itemNames = cart.map((i) => i.name.toLowerCase());
    
    if (itemNames.some((n) => n.includes('atta') || n.includes('flour'))) {
      const oil = products.find((p) => p.name.toLowerCase().includes('sunflower oil') || p.name.toLowerCase().includes('oil'));
      if (oil && !cart.some((c) => c.id === oil.id)) {
        return { item: oil, reason: 'Customers buying Atta bought Sunflower Oil 84% of the time.' };
      }
    }

    if (itemNames.some((n) => n.includes('redmi') || n.includes('mobile'))) {
      const charger = products.find((p) => p.name.toLowerCase().includes('silk') || p.category === 'Electronics');
      if (charger && !cart.some((c) => c.id === charger.id)) {
        return { item: charger, reason: 'Frequently bought together with mobile devices.' };
      }
    }

    return null;
  };

  const aiUpsell = getAiUpsellRecommendation();

  // Barcode Scanner Simulator
  const handleSimulateScan = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    addToCart(randomProduct);
    setSearchTerm(randomProduct.barcode);
    setTimeout(() => setSearchTerm(''), 1500);
  };

  const handleCheckout = (paymentMethod) => {
    const txn = completeTransaction(paymentMethod);
    if (txn) {
      setCompletedTxn(txn);
      setActivePaymentModal(false);
      // Trigger festive confetti
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1.25rem', height: '100%' }}>
      
      {/* LEFT: Products Register */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Search & Barcode Header */}
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search by product name or barcode..."
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn btn-emerald" onClick={handleSimulateScan} title="Simulate Barcode Scanner">
            <Barcode size={18} />
            <span>Scan Barcode</span>
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: selectedCategory === cat ? 'var(--gradient-brand)' : 'var(--bg-card)',
                color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', overflowY: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
          {filteredProducts.map((product) => {
            const inCart = cart.find((i) => i.id === product.id);
            const isLowStock = product.stock <= product.minStock;

            return (
              <div
                key={product.id}
                className="glass-card glass-card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: isLowStock ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)'
                }}
              >
                {isLowStock && (
                  <span className="badge badge-amber" style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.65rem' }}>
                    Low Stock: {product.stock}
                  </span>
                )}

                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                    {product.category}
                  </span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', marginBottom: '8px', lineHeight: '1.3' }}>
                    {product.name}
                  </h4>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                      ₹{product.price}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      / {product.unit}
                    </span>
                  </div>

                  <button
                    className={`btn ${inCart ? 'btn-emerald' : 'btn-secondary'}`}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {inCart ? (
                      <>
                        <CheckCircle size={15} /> In Cart ({inCart.quantity})
                      </>
                    ) : (
                      <>
                        <Plus size={15} /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT: Cart & Checkout Panel */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div>
          {/* Cart Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Billing Cart</h3>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={14} /> Clear
              </button>
            )}
          </div>

          {/* Customer Selection Dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
              CUSTOMER (FOR BILLING & KHATA)
            </label>
            <select
              className="input-field"
              value={selectedCustomer ? selectedCustomer.id : ''}
              onChange={(e) => {
                const found = customers.find((c) => c.id === e.target.value);
                setSelectedCustomer(found || null);
              }}
            >
              <option value="">Walk-in Customer (Guest)</option>
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name} ({cust.phone}) - {cust.segment}
                </option>
              ))}
            </select>

            {selectedCustomer && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', background: 'rgba(99, 102, 241, 0.1)', padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}>
                <span className="badge badge-indigo">
                  <Award size={12} /> {selectedCustomer.segment}
                </span>
                {selectedCustomer.khataBalance > 0 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: '700' }}>
                    Pending Credit: ₹{selectedCustomer.khataBalance}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Items List */}
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.9rem' }}>No items added to cart</p>
              <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Click items or scan barcodes to begin POS sale</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '4px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      className="btn btn-secondary btn-icon"
                      style={{ width: '26px', height: '26px', padding: 0 }}
                      onClick={() => updateCartQuantity(item.id, -1)}
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-secondary btn-icon"
                      style={{ width: '26px', height: '26px', padding: 0 }}
                      onClick={() => updateCartQuantity(item.id, 1)}
                    >
                      <Plus size={13} />
                    </button>
                    <button
                      style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', marginLeft: '4px', cursor: 'pointer' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Upsell Box */}
          {aiUpsell && (
            <div className="glass-panel" style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-emerald">
                  <Sparkles size={11} /> AI Smart Recommendation
                </span>
                <button
                  className="btn btn-emerald"
                  style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  onClick={() => addToCart(aiUpsell.item)}
                >
                  + Add ₹{aiUpsell.item.price}
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--text-primary)', fontWeight: '600' }}>
                {aiUpsell.item.name}
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {aiUpsell.reason}
              </p>
            </div>
          )}
        </div>

        {/* Calculations & Checkout Button */}
        {cart.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent-amber)', fontWeight: '600' }}>Discount</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>₹</span>
                  <input
                    type="number"
                    style={{ width: '60px', padding: '2px 6px', fontSize: '0.8rem' }}
                    className="input-field"
                    value={cartDiscount}
                    onChange={(e) => setCartDiscount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-emerald)' }}>₹{grandTotal}</span>
              </div>
            </div>

            {/* Payment Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button className="btn btn-emerald" onClick={() => handleCheckout('UPI (PhonePe/GPay)')}>
                <QrCode size={16} /> Pay via UPI
              </button>
              <button className="btn btn-primary" onClick={() => handleCheckout('Cash')}>
                <Banknote size={16} /> Cash Sale
              </button>
              <button className="btn btn-secondary" onClick={() => handleCheckout('Card Swipe')}>
                <CreditCard size={16} /> Card Swipe
              </button>
              <button className="btn btn-amber" onClick={() => handleCheckout('Khata Credit')}>
                <BookOpen size={16} /> Khata Credit
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Invoice Receipt Modal */}
      {completedTxn && (
        <div className="modal-overlay" onClick={() => setCompletedTxn(null)}>
          <div className="modal-content glass-panel printable-invoice" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '1.75rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{currentBusiness.name}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentBusiness.category} • GSTIN: 33AAAAA0000A1Z5</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentBusiness.location}</p>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-color)', borderBottom: '1px dashed var(--border-color)', padding: '0.75rem 0', margin: '0.75rem 0', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>Receipt #:</strong> {completedTxn.id}</p>
                <p><strong>Date:</strong> {completedTxn.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p><strong>Customer:</strong> {completedTxn.customerName}</p>
                <p><strong>Mode:</strong> {completedTxn.paymentMethod}</p>
              </div>
            </div>

            {/* Invoice Items */}
            <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Item</span>
                <span>Qty x Rate</span>
                <span>Total</span>
              </div>
              {completedTxn.items?.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>{item.name}</span>
                  <span>{item.quantity} x ₹{item.price}</span>
                  <span>₹{item.quantity * item.price}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', fontSize: '0.9rem', fontWeight: '800', display: 'flex', justifyContent: 'space-between' }}>
              <span>Grand Total Paid:</span>
              <span style={{ color: 'var(--accent-emerald)' }}>₹{completedTxn.totalAmount}</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button className="btn btn-emerald" onClick={() => window.print()}>
                <Printer size={16} /> Print Receipt
              </button>
              <button className="btn btn-secondary" onClick={() => setCompletedTxn(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
