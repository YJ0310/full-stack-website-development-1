const name = 'John';
const age = 25;

// Shorthand properties
const user = { name, age };

// Method definitions
const calculator = {
    add(a, b) {
        return a + b;
    },
    
    // Computed property names
    [name + 'Method']() {
        return 'Hello';
    }
};

console.log(user);
console.log(calculator.add(5, 10)); 
console.log(calculator.JohnMethod()); // Outputs: Hello
console.log("Hello, World!"); // Added line to match the context of hello_world.js