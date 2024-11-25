const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const dotsNav = document.querySelector('.carousel-dots');
const dots = Array.from(dotsNav.children);
const readMoreLinks = document.querySelectorAll('.read-more');
const modals = document.querySelectorAll('.research-modal');
const closeModals = document.querySelectorAll('.close-modal');

let currentSlide = 0;
let isTransitioning = false;

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
  const diffX = touchStartX - touchEndX;
  if (Math.abs(diffX) > 50 && !isTransitioning) { // Minimum swipe distance
    isTransitioning = true;
    if (diffX > 0) {
      // Swipe left
      currentSlide = (currentSlide + 1) % slides.length;
    } else {
      // Swipe right
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    updateCarousel();
  }
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });

  // Reset transition flag after animation
  setTimeout(() => {
    isTransitioning = false;
  }, 300);
}

function handleSlideChange(direction) {
  if (isTransitioning) return;
  isTransitioning = true;
  
  if (direction === 'next') {
    currentSlide = (currentSlide + 1) % slides.length;
  } else {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }
  
  updateCarousel();
}

function handleDotClick(e) {
  const clickedDot = e.target.closest('.dot');
  if (!clickedDot || isTransitioning) return;
  
  isTransitioning = true;
  currentSlide = dots.indexOf(clickedDot);
  updateCarousel();
}

function handleReadMore(e) {
  e.preventDefault();
  const modalId = e.target.getAttribute('data-modal');
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
}

// Event Listeners
track.addEventListener('touchstart', handleTouchStart);
track.addEventListener('touchmove', handleTouchMove);
track.addEventListener('touchend', handleTouchEnd);

nextButton.addEventListener('click', () => handleSlideChange('next'));
prevButton.addEventListener('click', () => handleSlideChange('prev'));
dotsNav.addEventListener('click', handleDotClick);

readMoreLinks.forEach(link => {
  link.addEventListener('click', handleReadMore);
});

closeModals.forEach(closeBtn => {
  closeBtn.addEventListener('click', closeModal);
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('research-modal')) {
    closeModal();
  }
});

// Auto-advance carousel
let autoAdvance = setInterval(() => handleSlideChange('next'), 5000);

// Pause auto-advance on user interaction
track.addEventListener('mouseenter', () => clearInterval(autoAdvance));
track.addEventListener('mouseleave', () => {
  autoAdvance = setInterval(() => handleSlideChange('next'), 5000);
});
