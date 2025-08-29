import axios from 'axios';

// Mock data generator for demonstration
const generateMockData = (filters, businessType) => {
  // This would be replaced with actual API calls in a real application
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const categories = {
    general: ['Electronics', 'Clothing', 'Home Goods'],
    supermarket: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen Foods'],
    pharmacy: ['Prescription Drugs', 'OTC Medication', 'Personal Care', 'Wellness'],
    liquor: ['Beer', 'Wine', 'Spirits', 'Mixers'],
    hardware: ['Tools', 'Building Materials', 'Electrical', 'Plumbing']
  };
  const payments = ['Cash', 'Credit Card', 'Mobile Payment', 'Bank Transfer'];
  
  // Generate random sales data
  const salesData = days.map(() => Math.floor(Math.random() * 10000) + 5000);
  
  // Generate random product data
  const productData = products.map(() => Math.floor(Math.random() * 100) + 20);
  
  // Generate random category data
  const categoryData = categories[businessType].map(() => Math.floor(Math.random() * 100) + 10);
  
  // Generate random payment data
  const paymentData = payments.map(() => Math.floor(Math.random() * 100) + 10);
  
  return {
    kpis: {
      'Total Sales': { value: `$${(Math.random() * 20000 + 5000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 15).toFixed(1)}%` },
      'Transactions': { value: Math.floor(Math.random() * 200 + 50).toString(), trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 10).toFixed(1)}%` },
      'Customers': { value: Math.floor(Math.random() * 150 + 50).toString(), trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 8).toFixed(1)}%` },
      'Profit Margin': { value: `${(Math.random() * 10 + 20).toFixed(1)}%`, trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 3).toFixed(1)}%` },
      'Inventory': { value: Math.floor(Math.random() * 1000 + 500).toString(), trend: `${Math.random() > 0.4 ? '+' : ''}${(Math.random() * 5).toFixed(1)}%` }
    },
    sales: {
      labels: days,
      datasets: [{
        label: 'Sales ($)',
        data: salesData,
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    // topProducts: {
    //   labels: products,
    //   datasets: [{
    //     label: 'Units Sold',
    //     data: productData,
    //     backgroundColor: '#4cc9f0'
    //   }]
    // },
    categories: {
      labels: categories[businessType],
      datasets: [{
        data: categoryData,
        backgroundColor: ['#4361ee', '#3f37c9', '#4cc9f0', '#f8961e', '#f72585']
      }]
    },
    payments: {
      labels: payments,
      datasets: [{
        data: paymentData,
        backgroundColor: ['#4361ee', '#3f37c9', '#4cc9f0', '#f8961e']
      }]
    },
    transactions: [
      { id: 'TXN-001', time: '10:30 AM', amount: '$120.00', payment_method: 'Credit Card' },
      { id: 'TXN-002', time: '11:15 AM', amount: '$85.50', payment_method: 'Cash' },
      { id: 'TXN-003', time: '12:02 PM', amount: '$210.25', payment_method: 'Mobile Payment' },
      { id: 'TXN-004', time: '12:45 PM', amount: '$54.75', payment_method: 'Credit Card' },
      { id: 'TXN-005', time: '01:30 PM', amount: '$320.00', payment_method: 'Bank Transfer' }
    ],
     topProducts: [
      { product: 'Ceramic Tiles', Total_Sales: '12500', pa_Change: "25" },
      { product: 'Nail Clippers', Total_Sales: '9800', pa_Change: "15" },
      { product: 'Mallet', Total_Sales: '8700', pa_Change: "-5" },
      { product: 'Light Bulbs', Total_Sales: '7600', pa_Change: "12" },
      { product: 'Screws', Total_Sales: '6800', pa_Change: "-8" }
    ],
    inventory: [
      { product: 'Product A', current_stock: 8, threshold: 10, status: 'Low' },
      { product: 'Product B', current_stock: 5, threshold: 15, status: 'Critical' },
      { product: 'Product C', current_stock: 12, threshold: 10, status: 'Adequate' },
      { product: 'Product D', current_stock: 3, threshold: 5, status: 'Critical' },
      { product: 'Product E', current_stock: 15, threshold: 20, status: 'Adequate' }
    ]
  };
};

export const getDashboardData = async (filters, businessType) => {
  try {
    // In a real application, you would make an API call here:
    // const response = await axios.get('/api/dashboard', { params: { ...filters, businessType } });
    // return response.data;
    
    // For demo purposes, we'll return mock data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockData(filters, businessType));
      }, 300); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};