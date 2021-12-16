import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._title;
    this._body;
    }
  open() {
    document.body.classList.add('is-modal-open');
    const modal = `
                    <div class="modal">
                      <div class="modal__overlay"></div>
                      <div class="modal__inner">
                        <div class="modal__header">
                          <button type="button" class="modal__close">
                            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                          </button>
                          <h3 class="modal__title">
                            ${this._title}
                          </h3>
                        </div>
                        <div class="modal__body">
                          все стерто
                        </div>
                      </div>
                    </div>
                  `;
    let escape = (event) => {      
      if(event.code === 'Escape') console.log(this.close());
      document.removeEventListener('keydown', escape, false);
    }
    document.querySelector('.container').innerHTML = modal;
    document.querySelector('.modal__body').innerHTML = '';
    document.querySelector('.modal__body').append(this._body);
    document.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', escape);
  }
  setTitle(title) {
    this._title = title;
  }
  setBody(body) {
    this._body = body;
  }
  close() {
    document.querySelector('.modal').remove();
    document.body.classList.remove('is-modal-open');    
  }
}
