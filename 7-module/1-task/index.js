import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._container = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this._createMenu()}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);
    this._scrollMenu();
    this._clickItemMenu ()
  }
  get elem() {
    return this._container;
  }
  _createMenu() {
    let menu = ``;
    this.categories.forEach( elem => {
      menu += `<a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>`});
    return menu;
  }
  _scrollMenu () {
    const ribbonInner = this._container.querySelector('.ribbon__inner');
    const arrowLeft = this._container.querySelector('.ribbon__arrow_left');
    const arrowRight = this._container.querySelector('.ribbon__arrow_right');
    let scrollRight;
    arrowLeft.addEventListener('click', () => ribbonInner.scrollBy(-350, 0));
    arrowRight.addEventListener('click', () => ribbonInner.scrollBy(350, 0));
    ribbonInner.addEventListener('scroll', () => {
      ribbonInner.scrollLeft == 0 ? arrowLeft.classList.remove('ribbon__arrow_visible') : arrowLeft.classList.add('ribbon__arrow_visible');
      scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      scrollRight < 1 ? arrowRight.classList.remove('ribbon__arrow_visible') : arrowRight.classList.add('ribbon__arrow_visible');
    });  
  }
  _clickItemMenu () {
    const itemsMenu = this._container.querySelectorAll('.ribbon__item');
    itemsMenu.forEach( elem => {
      elem.addEventListener('click', event => {
        event.preventDefault();
        itemsMenu.forEach( elem => elem.classList.remove('ribbon__item_active'));
        event.target.classList.add('ribbon__item_active');
        const ribbonSelect = new CustomEvent('ribbon-select', { 
          detail: event.target.dataset.id,
          bubbles: true
        });
        event.target.parentElement.dispatchEvent(ribbonSelect);
      });
    });
  }
}
