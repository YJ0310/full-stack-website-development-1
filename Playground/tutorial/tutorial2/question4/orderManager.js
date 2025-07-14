// File: orderManager.js

/**
 * @typedef {object} product
 * @property {string} name
 * @property {number} quantity
 */

// Import productManager and constants

import { Products } from "./productManager.js";

import { tax_rates } from "./constant.js";

// Create Order class with properties: id, customerId, products, total, status
export class Order {
  /**
   *
   * @param {number} id - id of the order
   * @param {number} customerId - id of the customer
   * @param {Products} custom_Products - the Product class
   */
  constructor(id, customerId, custom_Products) {
    this.id = id;
    this.customerId = customerId;

    /**
     * @type {product[]}
     */
    this.products = custom_Products.orders;
    // i want to add something in every elements in products array
    this.total = 0;
    this.status = `Pending`;
    this.Products = custom_Products;
  }

  // Create functions:

  // createOrder(customerId, products) - creates new order and updates stock
  /**
   *
   * @returns the class you enter
   */
  async createOrder() {
    try {
      const createOrder = this.products.map(async (product) => {
        const new_quantity =
          this.Products.products.filter(
            (inventory_product) => inventory_product.name === product.name
          )[0].stock - product.quantity;
        // Products.updateStock(product.id, new_quantity);
        await this.Products.updateStock(product.id, new_quantity);
        console.log(`${product.name} ordered`);
      });
      await Promise.all(createOrder).then((i) => {
        return i;
      });
    } catch (error) {
      console.error(error);
    }
  }

  // calculateOrderTotal(products) - calculates total including tax

  calculateOrderTotal() {
    try {
      let total_price_without_taxes = 0;
      this.products.map((product) => {
        const product_price = this.Products.products.find(
          (i) => i.id === product.id
        ).price;
        total_price_without_taxes += product.quantity * product_price;
        console.log(
          `${product.name} (RM ${parseFloat(product_price).toFixed(2)}) * ${
            product.quantity
          } Added`
        );
      });
      return parseFloat(
        total_price_without_taxes * (1 + tax_rates.sst + tax_rates.service)
      ).toFixed(2);
    } catch (error) {
      console.error(error);
    }
  }
  // getOrdersByStatus(status) - filters orders by status

  getOrdersByStatus(products, status = `completed`) {
    const status_list = [`completed`, `pending`, `no stock`];
    if (!status.includes(status_list)) {
      throw new Error("Please insert correct status");
    }
    const status_list_id = {};
    status_list.forEach((status_element, index) => {
      status_list_id[status_element] = index;
    });
    return products.filter((product) => product.status == status).sort();
  }
  // Export the class and functions
}
