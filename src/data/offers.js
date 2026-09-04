export const OFFERS = [
  {
    id: 'off-1',
    title: '₹200 OFF',
    subtitle: 'On Orders Above ₹1499',
    code: 'KLAN200',
    discountAmount: 200,
    minOrder: 1499,
    discountType: 'fixed',
    icon: 'Percent'
  },
  {
    id: 'off-2',
    title: '₹500 OFF',
    subtitle: 'On Orders Above ₹2999',
    code: 'KLAN500',
    discountAmount: 500,
    minOrder: 2999,
    discountType: 'fixed',
    icon: 'Tag'
  },
  {
    id: 'off-3',
    title: '20% OFF',
    subtitle: 'On Organic Cosmetics',
    code: 'COS20',
    discountPercent: 20,
    minOrder: 499,
    discountType: 'percent',
    category: 'Cosmetics',
    icon: 'Sparkles'
  },
  {
    id: 'off-4',
    title: 'Free Shipping',
    subtitle: 'On Orders Above ₹499',
    code: 'FREESHIP',
    discountAmount: 49,
    minOrder: 499,
    discountType: 'shipping',
    icon: 'Truck'
  }
];
