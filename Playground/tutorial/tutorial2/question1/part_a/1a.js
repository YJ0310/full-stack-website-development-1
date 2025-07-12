const { read, realpath } = require("fs");
const { join } = require("path");
const { stdin, stdout } = require("process");

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 2500,
    category: "Electronics",
    inStock: true,
  },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", inStock: true },
  {
    id: 3,
    name: "Keyboard",
    price: 120,
    category: "Electronics",
    inStock: false,
  },
  {
    id: 4,
    name: "Monitor",
    price: 800,
    category: "Electronics",
    inStock: true,
  },
];

// Part A: Arrow Functions and Template Literals (10 marks)

// Create arrow functions (4 marks):

// calculateTax - takes price and tax rate (0.06 for 6% SST), returns tax amount
const calculateTax = (price, rate = 0.06) => {
  return price * (1 + rate);
};
const readline = require(`readline`).createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Please insert price:`, (price) => {
  console.log(`The price added with taxes is:\tRM${calculateTax(price)}`);
  console.log(`我喜欢Chin Shi`);
  // calculateTotal - takes price and tax, returns total price
  readline.question(`Please insert the price:`, (price) => {
    readline.question(`Please insert the rate (in %):`, (rate) => {
      // formatPrice - takes a number, returns formatted string "RM 2,500.00"
      const total_price = calculateTax(price, rate / 100);
      // number format
      const formatted_number = Intl.NumberFormat(`en-US`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total_price);

      console.log(`The total price is:\tRM ${formatted_number}`);
      readline.close();
    });
  });
});
