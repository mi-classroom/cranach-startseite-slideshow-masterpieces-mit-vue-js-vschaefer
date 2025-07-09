/* Content Carousel
############################################################################ */

const initCarousel = () => {
  const target = document.querySelector('[data-js-about-carousel-wrap]');
  if (!target) return;

  let activeCarouselItem = 0;
  let carouselPosition = 0;
  const carouselItems = target.querySelectorAll('& > *');
  const buttons = document.querySelectorAll('[data-js-about-carousel]');

  buttons.forEach(
    button => {
      button.addEventListener('click', function () {
        const itemWidth = carouselItems[activeCarouselItem].clientWidth;
        const direction = button.dataset.jsAboutCarousel;

        if (direction === 'previous' && activeCarouselItem > 0) {
          activeCarouselItem--;
          carouselPosition += itemWidth;
        } else if (activeCarouselItem < carouselItems.length - 1) {
          activeCarouselItem++;
          carouselPosition += itemWidth * -1;
        }
        target.style.transform = `translateX(${carouselPosition}px)`;
      });
    });
};

/* Image Flip
############################################################################ */

const initImageStack = () => {

  const stackWrap = document.querySelector('[data-js-image-stack]');

  const updateZIndicesAndTransforms = () => {
    const cards = Array.from(stackWrap.querySelectorAll('img'));
    cards
      .sort((a, b) => parseInt(a.style.zIndex || 0) - parseInt(b.style.zIndex || 0))
      .reverse()
      .forEach((card, i, arr) => {
        card.style.zIndex = i + 1;
        if (i === arr.length - 1) {
          card.style.transform = 'rotate(0deg)';
        } else {
          const rotation = (i - arr.length + 1) * 5; // e.g.: -10, -5, 0
          card.style.transform = `rotate(${rotation}deg)`;
        }
      });
  }

  const getTopCard = () => {
    const cards = Array.from(stackWrap.querySelectorAll('img'));
    return cards.reduce((top, current) => {
      const zTop = parseInt(top.style.zIndex || 0);
      const zCur = parseInt(current.style.zIndex || 0);
      return zCur > zTop ? current : top;
    });
  }

  const shuffle = () => {
    const cards = Array.from(stackWrap.querySelectorAll('img'));
    const topCard = getTopCard();
    
    topCard.style.transform = 'translateX(-100%) rotate(10deg)';       

    setTimeout(() => {
      // increase others z-index
      cards.forEach((card, i) => {
        const z = parseInt(card.style.zIndex || 0);
        if (card !== topCard) {
          card.style.zIndex = z + 1;
          const rotation = cards.length - z * -5;
          card.style.transform = `rotate(${rotation}deg)`;
        }else{
          newRotation = 0;
        }
      });

      // put topCard last
      topCard.style.zIndex = 1;
      topCard.style.transform = `rotate(0) translateX(0)`;
    }, 300);
  }

  updateZIndicesAndTransforms();
  stackWrap.addEventListener('click', shuffle );

}

/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initImageStack();
});