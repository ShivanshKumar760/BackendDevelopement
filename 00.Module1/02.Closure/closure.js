function outerFunction(x) {
  // Outer variable
  var outerVariable = x;

  // Inner function
  function innerFunction(y) {
    console.log(outerVariable + y); // Accesses outerVariable
  }

  return innerFunction;
}

var closure = outerFunction(10); // outerFunction executes and returns innerFunction
closure(5); // 15 - innerFunction still has access to outerVariable (10)

//In simple terms: Inner functions
// have access to outer function variables, even after the outer function returns.
