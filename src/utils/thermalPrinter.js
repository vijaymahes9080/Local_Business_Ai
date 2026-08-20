// ESC/POS Thermal Receipt Printer Formatting Utility (58mm / 80mm roll)
export function formatThermalReceipt(transaction, storeInfo) {
  const lineWidth = 32;
  const separator = '-'.repeat(lineWidth);
  const doubleSeparator = '='.repeat(lineWidth);

  const padRight = (str, len) => (str + ' '.repeat(len)).slice(0, len);
  const padLeft = (str, len) => (' '.repeat(len) + str).slice(-len);

  let text = '';
  text += `${storeInfo.name.toUpperCase()}\n`;
  text += `${storeInfo.category}\n`;
  text += `${storeInfo.location}\n`;
  text += `${doubleSeparator}\n`;
  text += `Receipt #: ${transaction.id}\n`;
  text += `Date: ${transaction.date}\n`;
  text += `Mode: ${transaction.paymentMethod}\n`;
  text += `${separator}\n`;
  text += `Item            Qty   Price\n`;
  text += `${separator}\n`;

  transaction.items?.forEach((item) => {
    const nameStr = padRight(item.name.slice(0, 15), 15);
    const qtyStr = padLeft(String(item.quantity), 5);
    const priceStr = padLeft(`Rs.${item.quantity * item.price}`, 10);
    text += `${nameStr}${qtyStr}${priceStr}\n`;
  });

  text += `${separator}\n`;
  text += padLeft(`TOTAL: Rs.${transaction.totalAmount}`, lineWidth) + '\n';
  text += `${doubleSeparator}\n`;
  text += `  Thank You! Visit Again  \n\n\n`;

  return text;
}
