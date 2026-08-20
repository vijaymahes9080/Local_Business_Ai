// Multilingual Intent Classification Parser for Local Business AI
export function parseVoiceIntent(queryText = '', language = 'en') {
  const q = queryText.toLowerCase();

  if (q.includes('sell') || q.includes('sales') || q.includes('நேத்து') || q.includes('விற்பனை') || q.includes('बिक्री')) {
    return { intent: 'SALES_QUERY', entity: 'TODAY', confidence: 0.96 };
  }

  if (q.includes('stock') || q.includes('run out') || q.includes('ஸ்டாக்') || q.includes('सामान खत्म')) {
    return { intent: 'INVENTORY_QUERY', entity: 'LOW_STOCK', confidence: 0.94 };
  }

  if (q.includes('whatsapp') || q.includes('inactive') || q.includes('60 days') || q.includes('வாடிக்கையாளர்')) {
    return { intent: 'WHATSAPP_CAMPAIGN', entity: 'INACTIVE_CUSTOMERS', confidence: 0.92 };
  }

  if (q.includes('purchase order') || q.includes('po') || q.includes('ஆர்டர்')) {
    return { intent: 'CREATE_PO', entity: 'CRITICAL_SKU', confidence: 0.95 };
  }

  return { intent: 'GENERAL_QUERY', entity: null, confidence: 0.75 };
}
