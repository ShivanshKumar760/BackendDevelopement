function doMath() {
  console.log("3^4 = " + Math.pow(3, 4));
  console.log("4^3 = " + Math.pow(4, 3));
  console.log("root(2) = " + Math.sqrt(2));
  console.log("sin(10) = " + Math.sin(10));
}

doMath();

(function (l, p, r, s) {
  l("3^4 = " + p(3, 4));
  l("4^3 = " + p(4, 3));
  l("root(2) = " + r(2));
  l("sin(10) = " + s(10));
})(console.log, Math.pow, Math.sqrt, Math.sin);
//Minified
