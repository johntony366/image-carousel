import "./template.html";
import "./styles.css";

const track = document.querySelector(".carousel__track");
const prevButton = document.querySelector(".carousel__button--left");
const nextButton = document.querySelector(".carousel__button--right");
const nav = document.querySelector(".carousel__nav");

const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const slideWidth = slides[0].getBoundingClientRect().width;

const navDots = Array.from(nav.querySelectorAll(".carousel__indicator"));
const slideCount = slides.length;

function setSlidePosition(slide, index) {
  slide.style.left = `${index * slideWidth}px`;
}

slides.forEach(setSlidePosition);

function moveToSlide(
  currentSlide,
  targetSlide,
  currentIndicator,
  targetIndicator
) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;

  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  currentIndicator.classList.remove("current-slide");
  targetIndicator.classList.add("current-slide");
}

prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const slideIndex = slides.findIndex((slide) => slide === currentSlide);
  const prevSlideIndex =
    (((slideIndex - 1) % slideCount) + slideCount) % slideCount;
  const prevSlide = slides[prevSlideIndex];

  const currentIndicator = navDots[slideIndex];
  const prevIndicator = navDots[prevSlideIndex];

  moveToSlide(currentSlide, prevSlide, currentIndicator, prevIndicator);
});

nextButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const slideIndex = slides.findIndex((slide) => slide === currentSlide);
  const nextSlide = slides[(slideIndex + 1) % slideCount];

  const currentIndicator = navDots[slideIndex];
  const nextIndicator = navDots[(slideIndex + 1) % slideCount];

  moveToSlide(currentSlide, nextSlide, currentIndicator, nextIndicator);
});

nav.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const slideIndex = slides.findIndex((slide) => slide === currentSlide);
  const targetSlideIndex = navDots.findIndex((navDot) => navDot === e.target);

  const targetSlide = slides[targetSlideIndex];
  const currentIndicator = navDots[slideIndex];
  const targetIndicator = navDots[targetSlideIndex];

  moveToSlide(currentSlide, targetSlide, currentIndicator, targetIndicator);
});
