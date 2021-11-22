function filterRange(arr, a, b) {
  let value = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b ) value.push(arr[i]);
  }
  return value;
}
