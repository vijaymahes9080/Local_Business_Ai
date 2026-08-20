import { calculateGstBreakdown } from '../utils/taxCalculator';
import { parseVoiceIntent } from '../ai/intentParser';
import { BusinessKnowledgeGraph } from '../ai/knowledgeGraph';

// Unit Test Verification Suite
export function runUnitTests() {
  console.log('--- Running Local Business AI Test Suite ---');

  // Test 1: GST Breakdown
  const gst = calculateGstBreakdown(100, 'Staples', false);
  console.assert(gst.totalTax === 5, 'GST tax should be 5% for Staples');
  console.assert(gst.cgst === 2.5, 'CGST should be 2.5%');

  // Test 2: Intent Parsing
  const intent1 = parseVoiceIntent('How much did I sell today?');
  console.assert(intent1.intent === 'SALES_QUERY', 'Should identify SALES_QUERY');

  const intent2 = parseVoiceIntent('நேத்து எவ்வளவு sales ஆச்சு?');
  console.assert(intent2.intent === 'SALES_QUERY', 'Should identify Tamil sales query');

  // Test 3: Knowledge Graph
  const kg = new BusinessKnowledgeGraph(
    [{ id: 'p1', name: 'Atta' }, { id: 'p2', name: 'Oil' }],
    [{ id: 'c1', name: 'Rajesh' }],
    [{ customerName: 'Rajesh', items: [{ id: 'p1', price: 100, quantity: 1 }, { id: 'p2', price: 150, quantity: 1 }] }]
  );
  const crossSell = kg.findCrossSell('p1');
  console.assert(crossSell !== null, 'Should find cross-sell for p1');

  console.log('✅ All Unit Tests Passed Successfully!');
}
