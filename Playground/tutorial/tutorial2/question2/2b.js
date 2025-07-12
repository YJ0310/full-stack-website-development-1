// Part B: Async/Await Order Management (10 marks)

// Create processOrder(dishName) function (6 marks):
const { kitchen } = require(`./2a`);

const processOrder = async (dishName) => {
  console.log(`Processing order for ${dishName} ...`);
  setTimeout(async () => {
    try {
      await kitchen(dishName);
      setTimeout(() => {
        console.log(`Order Completed for ${dishName}`);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }, 1000);
};

// processOrder(`Nasi Eli`);

// Use async/await to chain the three operations above
// Implement proper error handling with try/catch
// Log each step's result
// Expected Output:
// Processing order for Nasi Lemak...
// ✓ Ingredients ready for Nasi Lemak
// ✓ Nasi Lemak is ready!
// ✓ Nasi Lemak packaged and ready for delivery
// Order completed for Nasi Lemak!

// Create processMultipleOrders(orders) function (4 marks):

const dishes = [`Eli Breast Milk`, `Eli Virgin`, `Eli Ass`, `Eli Leg`];
const test = [`Nasi Lemak`, `Roti Canai`, `Ayam Gunting`];

const process_all_dishes = async (dishes) => {
  await Promise.all(dishes.map(kitchen))
    .then((message) => {
      console.log(`${dishes.join(`, `)} Completed !!!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

process_all_dishes(dishes);

// Takes an array of dish names
// Process all orders simultaneously using Promise.all
// Handle errors gracefully
// Expected Output:
// // processMultipleOrders(["Nasi Lemak", "Mee Goreng", "Teh Tarik"])
// // Should process all orders at the same time and show completion message
