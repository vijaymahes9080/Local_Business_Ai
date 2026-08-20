// Indian GST Compliance & Tax Calculation Engine
export const HSN_SLABS = {
  Staples: { hsn: '1006', slabPercent: 5 },
  Dairy: { hsn: '0401', slabPercent: 5 },
  Mobiles: { hsn: '8517', slabPercent: 18 },
  Confectionery: { hsn: '1806', slabPercent: 18 },
  Healthcare: { hsn: '3004', slabPercent: 12 },
  Household: { hsn: '3402', slabPercent: 18 }
};

export function calculateGstBreakdown(amount, category = 'Staples', isInterstate = false) {
  const slab = HSN_SLABS[category] || { hsn: '9983', slabPercent: 5 };
  const rate = slab.slabPercent;
  
  const taxAmount = Math.round((amount * rate) / 100);
  
  if (isInterstate) {
    return {
      hsnCode: slab.hsn,
      ratePercent: rate,
      cgst: 0,
      sgst: 0,
      igst: taxAmount,
      totalTax: taxAmount,
      totalWithTax: amount + taxAmount
    };
  }

  const halfTax = taxAmount / 2;
  return {
    hsnCode: slab.hsn,
    ratePercent: rate,
    cgst: halfTax,
    sgst: halfTax,
    igst: 0,
    totalTax: taxAmount,
    totalWithTax: amount + taxAmount
  };
}
