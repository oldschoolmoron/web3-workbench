// Learning Node.js Events
// Events let different parts of the code "talk" to each other.
// Here we use EventEmitter to create a custom event.

const EventEmitter = require("events");

// make an emitter object
const eventEmitter = new EventEmitter();

// define what happens when "greet" event is fired
eventEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}! Welcome to learning events.`);
});

// trigger the event with different names
eventEmitter.emit("greet", "Alice");
eventEmitter.emit("greet", "Bob");

// you can also make multiple listeners for the same event
eventEmitter.on("greet", () => {
  console.log("Another listener just ran on greet event.");
});

eventEmitter.emit("greet", "Charlie");
