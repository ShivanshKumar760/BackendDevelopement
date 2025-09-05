function createCounter() {
  var counter = 0; // Private to this function

  return {
    increment: function () {
      counter++;
    },
    getCount: function () {
      return counter;
    },
  };
}

// Key difference: You must CALL the function to get the module
var counterModule1 = createCounter(); // Creates first instance
var counterModule2 = createCounter(); // Creates second instance

counterModule1.increment();
counterModule1.increment();
console.log(counterModule1.getCount()); // 2

counterModule2.increment();
console.log(counterModule2.getCount()); // 1

// Each call creates a NEW instance with its own counter variable
var counterModule = (function () {
  var counter = 0; // Private variable

  return {
    increment: function () {
      counter++;
    },
    getCount: function () {
      return counter;
    },
  };
})(); // Executes IMMEDIATELY, creates ONE instance

// You get the module directly, no function call needed
counterModule.increment();
counterModule.increment();
console.log(counterModule.getCount()); // 2

// There's only ONE instance, ONE counter variable
