// Dynamic SVG Barcode Generator for POS Invoices & Item Labels
export function generateBarcodeSvg(barcodeString = '8901058852310') {
  const binaryString = barcodeString
    .split('')
    .map((char) => (parseInt(char, 10) % 2 === 0 ? '1101' : '1011'))
    .join('01');

  const barWidth = 2;
  const barHeight = 40;
  const svgWidth = binaryString.length * barWidth + 20;

  let rectsSvg = '';
  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] === '1') {
      rectsSvg += `<rect x="${10 + i * barWidth}" y="5" width="${barWidth}" height="${barHeight}" fill="currentColor" />`;
    }
  }

  return `
    <svg width="${svgWidth}" height="${barHeight + 20}" viewBox="0 0 ${svgWidth} ${barHeight + 20}" xmlns="http://www.w3.org/2000/svg">
      ${rectsSvg}
      <text x="${svgWidth / 2}" y="${barHeight + 16}" font-family="monospace" font-size="10" text-anchor="middle" fill="currentColor">${barcodeString}</text>
    </svg>
  `;
}
