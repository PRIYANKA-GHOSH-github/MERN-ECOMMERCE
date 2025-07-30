// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format as Indian Rupees
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numAmount);
};

// Alternative format without currency symbol (just the number with commas)
export const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return '0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numAmount);
};

// Format with rupee symbol
export const formatRupee = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return `₹${formatPrice(numAmount)}`;
}; 