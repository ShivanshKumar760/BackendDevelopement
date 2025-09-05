function memoize(fn) {
  var cache = {}; // Closure variable to store results

  return function (arg) {
    if (cache[arg] !== undefined) {
      console.log("Cache hit for", arg);
      return cache[arg];
    }

    console.log("Computing result for", arg);
    var result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

function expensiveFunction(n) {
  // Simulate expensive computation
  var result = 0;
  for (var i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
}

var memoizedFunction = memoize(expensiveFunction);

console.log(memoizedFunction(5)); // Computing result for 5
console.log(memoizedFunction(5)); // Cache hit for 5
console.log(memoizedFunction(3)); // Computing result for 3
console.log(memoizedFunction(5)); // Cache hit for 5
