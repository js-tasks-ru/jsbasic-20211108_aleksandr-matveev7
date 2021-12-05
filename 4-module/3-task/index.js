function highlight(table) {
  for (let i = 1; i < table.rows.length; i++ ){
    let available = table.rows[i].cells[3];
    let gender = table.rows[i].cells[2];
    let age = table.rows[i].cells[1];
    available.dataset.available == 'true' ? available.parentElement.classList.add('available') : available.parentElement.classList.add('unavailable');
    available.dataset.available === undefined ? available.parentElement.hidden = 'true' : false ;
    gender.innerHTML == 'm' ? gender.parentElement.classList.add('male') : gender.parentElement.classList.add('female');
    age.innerHTML < 18 ? age.parentElement.style="text-decoration: line-through" : false;
  }
}
