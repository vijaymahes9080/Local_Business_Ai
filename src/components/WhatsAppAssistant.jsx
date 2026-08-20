import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  CheckCheck,
  PhoneCall,
  Clock,
  SendHorizontal,
  Settings2,
  ShieldCheck,
  UserCheck,
  Gift,
  BookOpen
} from 'lucide-react';

export default function WhatsAppAssistant() {
  const {
    whatsappChats,
    sendWhatsAppMessage,
    customers,
    triggerKhataReminder,
    triggerWinbackCampaign,
    currentBusiness
  } = useBusiness();

  const [activeChatId, setActiveChatId] = useState(whatsappChats[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [isAiAutoReplyEnabled, setIsAiAutoReplyEnabled] = useState(true);

  const activeChat = whatsappChats.find((c) => c.id === activeChatId) || whatsappChats[0];

  const handleSendMessage = (text, senderType = 'user') => {
    if (!text.trim() || !activeChat) return;

    sendWhatsAppMessage(activeChat.id, text, false);
    setInputText('');

    // If AI Auto Reply enabled, trigger simulated AI response
    if (isAiAutoReplyEnabled) {
      setTimeout(() => {
        let aiReplyText = `Namaste from ${currentBusiness.name}! We received your message. How can our store assist you?`;
        const lower = text.toLowerCase();

        if (lower.includes('redmi') || lower.includes('stock') || lower.includes('phone')) {
          aiReplyText = `Yes! We currently have 3 units of Redmi Note 14 5G in stock for ₹18,499. Would you like me to reserve one for you?`;
        } else if (lower.includes('khata') || lower.includes('balance') || lower.includes('due')) {
          aiReplyText = `Your current recorded Khata credit balance is ₹1,250. You can pay conveniently using GPay/PhonePe to upi://pay?pa=srilakshmi@upi`;
        } else if (lower.includes('time') || lower.includes('open')) {
          aiReplyText = `Our store ${currentBusiness.name} is open today from 8:00 AM to 10:00 PM.`;
        }

        sendWhatsAppMessage(activeChat.id, aiReplyText, true);
      }, 1000);
    }
  };

  const inactiveCustomers = customers.filter((c) => c.daysInactive >= 60);
  const khataCustomers = customers.filter((c) => c.khataBalance > 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 300px', gap: '1.25rem', height: 'calc(100vh - 160px)' }}>
      
      {/* LEFT: WhatsApp Conversations List */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>WhatsApp AI Chat</h3>
          </div>
          <span className="badge badge-emerald">Live</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
          {whatsappChats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            const isSelected = chat.id === activeChatId;

            return (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`glass-card ${isSelected ? 'glass-card-interactive' : ''}`}
                style={{
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)'
                }}
              >
                <img
                  src={chat.avatar}
                  alt={chat.customerName}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {chat.customerName}
                    </p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{lastMsg?.time}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                    {lastMsg?.sender === 'ai' ? '🤖 AI: ' : ''}{lastMsg?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MIDDLE: Active Conversation Thread */}
      {activeChat ? (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
          
          {/* Chat Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={activeChat.avatar}
                alt={activeChat.customerName}
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{activeChat.customerName}</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{activeChat.phone}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-indigo">
                <Bot size={12} /> AI Auto-Reply Enabled
              </span>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, padding: '1rem 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {activeChat.messages.map((msg, index) => {
              const isAi = msg.sender === 'ai';
              const isCustomer = msg.sender === 'customer';

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: isCustomer ? 'flex-start' : 'flex-end',
                    gap: '0.5rem'
                  }}
                >
                  {isCustomer && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={14} color="var(--text-muted)" />
                    </div>
                  )}

                  <div style={{
                    maxWidth: '70%',
                    padding: '0.75rem 1rem',
                    borderRadius: '16px',
                    borderBottomLeftRadius: isCustomer ? '4px' : '16px',
                    borderBottomRightRadius: !isCustomer ? '4px' : '16px',
                    background: isCustomer ? 'var(--bg-input)' : isAi ? 'var(--gradient-brand)' : 'var(--gradient-emerald)',
                    color: 'white',
                    fontSize: '0.85rem',
                    boxShadow: 'var(--shadow-card)'
                  }}>
                    {isAi && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', fontWeight: '700', marginBottom: '2px' }}>
                        <Sparkles size={10} /> AI STORE ASSISTANT
                      </div>
                    )}
                    <p style={{ lineHeight: '1.4' }}>{msg.text}</p>
                    <span style={{ fontSize: '0.65rem', opacity: 0.7, float: 'right', marginTop: '4px' }}>{msg.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Simulation Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto' }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
              onClick={() => handleSendMessage('Do you have Redmi Note 14 in stock?', 'customer')}
            >
              Ask Stock Query
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}
              onClick={() => handleSendMessage('What is my Khata credit balance?', 'customer')}
            >
              Ask Khata Balance
            </button>
          </div>

          {/* Text Input */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Type message to send as WhatsApp..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            />
            <button className="btn btn-emerald" onClick={() => handleSendMessage(inputText)}>
              <SendHorizontal size={16} />
            </button>
          </div>

        </div>
      ) : null}

      {/* RIGHT: Automated Triggers & Rules Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Khata Reminders Card */}
        <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <BookOpen size={16} color="var(--accent-amber)" />
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>Khata Credit Reminders</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Send automated WhatsApp UPI payment links to customers owing credit.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {khataCustomers.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700' }}>{c.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', fontWeight: '700' }}>Due: ₹{c.khataBalance}</p>
                </div>
                <button
                  className="btn btn-amber"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                  onClick={() => triggerKhataReminder(c)}
                >
                  Send UPI
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Inactive Win-back Card */}
        <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Gift size={16} color="var(--accent-primary)" />
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>Inactive Win-Back (&gt;60 Days)</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Target customers who haven't visited in 60+ days with ₹100 discount coupon.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {inactiveCustomers.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700' }}>{c.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Inactive {c.daysInactive} days</p>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                  onClick={() => triggerWinbackCampaign(c)}
                >
                  Win-Back
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
