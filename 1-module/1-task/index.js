function factorial(n) {
  let factorialMultiply = 1;
  for (let i = 1; i <= n; i++) {
    factorialMultiply *= i;
  }
  return factorialMultiply;
}
