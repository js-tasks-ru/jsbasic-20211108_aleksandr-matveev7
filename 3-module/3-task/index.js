function camelize(str) {
  let arr = str.split('-').map((item, index) => index > 0 ? item = item.charAt(0).toUpperCase() + item.slice(1) : item);
  return arr.join('');
}
