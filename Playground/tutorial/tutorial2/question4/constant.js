// File: constants.js

import { Order } from "./orderManager.js";

// Export categories: CATEGORIES = ["Electronics", "Clothing", "Books", "Home"]
export const categories = [`Electronics`, `Clothing`, `Books`, `Home`];
// Export tax rates: TAX_RATES = { SST: 0.06, SERVICE: 0.10 }
export const tax_rates = {
  sst: 0.06,
  service: 0.1,
};
// Export minimum stock alert: MIN_STOCK_ALERT = 5
/**
 * @param {Order} Order
 */
export const minimum_stock_alert = (Order) => {
  Promise.all(
    Order.Products.products.map((product) => {
      if (product.stock <= 5) {
        console.log(`Alert: Low Stock for ${product.name}`);
      }
    })
  ).then((i) => {
    return i;
  });
};

export const delay = (seconds = 2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};
