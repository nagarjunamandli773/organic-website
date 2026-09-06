export const MOCK_ORDERS = [
  {
    id: 'KLN123456',
    date: 'May 16, 2025',
    itemsCount: 3,
    total: 1245.00,
    status: 'Pending',
    statusClass: 'status-pending',
    items: [
      { name: 'Bhringraj Hair Oil', qty: 1, price: 349.00, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&auto=format&fit=crop&q=80' },
      { name: 'Aloe Vera Face Wash', qty: 1, price: 499.00, image: '/images/hero_cosmetics.jpg' },
      { name: 'Organic Almonds', qty: 1, price: 397.00, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123455',
    date: 'May 15, 2025',
    itemsCount: 4,
    total: 2799.00,
    status: 'Processing',
    statusClass: 'status-processing',
    items: [
      { name: 'Organic A2 Cow Ghee', qty: 2, price: 899.00, image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=200&auto=format&fit=crop&q=80' },
      { name: 'Herbal Face Serum', qty: 1, price: 799.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80' },
      { name: 'Organic Basmati Rice', qty: 1, price: 202.00, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123454',
    date: 'May 14, 2025',
    itemsCount: 2,
    total: 899.00,
    status: 'Shipped',
    statusClass: 'status-shipped',
    expectedDelivery: 'May 20, 2025',
    items: [
      { name: 'Vermicompost (5kg)', qty: 2, price: 249.00, image: '/images/hero_fertilizer.jpg' },
      { name: 'Rosemary Hair Oil', qty: 1, price: 399.00, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123453',
    date: 'May 12, 2025',
    itemsCount: 5,
    total: 1599.00,
    status: 'Delivered',
    statusClass: 'status-delivered',
    deliveredOn: 'May 15, 2025',
    items: [
      { name: 'Organic Apples (1kg)', qty: 2, price: 180.00, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&auto=format&fit=crop&q=80' },
      { name: 'Organic Neem Oil', qty: 1, price: 299.00, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200&auto=format&fit=crop&q=80' },
      { name: 'Organic Honey', qty: 1, price: 250.00, image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=200&auto=format&fit=crop&q=80' },
      { name: 'Organic Spinach', qty: 2, price: 35.00, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123452',
    date: 'May 10, 2025',
    itemsCount: 3,
    total: 1149.00,
    status: 'Shipped',
    statusClass: 'status-shipped',
    expectedDelivery: 'May 19, 2025',
    items: [
      { name: 'Organic Mango (1kg)', qty: 2, price: 150.00, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&auto=format&fit=crop&q=80' },
      { name: 'Vitamin C Serum', qty: 1, price: 849.00, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123451',
    date: 'May 08, 2025',
    itemsCount: 2,
    total: 648.00,
    status: 'Cancelled',
    statusClass: 'status-cancelled',
    cancelledDate: 'May 09, 2025',
    cancelReason: 'Cancelled by customer',
    items: [
      { name: 'Organic Coconut Hair Oil', qty: 1, price: 299.00, image: '/images/hair_oils_banner.jpg' },
      { name: 'Organic Turmeric Powder', qty: 1, price: 349.00, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'KLN123450',
    date: 'May 04, 2025',
    itemsCount: 1,
    total: 499.00,
    status: 'Cancelled',
    statusClass: 'status-cancelled',
    cancelledDate: 'May 05, 2025',
    cancelReason: 'Order details modified',
    items: [
      { name: 'Cold Pressed Sesame Oil', qty: 1, price: 499.00, image: '/images/hero_fruits_veg.jpg' }
    ]
  }
];
