function modifyArray(arr) {
  arr.push(4); // Modifies the original array
  arr[0] = 999; // Modifies the original array
  console.log("Inside function: arr =", arr);
}

let myArray = [1, 2, 3];
modifyArray(myArray);
console.log("Outside function: myArray =", myArray); // [999, 2, 3, 4]

// Output:
// Inside function: arr = [999, 2, 3, 4]
// Outside function: myArray = [999, 2, 3, 4]

function modifyObject(obj) {
  obj.name = "Modified";
  obj.age = 30;
  console.log("Inside function:", obj);
}

let person = { name: "John", age: 25 };
modifyObject(person);
console.log("Outside function:", person); // { name: "Modified", age: 30 }
