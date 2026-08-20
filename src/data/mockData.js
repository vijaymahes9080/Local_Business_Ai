export const BUSINESS_TYPES = [
  { id: 'grocery', name: 'Sri Lakshmi Supermarket', category: 'Grocery & Staples', location: 'Chennai, TN' },
  { id: 'pharmacy', name: 'Arogya Care Pharmacy', category: 'Healthcare & Pharma', location: 'Bengaluru, KA' },
  { id: 'electronics', name: 'TechZone Digital Shop', category: 'Electronics & Mobiles', location: 'Coimbatore, TN' },
  { id: 'fashion', name: 'StyleCraft Boutique', category: 'Apparel & Fashion', location: 'Hyderabad, TS' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Aashirvaad Whole Wheat Atta 5kg',
    category: 'Staples',
    barcode: '8901058852310',
    stock: 14,
    minStock: 25,
    price: 320,
    costPrice: 275,
    supplier: 'ITC Wholesale Ltd',
    expiryDate: '2026-11-30',
    salesVelocity: 6.5, // units/day
    velocityStatus: 'Fast-Moving',
    unit: 'bag'
  },
  {
    id: 'p2',
    name: 'Fortune Sunlite Sunflower Oil 1L',
    category: 'Staples',
    barcode: '8906007280145',
    stock: 6,
    minStock: 40,
    price: 155,
    costPrice: 130,
    supplier: 'Adani Wilmar Dist.',
    expiryDate: '2026-09-15',
    salesVelocity: 12.0,
    velocityStatus: 'Critical',
    unit: 'pouch'
  },
  {
    id: 'p3',
    name: 'Redmi Note 14 5G (8GB/256GB Black)',
    category: 'Mobiles',
    barcode: '8904253109842',
    stock: 3,
    minStock: 5,
    price: 18499,
    costPrice: 16200,
    supplier: 'Xiaomi Direct India',
    expiryDate: 'N/A',
    salesVelocity: 1.2,
    velocityStatus: 'Fast-Moving',
    unit: 'piece'
  },
  {
    id: 'p4',
    name: 'Amul Taaza Toned Milk 500ml',
    category: 'Dairy',
    barcode: '8901262010052',
    stock: 8,
    minStock: 50,
    price: 27,
    costPrice: 23,
    supplier: 'Amul Dairy Federation',
    expiryDate: '2026-08-22',
    salesVelocity: 35.0,
    velocityStatus: 'Critical',
    unit: 'packet'
  },
  {
    id: 'p5',
    name: 'Tata Salt Vacuum Evaporated 1kg',
    category: 'Staples',
    barcode: '8901058000018',
    stock: 45,
    minStock: 20,
    price: 28,
    costPrice: 22,
    supplier: 'Tata Consumer Products',
    expiryDate: '2027-05-10',
    salesVelocity: 8.2,
    velocityStatus: 'Normal',
    unit: 'packet'
  },
  {
    id: 'p6',
    name: 'Cadbury Dairy Milk Silk 150g',
    category: 'Confectionery',
    barcode: '8901233020011',
    stock: 28,
    minStock: 15,
    price: 185,
    costPrice: 150,
    supplier: 'Mondelez India',
    expiryDate: '2026-12-01',
    salesVelocity: 4.8,
    velocityStatus: 'Normal',
    unit: 'bar'
  },
  {
    id: 'p7',
    name: 'Paracetamol 650mg (Strip of 15)',
    category: 'Healthcare',
    barcode: '8901112009812',
    stock: 92,
    minStock: 30,
    price: 32,
    costPrice: 21,
    supplier: 'Micro Labs Ltd',
    expiryDate: '2027-08-15',
    salesVelocity: 14.5,
    velocityStatus: 'Fast-Moving',
    unit: 'strip'
  },
  {
    id: 'p8',
    name: 'Surf Excel Easy Wash Detergent 1kg',
    category: 'Household',
    barcode: '8901030678123',
    stock: 18,
    minStock: 20,
    price: 140,
    costPrice: 118,
    supplier: 'Hindustan Unilever Ltd',
    expiryDate: '2028-01-01',
    salesVelocity: 3.2,
    velocityStatus: 'Normal',
    unit: 'pack'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'c1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    totalOrders: 28,
    totalSpent: 14250,
    khataBalance: 1250, // Credit balance owed
    segment: 'VIP Customer',
    lastPurchase: '2026-08-18',
    daysInactive: 2,
    favoriteItem: 'Aashirvaad Atta'
  },
  {
    id: 'c2',
    name: 'Priya Sundaram',
    phone: '+91 94432 10987',
    totalOrders: 14,
    totalSpent: 8400,
    khataBalance: 0,
    segment: 'Regular',
    lastPurchase: '2026-08-10',
    daysInactive: 10,
    favoriteItem: 'Cadbury Silk'
  },
  {
    id: 'c3',
    name: 'Karthik Venkat',
    phone: '+91 97890 12345',
    totalOrders: 6,
    totalSpent: 19500,
    khataBalance: 3400,
    segment: 'Price-Sensitive',
    lastPurchase: '2026-06-15',
    daysInactive: 66, // Inactive > 60 days trigger
    favoriteItem: 'Redmi Note 14 5G'
  },
  {
    id: 'c4',
    name: 'Anitha Ramesh',
    phone: '+91 91234 56789',
    totalOrders: 42,
    totalSpent: 26800,
    khataBalance: 0,
    segment: 'VIP Customer',
    lastPurchase: '2026-08-19',
    daysInactive: 1,
    favoriteItem: 'Fortune Sunflower Oil'
  },
  {
    id: 'c5',
    name: 'Suresh Babu',
    phone: '+91 99401 88231',
    totalOrders: 2,
    totalSpent: 640,
    khataBalance: 450,
    segment: 'Inactive Customer',
    lastPurchase: '2026-05-20',
    daysInactive: 92,
    favoriteItem: 'Surf Excel Detergent'
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-9021',
    date: '2026-08-20 18:45',
    customerName: 'Anitha Ramesh',
    itemsCount: 4,
    totalAmount: 684,
    paymentMethod: 'UPI (PhonePe)',
    status: 'Completed',
    discount: 20
  },
  {
    id: 'TXN-9020',
    date: '2026-08-20 16:12',
    customerName: 'Rajesh Kumar',
    itemsCount: 2,
    totalAmount: 475,
    paymentMethod: 'Khata Credit',
    status: 'Credit Added',
    discount: 0
  },
  {
    id: 'TXN-9019',
    date: '2026-08-20 14:05',
    customerName: 'Walk-in Customer',
    itemsCount: 1,
    totalAmount: 18499,
    paymentMethod: 'Card Swipe',
    status: 'Completed',
    discount: 500
  },
  {
    id: 'TXN-9018',
    date: '2026-08-20 11:30',
    customerName: 'Priya Sundaram',
    itemsCount: 3,
    totalAmount: 397,
    paymentMethod: 'Cash',
    status: 'Completed',
    discount: 0
  }
];

export const WHATSAPP_CHATS = [
  {
    id: 'chat-1',
    customerName: 'Karthik Venkat',
    phone: '+91 97890 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    unreadCount: 1,
    messages: [
      { sender: 'customer', text: 'Hi, do you have Redmi Note 14 in stock?', time: '10:14 AM' },
      { sender: 'ai', text: 'Yes, Karthik! We currently have 3 units of Redmi Note 14 5G (Black) available at ₹18,499. Would you like me to reserve one for you?', time: '10:15 AM' },
      { sender: 'customer', text: 'Great! Can you keep one for me until evening?', time: '10:18 AM' }
    ]
  },
  {
    id: 'chat-2',
    customerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    unreadCount: 0,
    messages: [
      { sender: 'ai', text: 'Namaste Rajesh ji! Reminder: Your monthly Khata balance is ₹1,250. Click here to pay via UPI: upi://pay?pa=srilakshmi@upi&am=1250', time: 'Yesterday' },
      { sender: 'customer', text: 'Thanks for reminder. Will clear tonight via Google Pay.', time: 'Yesterday' }
    ]
  },
  {
    id: 'chat-3',
    customerName: 'Suresh Babu',
    phone: '+91 99401 88231',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    unreadCount: 0,
    messages: [
      { sender: 'ai', text: 'Hello Suresh ji! We missed you over the last 90 days. Here is an exclusive 10% discount coupon: WELCOME10 for your next visit!', time: '3 days ago' }
    ]
  }
];

export const MARKETING_CAMPAIGNS = [
  {
    id: 'camp-1',
    title: 'Ganesh Chaturthi Festive Grocery Blast',
    segment: 'All Customers (1,245)',
    channel: 'WhatsApp & SMS',
    status: 'Active',
    sentCount: 1245,
    conversions: 184,
    revenueDriven: 54200,
    content: '🎉 Festive Special at Sri Lakshmi Supermarket! Get 15% OFF on all Cooking Oil & Staples. Visit today or order on WhatsApp!'
  },
  {
    id: 'camp-2',
    title: 'Inactive Customer Win-Back (60+ Days)',
    segment: 'Inactive Customers (180)',
    channel: 'WhatsApp Broadcast',
    status: 'Scheduled',
    sentCount: 180,
    conversions: 29,
    revenueDriven: 18900,
    content: 'We miss you at Sri Lakshmi Supermarket! Enjoy ₹100 OFF on your next purchase above ₹500. Code: BACK100'
  }
];

export const AUTONOMOUS_AGENT_LOGS = [
  {
    id: 'agent-101',
    timestamp: '18:30:12',
    type: 'Stock Run-out Detection',
    description: 'Milk 500ml stock will deplete in 4 hours based on sales velocity.',
    confidence: '98%',
    actionRequired: 'Create Purchase Order for 80 units from Amul Dairy Federation',
    status: 'Pending Approval'
  },
  {
    id: 'agent-100',
    timestamp: '15:10:44',
    type: 'Customer Inactivity Alert',
    description: 'Found 42 VIP customers who have not visited in 30 days.',
    confidence: '94%',
    actionRequired: 'Send personalized WhatsApp discount message',
    status: 'Executed'
  },
  {
    id: 'agent-99',
    timestamp: '11:00:00',
    type: 'Price Anomaly Check',
    description: 'Competitor prices on Atta 5kg dropped by 4%. Margin intact.',
    confidence: '91%',
    actionRequired: 'Maintain price; bundle with 200g Sugar free packet',
    status: 'Executed'
  }
];

export const HOURLY_SALES_DATA = [
  { hour: '9 AM', sales: 4200 },
  { hour: '11 AM', sales: 8900 },
  { hour: '1 PM', sales: 12400 },
  { hour: '3 PM', sales: 9800 },
  { hour: '5 PM', sales: 18600 },
  { hour: '7 PM', sales: 24500 },
  { hour: '9 PM', sales: 14200 }
];

export const FORECAST_DATA = [
  { day: 'Mon', actual: 32000, forecast: 31500, lowerBound: 29000, upperBound: 34000 },
  { day: 'Tue', actual: 34500, forecast: 34000, lowerBound: 31000, upperBound: 37000 },
  { day: 'Wed', actual: 31200, forecast: 32800, lowerBound: 29500, upperBound: 35000 },
  { day: 'Thu', actual: 38450, forecast: 37500, lowerBound: 34000, upperBound: 40500 },
  { day: 'Fri (Pred)', actual: null, forecast: 42000, lowerBound: 38000, upperBound: 46000 },
  { day: 'Sat (Pred)', actual: null, forecast: 56500, lowerBound: 50000, upperBound: 63000 },
  { day: 'Sun (Pred)', actual: null, forecast: 61000, lowerBound: 54000, upperBound: 68000 }
];
