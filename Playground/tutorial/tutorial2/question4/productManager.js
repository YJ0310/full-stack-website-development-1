// Question 4: E-commerce API Module System (15 marks)
// Scenario: You are building a modular e-commerce API system for "Smol Tako Marketplace". The system needs to be organized into separate modules for better maintainability.

import { Order } from "./orderManager.js";

// Part A: Create Product Management Module (8 marks)

// File: productManager.js

// Create a Product class with properties: id, name, price, category, stock
// Create functions:
export class Products {
  constructor() {
    /**
     * @type {InstanceType<typeof Products.Product>[]}
     */
    this.products = [];
    /**
     * @type {InstanceType<typeof import("./orderManager.js").product>[]}
     */
    this.orders = [];
  }

  static Product = class {
    /**
     * Insert a Product
     * @param {number} id
     * @param {string} name
     * @param {number} price
     * @param { `Electronics`|`Clothing`|`Books`|`Home` } category
     * @param {number} [stock = 10] - default is 10
     * @returns nothing
     */
    constructor(id, name, price, category, stock = 10) {
      this.id = `#` + String(id).padStart(3, `0`);
      this.name = name;
      this.price = price;
      this.category = category;
      this.stock = stock;
    }
  };

  loading = (time = 2) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.01) {
          resolve(`Connect to the database successfully`);
        } else {
          reject(`Fail to connect the database`);
        }
      }, time * 1000);
    });
  };

  // addProduct(product) - adds product to this
  /**
   *
   * @param {InstanceType<typeof Products.Product>} product
   * @returns
   */
  addProduct = (product) => {
    return new Promise((resolve, reject) => {
      console.log(`Trying to add product for ${product.name}`);
      this.loading()
        .then((msg) => {
          console.log(msg);
          resolve(this.products.push(product));
          console.log(`Product added: ${product.name} (ID: ${product.id})\n`);
        })
        .catch((err) => {
          console.error(err);
          reject(`Failed to add ${product.name}\n`);
        });
    });
  };

  // updateStock(productId, quantity) - updates product stock
  /**
   *
   * @param {string} productId
   * @param {number} quantity
   * @returns {Order}
   */
  updateStock = (productId, quantity) => {
    return new Promise((resolve, reject) => {
      this.loading()
        .then((msg) => {
          console.log(msg);
          const selected_product = this.products.find(
            (product) => product.id == productId
          );
          selected_product.stock = quantity;
          resolve(selected_product);
        })
        .catch((err) => {
          console.error(err);
          reject(`Failed to update stock with id:\t${productId}`);
        });
    });
  };

  // getProductsByCategory(category) - filters products by category
  getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
      this.loading()
        .then((msg) => {
          console.log(msg);
          resolve(
            this.products.filter((product) => product.category == category)
          );
        })
        .catch((err) => {
          console.error(err);
          reject(`Failed to get to products by ${category}`);
        });
    });
  };

  // calculatethisValue() - calculates total this value
  calculatethisValue = () => {
    return new Promise((resolve, reject) => {
      this.loading()
        .then((msg) => {
          console.log(msg);
          let total_this_value = 0;
          this.products.map(
            (product) => (total_this_value += product.quantity)
          );
          resolve(total_this_value);
        })
        .catch((err) => {
          console.error(err);
          reject(`Fail to get total this value`);
        });
    });
  };

  // Export both the class and functions
}
