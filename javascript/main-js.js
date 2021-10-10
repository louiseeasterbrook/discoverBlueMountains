// Attractions tab section
const tabsCont = document.querySelector(".att-tabs-container");
const tabs = document.querySelectorAll(".att-tab");
const content = document.querySelectorAll(".att-info");
const openingBtn = document.querySelector(".overlay");
const loading = document.querySelector(".loading");
const video = document.querySelector("#open-vid");

//turn off opening video load when page has loaded
video.addEventListener("loadeddata", hideLoad);

tabsCont.addEventListener("click", function (e) {
  clicked = e.target.closest(".att-tab");

  //if not on button it return null
  if (!clicked) return;

  //remove active class from all elements
  content.forEach((c) => c.classList.remove("active-content"));
  tabs.forEach((t) => t.classList.remove("active-tab"));

  //add active class to clicked elements
  clicked.classList.add("active-tab");
  document
    .querySelector(`.att-${clicked.dataset.tab}`)
    .classList.add("active-content");
});

//____________________________________________________________________________________________

//FUNCTION TRIGGERED ON PAGE LOAD
function hideLoad() {
  //remove loading div
  loading.classList.add("hide-load");
  //add animation to opening button
  setTimeout(() => {
    openingBtn.classList.add("overlay-animation");
  }, 200);
}

// ____________________________________________________________________________________________
//SLIDE SHOW

const dotCont = document.querySelector(".dotHolder");
const slideShowImage = document.querySelectorAll(".slideShowImage");
let current = 0;
let slideShowTimer;

//create dots
for (i = 0; i < slideShowImage.length; i++) {
  const newDot = `<div class="photoDot" id="photoDot-${i}"></div>`;
  dotCont.insertAdjacentHTML("beforeEnd", newDot);
}
//select dots
const dot = document.querySelectorAll(".photoDot");
// //make the first dot the active dot
document.getElementById(`photoDot-0`).classList.add("activeDot");
//When photo dots are clicked
dotCont.addEventListener("click", dotClicked);

//call slideshow to start
slideShow();

//slideshow Timer
function slideShow() {
  slideShowTimer = setInterval(function () {
    //change current to following image index
    current = current != slideShowImage.length - 1 ? current + 1 : 0;
    changeImage(current);
  }, 5000);
}

//change image function
function changeImage(current) {
  //make all images disapear
  for (let i = 0; i < slideShowImage.length; i++) {
    slideShowImage[i].style.opacity = 0;
  }
  //show current imahe
  slideShowImage[current].style.opacity = 1;
  //make all dots white
  dot.forEach((d) => d.classList.remove("activeDot"));
  //make current dot green
  document.getElementById(`photoDot-${current}`).classList.add("activeDot");
}

//triggered by dot click
function dotClicked(e) {
  //extract id from dot
  dotNum = e.target.id;

  //if no dot was clicked exit
  if (!dotNum) return;

  //get photo number
  photoNum = dotNum.slice(-1);
  current = Number(photoNum);

  //change image
  changeImage(current);

  // restart the intervaltimer
  clearInterval(slideShowTimer);
  slideShow();
}

//'holdPhotos' sizing is set by image size
//reset everytime window is re-sized
window.addEventListener(
  "resize",
  function (event) {
    const ssImage = document.querySelector(".slideShowImage");
    const hold = document.querySelector(".holdPhotos");
    var objHeight = ssImage.height;
    hold.style.height = objHeight + "px";
  },
  true
);

// ____________________________________________________________________________________________

// NAVIGATION MENU
const burger = document.querySelector(".burger");
const background = document.querySelector(".nav-backdrop");
const links = document.querySelector(".nav-links");
const oneLink = document.querySelectorAll("top-link");

burger.addEventListener("click", function () {
  //toggle between show and hide of naviagtion menu
  background.classList.toggle("show-nav-fade");
  links.classList.toggle("show-nav-links");
});

//_____________________________________________________________

//AUTOMIC SCROLL TRIGGERED BY OPENING BUTTON

const welcomeSect = document.getElementById("welcomeid");

openingBtn.addEventListener("click", function (e) {
  const welcomePos = welcomeSect.getBoundingClientRect();

  //window scroll
  window.scrollTo({
    left: welcomePos.left,
    top: welcomePos.top,
    behavior: "smooth",
  });
});

//______________________________________________________________
//FADE IN ON SCROLL

//ELEMENT
const allSections = document.querySelectorAll(".section");

//FUNCTION
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //if section is intersection the 'section-hide' class with be removed and a transition class will be added
  entry.target.classList.remove("section-hide");
  entry.target.classList.add("slide-in");
  observer.unobserve(entry.target);
};

//OBSERVER
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.01,
});

//LINK
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //adds a class to hide all sections
  section.classList.add("section-hide");
});

//________________________________________________________________________________
//MAP

var map = L.map("map").setView([-33.6809424, 150.3375979], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//katoomba
L.marker([-33.712109, 150.310754]).addTo(map).bindPopup("Katoomba");
//blackheath
L.marker([-33.6311, 150.2911]).addTo(map).bindPopup("Blackheath");
//Leura
L.marker([-33.711857, 150.330947]).addTo(map).bindPopup("Leura");
//wentwroth falls
L.marker([-33.709983, 150.375719]).addTo(map).bindPopup("Wentworth Falls");
