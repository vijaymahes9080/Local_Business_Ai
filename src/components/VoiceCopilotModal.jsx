import React, { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Mic,
  X,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Package,
  MessageSquare
} from 'lucide-react';

export default function VoiceCopilotModal() {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    language,
    products,
    transactions,
    customers,
    createPurchaseOrder,
    triggerWinbackCampaign,
    currentBusiness
  } = useBusiness();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  useEffect(() => {
    if (isVoiceModalOpen) {
      setTranscript('');
      setAiResponse({
        type: 'greeting',
        text: getGreetingText(language, currentBusiness.name)
      });
    }
  }, [isVoiceModalOpen, language, currentBusiness]);

  if (!isVoiceModalOpen) return null;

  function getGreetingText(lang, storeName) {
    if (lang === 'ta') {
      return `வணக்கம்! ${storeName} AI Co-Pilot தயாராக உள்ளது. இன்றைய விற்பனை, ஸ்டாக் விபரம் அல்லது வாடிக்கையாளர் பற்றி கேட்கலாம்.`;
    }
    if (lang === 'hi') {
      return `नमस्ते! ${storeName} AI Co-Pilot तैयार है। आप आज की बिक्री, स्टॉक या ग्राहक मैसेज के बारे में पूछ सकते हैं।`;
    }
    return `Hello! I am your AI Business Co-Pilot for ${storeName}. Ask me anything about your billing, inventory forecast, or customer messaging!`;
  }

  // Toggle Web Speech API
  const handleToggleListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          processQuery(text);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        setIsListening(false);
      }
    } else {
      // Fallback if Speech API not supported in browser
      setIsListening(!isListening);
      if (!isListening) {
        setTimeout(() => {
          const sampleQuery = language === 'ta' ? 'நேத்து எவ்வளவு sales ஆச்சு?' : 'How much did I sell today?';
          setTranscript(sampleQuery);
          processQuery(sampleQuery);
          setIsListening(false);
        }, 2000);
      }
    }
  };

  const processQuery = (queryText) => {
    const q = queryText.toLowerCase();

    // Text synthesis response helper
    const speakText = (textToSpeak) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    };

    // Query 1: Sales today
    if (q.includes('sell today') || q.includes('sales today') || q.includes('நேத்து') || q.includes('விற்பனை') || q.includes('आज कितनी बिक्री')) {
      const todayTotal = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
      const text = language === 'ta'
        ? `இன்றைய மொத்த விற்பனை ₹${todayTotal.toLocaleString()} ஆகும். மொத்தம் ${transactions.length} பரிவர்த்தனைகள் நிறைவடைந்துள்ளன.`
        : language === 'hi'
        ? `आज की कुल बिक्री ₹${todayTotal.toLocaleString()} है। कुल ${transactions.length} लेन-देन दर्ज किए गए हैं।`
        : `Today's total recorded sales are ₹${todayTotal.toLocaleString()} across ${transactions.length} successful transactions.`;

      setAiResponse({
        type: 'sales',
        text,
        metrics: {
          total: `₹${todayTotal.toLocaleString()}`,
          orders: transactions.length,
          avgOrder: `₹${Math.round(todayTotal / (transactions.length || 1))}`
        }
      });
      speakText(text);
      return;
    }

    // Query 2: Products running out / low stock
    if (q.includes('run out') || q.includes('stock') || q.includes('ஸ்டாக்') || q.includes('सामान खत्म')) {
      const lowStockItems = products.filter((p) => p.stock <= p.minStock);
      const names = lowStockItems.map((p) => p.name).join(', ');

      const text = language === 'ta'
        ? `${lowStockItems.length} பொருட்கள் குறைந்த ஸ்டாக்கில் உள்ளன: ${names}. உடனடியாக அமுல் பாக்கெட் மற்றும் சன் பிளவர் ஆயில் ஆர்டர் செய்ய பரிந்துரைக்கப்படுகிறது.`
        : language === 'hi'
        ? `${lowStockItems.length} उत्पाद कम स्टॉक सीमा पर हैं: ${names}। तत्काल रीऑर्डर करने की सलाह दी जाती है।`
        : `${lowStockItems.length} products are below critical stock thresholds: ${names}. Highest priority is Fortune Sunflower Oil and Milk 500ml.`;

      setAiResponse({
        type: 'inventory',
        text,
        items: lowStockItems,
        action: 'create_po'
      });
      speakText(text);
      return;
    }

    // Query 3: Send WhatsApp to inactive customers (60+ days)
    if (q.includes('whatsapp') || q.includes('60 days') || q.includes('inactive') || q.includes('வாடிக்கையாளர்')) {
      const inactiveCust = customers.filter((c) => c.daysInactive >= 60);

      const text = language === 'ta'
        ? `${inactiveCust.length} வாடிக்கையாளர்கள் 60 நாட்களுக்கு மேல் வரவில்லை. அவர்களுக்க சிறப்பு சலுகை வாட்ஸ்அப் மெசேஜ் அனுப்ப தயாராக உள்ளது.`
        : language === 'hi'
        ? `${inactiveCust.length} ग्राहक पिछले 60 दिनों से निष्क्रिय हैं। व्हाट्सएप विन-बैक ऑफर तैयार किया गया है।`
        : `Found ${inactiveCust.length} customers inactive for over 60 days. I have prepared a personalized 10% discount campaign on WhatsApp.`;

      setAiResponse({
        type: 'whatsapp_campaign',
        text,
        customers: inactiveCust,
        action: 'send_winback'
      });
      speakText(text);
      return;
    }

    // Query 4: Create Purchase Order
    if (q.includes('purchase order') || q.includes('order') || q.includes('ஆர்டர்')) {
      const criticalItem = products.find((p) => p.stock <= p.minStock) || products[0];
      const text = `Created draft Purchase Order for 80 units of ${criticalItem.name} from ${criticalItem.supplier} estimated at ₹${(criticalItem.costPrice * 80).toLocaleString()}.`;

      setAiResponse({
        type: 'po_created',
        text,
        item: criticalItem,
        qty: 80,
        supplier: criticalItem.supplier
      });
      speakText(text);
      return;
    }

    // Default fallback intelligence
    const text = `I analyzed your query "${queryText}". Based on your recent store activity, revenue is trending 12% higher this week, with groceries leading sales. How else can I assist?`;
    setAiResponse({ type: 'general', text });
    speakText(text);
  };

  const handlePresetClick = (presetText) => {
    setTranscript(presetText);
    processQuery(presetText);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsVoiceModalOpen(false)}>
      <div
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '1.75rem', position: 'relative', border: '1px solid var(--border-highlight)' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVoiceModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: 'var(--text-secondary)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>AI Business Assistant</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Voice & Text Intelligence • Powered by Business Knowledge Graph
            </p>
          </div>
        </div>

        {/* Mic Visualizer Container */}
        <div className="glass-card" style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'var(--gradient-dark)',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          
          {/* Waveform when listening / speaking */}
          <div style={{ height: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {(isListening || isSpeaking) ? (
              <>
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
                <div className="wave-bar" />
              </>
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Tap the microphone or select a prompt below
              </span>
            )}
          </div>

          {/* Big Mic Button */}
          <button
            onClick={handleToggleListening}
            className={`btn ${isListening ? 'btn-amber animate-pulse-glow' : 'btn-primary'}`}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isListening ? '0 0 30px rgba(245, 158, 11, 0.7)' : 'var(--shadow-glow)'
            }}
          >
            <Mic size={32} />
          </button>

          <p style={{ fontSize: '0.8rem', fontWeight: '600', color: isListening ? 'var(--accent-amber)' : 'var(--text-secondary)' }}>
            {isListening ? 'Listening to your speech...' : 'Press Mic to Speak'}
          </p>
        </div>

        {/* Presets Grid */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.5rem' }}>
            Suggested Voice Queries
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem' }}>
            
            <button
              className="glass-card glass-card-interactive"
              onClick={() => handlePresetClick(language === 'ta' ? 'நேத்து எவ்வளவு sales ஆச்சு?' : 'How much did I sell today?')}
              style={{ textAlign: 'left', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ShoppingBag size={15} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                {language === 'ta' ? 'நேத்து எவ்வளவு sales ஆச்சு?' : 'How much did I sell today?'}
              </span>
            </button>

            <button
              className="glass-card glass-card-interactive"
              onClick={() => handlePresetClick(language === 'ta' ? 'எந்த பொருள் Stock கம்மியா இருக்கு?' : 'Which products will run out next week?')}
              style={{ textAlign: 'left', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Package size={15} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                {language === 'ta' ? 'எந்த பொருள் Stock கம்மியா இருக்கு?' : 'Which items run out next week?'}
              </span>
            </button>

            <button
              className="glass-card glass-card-interactive"
              onClick={() => handlePresetClick('Send a WhatsApp message to customers who haven\'t purchased in 60 days.')}
              style={{ textAlign: 'left', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MessageSquare size={15} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                WhatsApp inactive customers (&gt;60 days)
              </span>
            </button>

            <button
              className="glass-card glass-card-interactive"
              onClick={() => handlePresetClick('Create tomorrow\'s purchase order.')}
              style={{ textAlign: 'left', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RefreshCw size={15} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                Create purchase order automatically
              </span>
            </button>

          </div>
        </div>

        {/* AI Answer Card Output */}
        {aiResponse && (
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)', background: 'rgba(99, 102, 241, 0.08)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">
                <Sparkles size={12} /> AI Reasoning Response
              </span>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const u = new SpeechSynthesisUtterance(aiResponse.text);
                    window.speechSynthesis.speak(u);
                  }
                }}
              >
                <Volume2 size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', fontWeight: '500' }}>
              {aiResponse.text}
            </p>

            {/* Response Metrics / Quick Action Trigger */}
            {aiResponse.type === 'sales' && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.875rem' }}>
                <div className="glass-card" style={{ padding: '0.5rem 0.875rem' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Revenue</p>
                  <p style={{ fontWeight: '800', color: 'var(--accent-emerald)', fontSize: '1rem' }}>{aiResponse.metrics.total}</p>
                </div>
                <div className="glass-card" style={{ padding: '0.5rem 0.875rem' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Orders</p>
                  <p style={{ fontWeight: '800', fontSize: '1rem' }}>{aiResponse.metrics.orders}</p>
                </div>
                <div className="glass-card" style={{ padding: '0.5rem 0.875rem' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg Order Value</p>
                  <p style={{ fontWeight: '800', color: 'var(--accent-cyan)', fontSize: '1rem' }}>{aiResponse.metrics.avgOrder}</p>
                </div>
              </div>
            )}

            {aiResponse.action === 'create_po' && (
              <div style={{ marginTop: '0.875rem' }}>
                <button
                  className="btn btn-emerald"
                  onClick={() => {
                    aiResponse.items.forEach((item) => {
                      createPurchaseOrder(item.id, 50, item.supplier);
                    });
                    setAiResponse({ type: 'done', text: '✅ Generated Purchase Orders for low stock products!' });
                  }}
                >
                  <CheckCircle2 size={16} /> Approve & Generate Purchase Orders
                </button>
              </div>
            )}

            {aiResponse.action === 'send_winback' && (
              <div style={{ marginTop: '0.875rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    aiResponse.customers.forEach((c) => triggerWinbackCampaign(c));
                    setAiResponse({ type: 'done', text: '✅ Sent WhatsApp Win-Back messages to all inactive customers!' });
                  }}
                >
                  <Send size={15} /> Launch WhatsApp Campaign Now
                </button>
              </div>
            )}

            {aiResponse.type === 'po_created' && (
              <div style={{ marginTop: '0.875rem' }}>
                <button
                  className="btn btn-emerald"
                  onClick={() => {
                    createPurchaseOrder(aiResponse.item.id, aiResponse.qty, aiResponse.supplier);
                    setAiResponse({ type: 'done', text: `✅ Purchase Order PO-${Math.floor(10000 + Math.random() * 90000)} executed!` });
                  }}
                >
                  Confirm Purchase Order Execution
                </button>
              </div>
            )}

          </div>
        )}

        {/* Text Input Row */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder={language === 'ta' ? 'இங்கே கேட்கவும்...' : language === 'hi' ? 'यहाँ पूछें...' : 'Type your business question here...'}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && transcript.trim()) {
                processQuery(transcript);
              }
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => transcript.trim() && processQuery(transcript)}
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
