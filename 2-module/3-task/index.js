let calculator = {
  value: [],
  read: function (a, b) {
    this.value.push(a, b);
  },
  sum: function () {
    let sum = this.value[0];
    for (let i = 1; i < this.value.length; i++) {
      sum += this.value[i];
    }
    return sum;
  },
  mul: function () {
    let mul = this.value[0];
    for (let i = 1; i < this.value.length; i++) {
      mul *= this.value[i];
    }
    return mul;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
