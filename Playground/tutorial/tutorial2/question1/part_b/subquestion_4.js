// Part B: Destructuring and Modern Object Features (10 marks)

// Implement destructuring functions (6 marks):

// extractCustomerInfo - uses object destructuring to extract name, email, and city from customer object
// getTopProducts - uses array destructuring to get first 2 products from products array

// // extractCustomerInfo(customer)
// { name: "Ahmad Rahman", email: "ahmad@example.com", city: "Petaling Jaya" }

// // getTopProducts(products)
// [
//     { id: 1, name: "Laptop", price: 2500, category: "Electronics", inStock: true },
//     { id: 2, name: "Mouse", price: 50, category: "Electronics", inStock: true }
// ]
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

const extractCustomerInfo = () => {
  const { name, email } = customer;
  const city = customer.address.city;
  console.log({ name, email, city });
};
extractCustomerInfo();

const getTopProducts = () => {
  const top_products = [];
  for (let index = 0; index < 2; index++) {
    const element = products[index];
    top_products.push(element);
  }
  console.log(top_products);
};
getTopProducts();
