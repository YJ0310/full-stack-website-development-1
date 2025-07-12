// Part C: Delivery Tracking System (5 marks)

// Create trackDelivery(orderID) function:
// Simulates delivery tracking with 3 stages: "Picked up", "On the way", "Delivered"
// Each stage takes 2 seconds
// Use async/await with a loop
// Expected Output:
// Order #12345: Picked up
// Order #12345: On the way
// Order #12345: Delivered

const process = (order_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(order_id);
    }, 2000);
  });
};

const trackDelivery = async (order_id) => {
  const messages = [`Picked up`, `On the way`, `Delivered`];
  for (i = 0; i < 3; i++) {
    try {
      const get_id = await process(order_id);
      console.log(`Order #${get_id}:\t${messages[i]}`);
    } catch (error) {
      console.error(error);
    }
  }
};

trackDelivery(23006001);
