/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.elem = this._creatTable(rows);
  }
  _creatTable(items) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
        </tr>
        `).join('')}
      </tbody>
    `;
    let users = table.querySelectorAll('tr');
    users.forEach( (item) => item.addEventListener('click', (event) => event.target.innerHTML == 'X' ? event.currentTarget.remove() : false));
    // let buttonDel = table.querySelectorAll('button'); item.parentElement.parentElement.remove(); - находим button, удаляем родителя родителя
    // let users = table.querySelectorAll('tr'); event.target.innerHTML == 'X' || event.target == table.querySelector('tr > td > button') - находим tr и проверяем клик по кнопке 
    return table;
  }
}
