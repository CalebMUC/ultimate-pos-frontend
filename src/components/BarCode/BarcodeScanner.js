// src/composables/useBarcode.js
export function useBarcode() {
  // Generate a valid EAN-13 barcode (Kenya-compatible)
  const generateEAN13 = () => {
    let base = "616" + Math.floor(Math.random() * 1000000000).toString().padStart(9, "0");
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(base[i]);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return base + checkDigit;
  };

  // Generate SKU (Category + Brand + random number)
  const generateSKU = (productName, categoryID) => {
    const prefix = productName.substring(0, 3).toUpperCase();
    const unique = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${categoryID}-${unique}`;
  };

  return { generateEAN13, generateSKU };
}
