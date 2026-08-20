// Central Business Knowledge Graph Reasoning Engine
export class BusinessKnowledgeGraph {
  constructor(products = [], customers = [], transactions = []) {
    this.nodes = new Map();
    this.edges = [];
    this.buildGraph(products, customers, transactions);
  }

  buildGraph(products, customers, transactions) {
    // Add Product Nodes
    products.forEach((p) => {
      this.nodes.set(`product:${p.id}`, { type: 'Product', data: p });
    });

    // Add Customer Nodes
    customers.forEach((c) => {
      this.nodes.set(`customer:${c.id}`, { type: 'Customer', data: c });
    });

    // Add Transaction Edges & Relationships
    transactions.forEach((t) => {
      const custNode = Array.from(this.nodes.values()).find(
        (n) => n.type === 'Customer' && n.data.name === t.customerName
      );
      if (custNode && t.items) {
        t.items.forEach((item) => {
          this.edges.push({
            from: `customer:${custNode.data.id}`,
            to: `product:${item.id}`,
            relation: 'PURCHASED',
            amount: item.quantity * item.price,
            date: t.date
          });
        });
      }
    });
  }

  // Graph Traversal: Find cross-sell recommendations
  findCrossSell(productId) {
    const purchasingCustomers = this.edges
      .filter((e) => e.to === `product:${productId}`)
      .map((e) => e.from);

    const relatedProductsCount = {};
    this.edges.forEach((e) => {
      if (purchasingCustomers.includes(e.from) && e.to !== `product:${productId}`) {
        relatedProductsCount[e.to] = (relatedProductsCount[e.to] || 0) + 1;
      }
    });

    const sorted = Object.entries(relatedProductsCount).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      const topTargetKey = sorted[0][0];
      return this.nodes.get(topTargetKey)?.data || null;
    }
    return null;
  }
}
