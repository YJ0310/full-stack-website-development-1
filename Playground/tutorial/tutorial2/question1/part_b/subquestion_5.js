// Implement spread operator functions (4 marks):

// addToCart - takes existing cart array and new product, returns new cart using spread operator
// updateCustomerInfo - takes customer object and updates object, returns new customer object using spread operator
// Expected Output:
// // addToCart([product1], product2)
// [product1, product2]

// // updateCustomerInfo(customer, { phone: "012-3456789" })
// // Returns customer object with added phone field

const addToCart = (products, new_products) => {
  console.log([...products, ...new_products]);
  return [...products, ...new_products];
};

const updateCustomerInfo = (old_customer_info, new_customer_info) => {
  console.log({...old_customer_info, ...new_customer_info});
  return {...old_customer_info, ...new_customer_info};
};

const current_idol_list = [
  `Yong Ning`,
  `Jin Yi`,
  `Samantha Chuo`,
  `Chua Xin Ru`,
  `Tang Euzine`,
  `Tang Zi Hong`,
];
addToCart(current_idol_list, [`Tan Chin Shi`]);

const current_custumer_info = {
    name: `Tan Chin Shi`,
    age: 22,
    fav: 0.3
}

updateCustomerInfo(current_custumer_info, {age: 23, fav: 0.7})
