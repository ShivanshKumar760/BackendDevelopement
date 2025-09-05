// function reassignArray(arr) {
//   arr = [7, 8, 9]; // Creates new array, only changes local reference
//   console.log("Inside function after reassignment:", arr);
// }

// function reassignObject(obj) {
//   obj = { name: "New Object" }; // Creates new object, only changes local reference
//   console.log("Inside function after reassignment:", obj);
// }

// let myArray = [1, 2, 3];
// let myObject = { name: "Original" };

// reassignArray(myArray);
// console.log("Outside function: myArray =", myArray); // Still [1, 2, 3]

// reassignObject(myObject);
// console.log("Outside function: myObject =", myObject); // Still { name: "Original" }

// // Output:
// // Inside function after reassignment: [7, 8, 9]
// // Outside function: myArray = [1, 2, 3]
// // Inside function after reassignment: { name: "New Object" }
// // Outside function: myObject = { name: "Original" }

for (var i = 1; i <= 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

for (let i = 1; i <= 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}

for (var i = 1; i <= 10; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 100);
  })(i);
}
