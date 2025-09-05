// Bad - creates global variables
var userName = "John";
var userAge = 30;
function greetUser() {
  console.log("Hello " + userName);
}

// Good - everything stays private
(function () {
  var userName = "John";
  var userAge = 30;

  function greetUser() {
    console.log("Hello " + userName);
  }

  greetUser(); // Only way to execute
})();

// userName, userAge, greetUser don't exist in global scope
