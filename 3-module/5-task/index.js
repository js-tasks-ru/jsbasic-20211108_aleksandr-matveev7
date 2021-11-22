function getMinMax(str) {
  let arr = str.split(' ').filter(function(item) {
    if (!isNaN(parseInt(item))) return item;
  });
  let result = {
    min: 0,
    max: 0,
  }
  result.min = arr.reduce((min, item) => Math.min(min, item));
  result.max = arr.reduce((max, item) => Math.max(max, item));
  return result;
}
