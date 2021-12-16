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
      this._dragNDrop(steps, value);
  }
  get elem() {
    return this._container;
  }
  _createSteps(steps, value) {
    let spans = ``;
    for (let i = 0; i < steps; i++){
      i == value ? spans += `<span class="slider__step-active"></span>` : spans += `<span></span>`;
    }
    return spans;
  }
  
  _dragNDrop(steps, value) {

    let slider = this._container;
    let thumb = this._container.querySelector('.slider__thumb');
    let progress = this._container.querySelector('.slider__progress');
    let index = value;

      /* костыль чтобы работал с другим value */
    let percent = 100 / (steps - 1) * index;
    thumb.style.left = percent + '%';
    progress.style.width = percent + '%';
    slider.querySelector('.slider__value').innerHTML = index;
    slider.querySelectorAll('.slider__steps > span').forEach( elem => elem.classList.remove('slider__step-active'));
    slider.querySelectorAll('.slider__steps > span')[index].classList.add('slider__step-active');

    slider.addEventListener('click', event => {
      let index = (event.clientX - event.currentTarget.offsetLeft) / (event.currentTarget.offsetWidth / (steps - 1));
      index = Math.round(index);
      slider.querySelector('.slider__value').innerHTML = index;
      slider.querySelectorAll('.slider__steps > span').forEach( elem => elem.classList.remove('slider__step-active'));
      slider.querySelectorAll('.slider__steps > span')[index].classList.add('slider__step-active');
      slider.querySelector('.slider__thumb').style.left = event.currentTarget.offsetWidth / (steps - 1) * index / event.currentTarget.offsetWidth * 100 + '%';
      slider.querySelector('.slider__progress').style.width = event.currentTarget.offsetWidth / (steps - 1) * index / event.currentTarget.offsetWidth * 100 + '%';
      const sliderChange = new CustomEvent('slider-change', {
        detail: index,
        bubbles: true 
      });
      slider.dispatchEvent(sliderChange);
    });
    
    thumb.addEventListener('pointerdown', () => {

      slider.classList.add('slider_dragging');

      function moveAt() {
        let percent = 100 / (steps - 1) * index;
        index = Math.round(index);   
        if (percent <= 0) {
          index = 0;
          percent = 0;
        } else if (percent >= 100) {
          index = steps - 1;
          percent = 100;
        }
        thumb.style.left = percent + '%';
        progress.style.width = percent + '%';
        slider.querySelector('.slider__value').innerHTML = index;
        slider.querySelectorAll('.slider__steps > span').forEach( elem => elem.classList.remove('slider__step-active'));
        slider.querySelectorAll('.slider__steps > span')[index].classList.add('slider__step-active');
      }

      function onMouseMove(event) {
        index = (event.pageX - slider.offsetLeft) / (slider.offsetWidth / (steps - 1));
        moveAt();
      }

      function fixed() {
        thumb.style.left = 100 / (steps - 1) * index + '%';
        progress.style.width = 100 / (steps - 1) * index + '%';
        console.log(index);
        const sliderChange = new CustomEvent('slider-change', {
          detail: index,
          bubbles: true 
        });
        slider.dispatchEvent(sliderChange);
      }

      document.addEventListener('pointermove', onMouseMove);

      document.onmouseup = () => {
        document.removeEventListener('pointermove', onMouseMove);
        thumb.onmouseup = null;
        fixed();
        slider.classList.remove('slider_dragging');
      }

    });
  }
}
