// Question 2: Restaurant Order Processing System - Asynchronous Programming (25 marks)
// Scenario: You are building an order processing system for "Restoran Smol Tako". The system needs to simulate cooking time, order preparation, and delivery tracking using asynchronous programming.

// Part A: Promise-based Kitchen Operations (10 marks)

// Create the following functions that return promises:
let mode = 0;
// prepareIngredients(dishName) - Simulates ingredient preparation
const prepareIngredients = (dishName) => {
  return new Promise((resolve, reject) => {
    // Takes 1 second to resolve
    setTimeout(() => {
      const chance = Math.random();
      if (chance >= 0.2) {
        // Resolves with: "Ingredients ready for [dishName]"
        resolve(`Ingredients ready for ${dishName}.`);
      } else {
        // Rejects with: "Ingredients not available for [dishName]" (20% chance)
        reject(`Ingredients not available for ${dishName}.`);
      }
    }, 1000);
  });
};

const cooka = () => {
  prepareIngredients(`Soo Soo's susu`)
    .then((message) => {
      console.log(message);
    })
    .catch((message) => console.log(message));
};

const cooked10 = () => {
  for (let index = 0; index < 10; index++) {
    cooka();
  }
};

// if (mode == 0) {
//   cooka();
// } else {
//   cooked10();
// }

// cookDish(dishName) - Simulates cooking

const cookDish = (dishName) => {
  return new Promise((resolve, reject) => {
    // Takes 3 seconds to resolve
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // Resolves with: "[dishName] is ready!"
        resolve(`${dishName} is ready!`);
      } else {
        // Rejects with: "Cooking failed for [dishName]" (10% chance)
        reject(`Cooking failed for ${dishName}`);
      }
    }, 3000);
  });
};

const cooked20 = async () => {
  for (i = 0; i < 20; i++) {
    await cookDish(`Soo Soo's Shashimi`)
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));
  }
};

// if (mode == 0) {
//   cookDish(`Soo Soo's Shashimi`)
//     .then((msg) => console.log(msg))
//     .catch((err) => console.error(err));
// } else {
//   cooked20();
// }

// packageOrder(dishName) - Simulates packaging

const packageOrder = (dishName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${dishName} packaged and ready for delivery`);
    }, 500);
  });
};

const dishName = `Soo Soo Breast Milk`;

const kitchen = async (dishName) => {
  await prepareIngredients(dishName)
    .then((msg) => {
      console.log(msg);
      return cookDish(dishName);
    })
    .then((msg) => {
      console.log(msg);
      return packageOrder(dishName);
    })
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      throw err;
    });
};

// kitchen(dishName);

// Takes 0.5 seconds to resolve
// Resolves with: "[dishName] packaged and ready for delivery"
// Expected Console Output:

// Ingredients ready for Nasi Lemak
// Nasi Lemak is ready!
// Nasi Lemak packaged and ready for delivery

module.exports = {
  kitchen,
};
