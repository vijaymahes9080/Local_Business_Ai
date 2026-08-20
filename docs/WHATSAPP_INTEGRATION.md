# 💬 WhatsApp Cloud API Integration Guide

Local Business AI integrates with WhatsApp Business API to handle automated customer communication, payment reminders, and promotional campaigns.

## Features

- **Automated Stock Inquiries**: AI queries inventory database and answers availability for items like Redmi Note 14 5G.
- **Khata UPI Payment Links**: Automatically generates `upi://pay?pa=store@upi&am=AMOUNT` links for pending customer balances.
- **Win-back Campaigns**: Identifies customers inactive >60 days and broadcasts ₹100 discount coupons.

```json
{
  "messaging_product": "whatsapp",
  "to": "+919876543210",
  "type": "template",
  "template": {
    "name": "khata_payment_reminder",
    "language": { "code": "en" }
  }
}
```
