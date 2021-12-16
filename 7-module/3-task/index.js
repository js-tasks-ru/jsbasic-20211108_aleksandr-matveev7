import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._container = createElement(`
      <div class="slider">      
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${this._createSteps(steps, value)}
        </div>
      </div>`);
      this._clickSlider(steps);
  }
  get elem() {
    return this._container;
  }
  _createSteps(steps, value) {
    let span = ``;
    for (let i = 0; i < steps; i++){
      i == value ? span += `<span class="slider__step-active"></span>` : span += `<span></span>`;
    }
    return span;
  }
  _clickSlider(steps) {
    this._container.addEventListener('click', event => {
      //console.log('положение мыши', event.clientX - event.currentTarget.offsetLeft);
      //console.log('%', (event.clientX - event.currentTarget.offsetLeft) / event.currentTarget.offsetWidth * 100);
      //let num = (event.clientX - event.currentTarget.offsetLeft) / (event.currentTarget.offsetWidth / (steps - 1));
      //console.log('ближайший индекс', Math.round(num));
      //console.log((event.currentTarget.offsetWidth / (steps - 1) * index) / event.currentTarget.offsetWidth * 100);
      let index = (event.clientX - event.currentTarget.offsetLeft) / (event.currentTarget.offsetWidth / (steps - 1));
      index = Math.round(index);
      this._container.querySelector('.slider__value').innerHTML = index;
      this._container.querySelectorAll('.slider__steps > span').forEach( elem => elem.classList.remove('slider__step-active'));
      this._container.querySelectorAll('.slider__steps > span')[index].classList.add('slider__step-active');
      this._container.querySelector('.slider__thumb').style.left = event.currentTarget.offsetWidth / (steps - 1) * index / event.currentTarget.offsetWidth * 100 + '%';
      this._container.querySelector('.slider__progress').style.width = event.currentTarget.offsetWidth / (steps - 1) * index / event.currentTarget.offsetWidth * 100 + '%';
      const sliderChange = new CustomEvent('slider-change', {
        detail: index,
        bubbles: true 
      });
      this._container.dispatchEvent(sliderChange);
    });
  }
}
