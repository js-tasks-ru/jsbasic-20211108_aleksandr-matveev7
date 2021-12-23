import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this._createSlides()}
        </div>
      </div>`);
      this._initCarousel();
      this._addToCard();
  }
  get elem() {
    return this._container;
  }
  _createSlides() {
    let slides = ``;
    this.slides.forEach(elem => {
      slides += `
        <div class="carousel__slide" data-id="${elem.id}">
          <img src="/assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${elem.price.toFixed(2)}</span>
            <div class="carousel__title">${elem.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`});
    return slides;
  }
  _initCarousel() {
    const amountSlides = this.slides.length - 1;
    const slides = this._container.querySelector('.carousel__inner');
    const arrowLeft = this._container.querySelector('.carousel__arrow_left');
    const arrowRight = this._container.querySelector('.carousel__arrow_right');
    let positionSlide = 0;
    arrowHidden(); 

    this._container.querySelectorAll('.carousel__arrow').forEach(elem => {
      elem.addEventListener('click', event => {
        if (event.currentTarget.classList.contains("carousel__arrow_right")) {
          slides.style.transform = 'translateX(-' + (slides.offsetWidth + positionSlide) + 'px)';
          positionSlide += slides.offsetWidth;
          arrowHidden();
        } else {
          slides.style.transform = 'translateX(' + (slides.offsetWidth - positionSlide) + 'px)';
          positionSlide -= slides.offsetWidth;
          arrowHidden();
        }        
      });
    });
    function arrowHidden() {
      if (positionSlide == 0) { 
        arrowLeft.style.display = 'none';
        arrowRight.style.display = '';        
      } else if (positionSlide < slides.offsetWidth * amountSlides) {
         arrowRight.style.display = '';
         arrowLeft.style.display = '';
      } else {
        arrowRight.style.display = 'none';
        
      }
    }
  }
  _addToCard() {
    this._container.querySelectorAll('.carousel__button').forEach(elem => {
      elem.addEventListener('click', event => {this._getId(event)});
    });    
  }
  _getId(elem) {
    let productAdd = new CustomEvent('product-add', {
      detail: elem.currentTarget.parentElement.parentElement.dataset.id, // самому страшно смотреть на это
      bubbles: true
    });
    elem.currentTarget.dispatchEvent(productAdd);
  }
}