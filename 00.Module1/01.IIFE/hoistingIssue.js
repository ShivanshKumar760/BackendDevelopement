console.log(myVar); // undefined (due to hoisting)
//wont throw error because of hoisting

var myVar = "Hello";

function myFunction() {
  console.log("Function called");
}

// Function and variable declarations are hoisted

(function () {
  console.log(myVar); // ReferenceError: myVar is not defined
  var myVar = "Hello"; // Clear scope boundary
})();

// No hoisting concerns outside the IIFE
