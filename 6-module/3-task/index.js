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
    let slides = this._container.querySelector('.carousel__inner');
    let arrowLeft = this._container.querySelector('.carousel__arrow_left');
    let arrowRight = this._container.querySelector('.carousel__arrow_right');
    let positionSlide = 0;    
  
    arrowRight.addEventListener('click', function() {
      slides.style.transform = 'translateX(-' + (slides.offsetWidth + positionSlide) + 'px)';
      positionSlide += slides.offsetWidth;      
    });
    arrowLeft.addEventListener('click', function(event) {
      slides.style.transform = 'translateX(' + (slides.offsetWidth - positionSlide) + 'px)';
      positionSlide -= slides.offsetWidth;     
    });
    // не сделал hiddenArrow  
  }
  _addToCard() {
    console.log(this.slides[0].id);
    let productAdd = new CustomEvent("product-add", {
      detail: this.slides[0].id, // не придумал как передать id
      bubbles: true
    });
    this._container.querySelectorAll('.carousel__button').forEach(elem => {
      elem.addEventListener('click', event => {event.target.dispatchEvent(productAdd);});
    });
  }
}