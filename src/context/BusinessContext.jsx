import React, { createContext, useContext, useState } from 'react';
import {
  BUSINESS_TYPES,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_TRANSACTIONS,
  WHATSAPP_CHATS,
  MARKETING_CAMPAIGNS,
  AUTONOMOUS_AGENT_LOGS
} from '../data/mockData';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  // Global States
  const [currentBusiness, setCurrentBusiness] = useState(BUSINESS_TYPES[0]);
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' | 'hi'
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [whatsappChats, setWhatsappChats] = useState(WHATSAPP_CHATS);
  const [campaigns, setCampaigns] = useState(MARKETING_CAMPAIGNS);
  const [agentLogs, setAgentLogs] = useState(AUTONOMOUS_AGENT_LOGS);
  
  // POS Cart State
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cartDiscount, setCartDiscount] = useState(0);
  
  // Voice Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [purchaseOrderModalData, setPurchaseOrderModalData] = useState(null);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prevCart; // stock limit
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setCartDiscount(0);
  };

  // Complete POS Transaction
  const completeTransaction = (paymentMethod) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const totalAmount = Math.max(0, subtotal + tax - cartDiscount);

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-US', { hour12: false }).replace(',', ''),
      customerName: selectedCustomer ? selectedCustomer.name : 'Walk-in Customer',
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount,
      paymentMethod,
      status: paymentMethod === 'Khata Credit' ? 'Credit Added' : 'Completed',
      discount: cartDiscount,
      items: cart
    };

    // Deduct stock
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const cartItem = cart.find((item) => item.id === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          return {
            ...prod,
            stock: newStock,
            velocityStatus: newStock <= prod.minStock ? 'Critical' : prod.velocityStatus
          };
        }
        return prod;
      })
    );

    // Update Customer details if selected
    if (selectedCustomer) {
      setCustomers((prevCustomers) =>
        prevCustomers.map((cust) => {
          if (cust.id === selectedCustomer.id) {
            return {
              ...cust,
              totalOrders: cust.totalOrders + 1,
              totalSpent: cust.totalSpent + totalAmount,
              khataBalance: paymentMethod === 'Khata Credit' ? cust.khataBalance + totalAmount : cust.khataBalance,
              lastPurchase: new Date().toISOString().split('T')[0],
              daysInactive: 0
            };
          }
          return cust;
        })
      );
    }

    setTransactions([newTxn, ...transactions]);
    clearCart();
    return newTxn;
  };

  // Create Purchase Order (PO)
  const createPurchaseOrder = (productId, quantity, supplierName) => {
    const targetProd = products.find((p) => p.id === productId);
    if (!targetProd) return;

    const poItem = {
      poNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      productName: targetProd.name,
      supplier: supplierName || targetProd.supplier,
      quantity,
      estimatedCost: targetProd.costPrice * quantity,
      date: new Date().toISOString().split('T')[0],
      status: 'Ordered'
    };

    // Add to stock as pending or update stock directly for simulated demo
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + quantity, velocityStatus: 'In-Stock' } : p))
    );

    // Add log to agent
    const newLog = {
      id: `agent-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'Purchase Order Executed',
      description: `Generated PO ${poItem.poNumber} for ${quantity}x ${targetProd.name}`,
      confidence: '100%',
      actionRequired: `Sent to ${poItem.supplier}`,
      status: 'Executed'
    };
    setAgentLogs([newLog, ...agentLogs]);

    return poItem;
  };

  // WhatsApp Operations
  const sendWhatsAppMessage = (chatId, text, isAi = false) => {
    setWhatsappChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          const newMsg = {
            sender: isAi ? 'ai' : 'user',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...chat,
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      })
    );
  };

  const triggerKhataReminder = (customer) => {
    const targetChat = whatsappChats.find((c) => c.customerName === customer.name);
    const msgText = `Namaste ${customer.name} ji! Friendly reminder from ${currentBusiness.name}: Your pending Khata credit balance is ₹${customer.khataBalance}. Pay instantly via UPI: upi://pay?pa=srilakshmi@upi&am=${customer.khataBalance}`;
    
    if (targetChat) {
      sendWhatsAppMessage(targetChat.id, msgText, true);
    } else {
      const newChat = {
        id: `chat-${Date.now()}`,
        customerName: customer.name,
        phone: customer.phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        unreadCount: 0,
        messages: [{ sender: 'ai', text: msgText, time: 'Just now' }]
      };
      setWhatsappChats([newChat, ...whatsappChats]);
    }
  };

  // Trigger Win-back Campaign for Inactive Customer
  const triggerWinbackCampaign = (customer) => {
    const msgText = `Namaste ${customer.name} ji! We miss you at ${currentBusiness.name}. Use code BACK100 for ₹100 OFF on your next visit!`;
    const targetChat = whatsappChats.find((c) => c.customerName === customer.name);
    
    if (targetChat) {
      sendWhatsAppMessage(targetChat.id, msgText, true);
    } else {
      const newChat = {
        id: `chat-${Date.now()}`,
        customerName: customer.name,
        phone: customer.phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        unreadCount: 0,
        messages: [{ sender: 'ai', text: msgText, time: 'Just now' }]
      };
      setWhatsappChats([newChat, ...whatsappChats]);
    }
  };

  // Autonomous Agent Action Approval
  const approveAgentAction = (logId) => {
    setAgentLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          return { ...log, status: 'Executed' };
        }
        return log;
      })
    );
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <BusinessContext.Provider
      value={{
        currentBusiness,
        setCurrentBusiness,
        language,
        setLanguage,
        theme,
        toggleTheme,
        products,
        setProducts,
        customers,
        transactions,
        whatsappChats,
        campaigns,
        setCampaigns,
        agentLogs,
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
        createPurchaseOrder,
        sendWhatsAppMessage,
        triggerKhataReminder,
        triggerWinbackCampaign,
        approveAgentAction,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        purchaseOrderModalData,
        setPurchaseOrderModalData
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
