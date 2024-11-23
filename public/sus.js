let overlay = document.querySelector('.overlay')
let overlayEndBtn = document.querySelector('.overlay-btn')
let menuHamburger = document.querySelector('.drop-icon')
let blurry = document.querySelector('.blur')
let logo = document.querySelector('.logo')
let icons = document.querySelector('.icons')

overlayEndBtn.addEventListener('click', () => {
    gsap.to(overlay , {x: '-200%'});
    document.body.style.overflow = 'auto';
    blurry.style.filter = "blur(0px)";
});

menuHamburger.addEventListener('click' , () => {
    gsap.to(overlay , {x: '-100%'});
    document.body.style.overflow = 'hidden';
    blurry.style.filter = "blur(30px)";

});

function animation() {
    gsap.from(logo, { y: "-200%", duration: 1, ease : "elastic.out" , delay: 0.5});

    gsap.from( menuHamburger , { y: "-200%", duration: 1, ease : "elastic.out" , delay: 0.5});

    gsap.from(icons , {x : "800%" , duration: 1, ease : "elastic.out" , delay: 0.5})
  }

  window.onload = animation;



let menuBtn = document.querySelector(".menu-btn");
let header = document.querySelector(".header");
let btns = document.querySelectorAll(".nav-item");
let videos = document.querySelectorAll("video");
let icon = document.querySelector(".drop-icon")
let container = document.querySelector(".drop-container")
let body = document.getElementsByTagName("body")

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    btns.forEach((item) => {
      item.classList.remove("active");
    });

    videos.forEach((video) => {
      video.classList.remove("active");
    });


    videos[i].classList.add("active");
    btn.classList.add("active");
  });
});

menuBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});
