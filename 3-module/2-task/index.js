function filterRange(arr, a, b) {
  let value = [];
  arr.filter(item => (item >= a && item <= b) ? value.push(item) : false);
  return value;
}
