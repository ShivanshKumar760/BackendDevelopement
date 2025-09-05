for (var i = 1; i <= 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
} //10,10,10,10,10,10,10,10,10,10

for (let i = 1; i <= 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
} //1,2,3,4,5,6,7,8,9,10

for (var i = 1; i <= 10; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 100);
  })(i);
} //1,2,3,4,5,6,7,8,9,10
//IIFE - Immediately Invoked Function Expression
