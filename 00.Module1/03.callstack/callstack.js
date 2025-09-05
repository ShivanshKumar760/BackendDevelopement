function callMeNow() {
  console.log("I am called now!");
  throw new Error("Calling stack trace");
}
function greet() {
  console.log("Hello!");
  callMeNow();
}

function sayName(name) {
  console.log("My name is " + name);
  greet();
}

function start() {
  sayName("Shiv");
}

start();
