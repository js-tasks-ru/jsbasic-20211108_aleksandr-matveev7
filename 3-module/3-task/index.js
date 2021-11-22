function camelize(str) {
  let arr = str.split('-').map(function(item, index) {
    if(index > 0) item = item.charAt(0).toUpperCase() + item.slice(1);
      return item;
  });
  return arr.join('');
}
