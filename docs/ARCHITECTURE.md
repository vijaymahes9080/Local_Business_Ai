# 🏛️ Local Business AI — System Architecture & Knowledge Graph

Local Business AI uses a centralized **Business Knowledge Graph** architecture to interconnect POS transactions, inventory velocity, customer WhatsApp interactions, and marketing campaigns.

```
                    BUSINESS AI ENGINE
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
         PRODUCTS        CUSTOMERS          SALES
            │                │                │
            ▼                ▼                ▼
        INVENTORY        BEHAVIOR          REVENUE
            │                │                │
            └────────────────┼────────────────┘
                             ▼
                      BUSINESS GRAPH
                             ▼
                    AI REASONING ENGINE
                             ▼
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
      PREDICTION          INSIGHTS           ACTIONS
```

## Core Modules

1. **Central Business Brain**: Knowledge Graph connecting `Product -> Purchase -> Customer -> Loyalty -> Reorder`.
2. **Multilingual Voice Assistant**: Speech Recognition/Synthesis for Tamil, Hindi, and English query parsing.
3. **Smart POS Register**: Real-time cart calculations, 5% GST HSN breakdown, Khata credit ledger, and printable receipts.
4. **Demand & Stock Predictor**: Predictive formula calculating stock run-out thresholds and generating POs.
5. **WhatsApp AI Assistant**: Automated customer inquiries auto-responder and Khata payment reminders.
