// Create a customer greeting function (3 marks):
const customer = {
  id: 101,
  name: "Ahmad Rahman",
  email: "ahmad@example.com",
  address: {
    street: "123 Jalan Utama",
    city: "Petaling Jaya",
    postcode: "47800",
    state: "Selangor",
  },
  preferences: ["Electronics", "Books"],
};
// Function name: generateWelcomeMessage
const generateWelcomeMessage = (customer) => {
  // Uses template literals to create a personalized message
  const { name, email, address } = customer;
  const { street, city, postcode, state } = address;
  const text = [
    `Welcome back, `,
    name,
    `! Your last order was delivered to `,
    [street, city, state].join(`, `),
    ` ${street}`,
  ];
  // Expected Output: "Welcome back, Ahmad Rahman! Your last order was delivered to 123 Jalan Utama, Petaling Jaya, Selangor 47800"
  console.log(text.join(""));
};

generateWelcomeMessage(customer);

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

// Create a product summary function (3 marks):

// Function name: createProductSummary
const createProductSummary = (products) => {
  const { id, name, price, category, inStock } = products;
  formatted_price = Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  let inStock_status;
  if (inStock === true) {
    inStock_status = `In Stock`;
  } else {
    inStock_status = `No Stock`;
  }
  console.log(
    `${name} - RM ${formatted_price} (${category}) - ${inStock_status}`
  );
};

for (let index = 0; index < products.length; index++) {
  const element = products[index];
  createProductSummary(element);
}
// Takes a product object and returns a formatted string using template literals
// Expected Output for Laptop: "Laptop - RM 2,500.00 (Electronics) - In Stock"
