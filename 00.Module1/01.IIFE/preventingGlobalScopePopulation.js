// Without IIFE - pollutes global scope
var counter = 0;
var increment = function () {
  counter++;
};
var getCount = function () {
  return counter;
};

// With IIFE - private scope
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
})();

console.log(counterModule.getCount()); // 0
counterModule.increment();
console.log(counterModule.getCount()); // 1
// console.log(counter); // ReferenceError: counter is not defined
