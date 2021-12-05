function initCarousel() {

  let slides = document.querySelector('.carousel__inner');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let positionSlide = 0;
  arrowHidden(positionSlide, slides.offsetWidth, arrowRight, arrowLeft);

  arrowRight.addEventListener('click', function() {
    slides.style.transform = 'translateX(-' + (slides.offsetWidth + positionSlide) + 'px)';
    positionSlide += slides.offsetWidth;
    arrowHidden(positionSlide, slides.offsetWidth, arrowRight, arrowLeft);
  });
  arrowLeft.addEventListener('click', function(event) {
    slides.style.transform = 'translateX(' + (slides.offsetWidth - positionSlide) + 'px)';
    positionSlide -= slides.offsetWidth;
    arrowHidden(positionSlide, slides.offsetWidth, arrowRight, arrowLeft);
  });
}

function arrowHidden (position, width, right, left) {
  if (position == width * 3) {
    right.style.display = 'none';
  } else if (position == 0) {
    left.style.display = 'none';
    right.style.display = '';
  } else {
    left.style.display = '';
  }

}