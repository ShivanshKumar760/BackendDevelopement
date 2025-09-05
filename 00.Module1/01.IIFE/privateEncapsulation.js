function initialize() {
  console.log("App initialized");
  // setup code here
}

// Must remember to call it
initialize(); // Manual invocation required

(function () {
  console.log("App initialized");
  // setup code here
})(); // Executes immediately, no manual call needed

//Normal Scope:Global Scope
// Global variables - can be accessed/modified anywhere
var counter = 0;
var increment = function () {
  counter++;
};
var getCount = function () {
  return counter;
};

// Anyone can modify these
counter = 1000; // Oops! External modification

//Private Encapsulation using IIFE

var counterModule = (function () {
  var counter = 0; // Truly private - cannot be accessed outside

  return {
    increment: function () {
      counter++;
    },
    getCount: function () {
      return counter;
    },
  };
})();

// counter variable is completely inaccessible from outside
// console.log(counter); // ReferenceError: counter is not defined
