// File: main.js

// Import all modules
// Create sample data and demonstrate all functionality
// Expected Console Output:
// Product added: Laptop (ID: 1)
// Product added: Phone (ID: 2)
// Order created: Order #1001 for Customer #501
// Order Total: RM 2,756.00 (including taxes)
// Low stock alert: Phone (Stock: 3)

import { delay, minimum_stock_alert } from "./constant.js";
import { Order } from "./orderManager.js";
import { Products } from "./productManager.js";

const inventory = new Products();

const orders = [
  {
    name: `Laptop`,
    quantity: 1,
  },
  {
    name: `Phone`,
    quantity: 1,
  },
];

inventory.orders = orders;

Promise.all([
  inventory.addProduct(new Products.Product(1, `Laptop`, 1300, `Electronics`)),
  inventory.addProduct(
    new Products.Product(2, `Phone`, 1075.86, `Electronics`, 6)
  ),
])
  .then(async () => {
    console.log(`Now Creating Order ...`);
    const new_order = new Order(`#1001`, `#501`, inventory);
    const laptop = new_order.products.find((p) => p.name == `Laptop`);
    if (laptop) {
      laptop.quantity = 1;
    }
    const phone = new_order.products.find((p) => p.name == `Phone`);
    if (phone) {
      phone.quantity = 1;
    }
    console.log(
      `Order Created: Order ID ${new_order.id} for Customer ${new_order.id}`
    );
    new_order.products.map(product => {
        // product = {id: new_order.Products.products.find(i=>i.name===product.name).id, ...product};
        // console.log(product);
        product.id = new_order.Products.products.find(i=>i.name===product.name).id;
        
    })

    try {
      await new_order.createOrder();
      await console.log(`Order Total:\tRM ${(Intl.NumberFormat(`us-EN`,{maximumFractionDigits:2,minimumFractionDigits:2}).format(new_order.calculateOrderTotal()))} (Including Taxes)`);
      await minimum_stock_alert(new_order);
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    delay(1).then(() => {
      console.error(error);
      console.log(`\n\n\nPlease try again later ...`);
    });
  });
