// Attractions tab section
const tabsCont = document.querySelector(".att-tabs-container");
const tabs = document.querySelectorAll(".att-tab");
const content = document.querySelectorAll(".att-info");

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

// ____________________________________________________________________________________________

const slideShowImage = document.querySelectorAll(".slideShowImage");
const dotCont = document.querySelector(".dotHolder");
const photoCont = document.querySelector(".holdPhotos");

const photo1 = document.getElementById("ssImage1");
const photo2 = document.getElementById("ssImage2");

photoArray = [
  "images/slideshow0.jpg",
  "images/slideshow1.jpg",
  "images/slideshow2.jpg",
  "images/slideshow3.jpg",
  "images/slideshow4.jpg",
  "images/slideshow5.jpeg",
];

count = 0;

//create dots corressponding the number of photos
for (i = 0; i < photoArray.length; i++) {
  const newDot = `<div class="photoDot" id="photoDot-${i}"></div>`;
  dotCont.insertAdjacentHTML("beforeEnd", newDot);
}

const dot = document.querySelectorAll(".photoDot");
//make the first dot the active dot
document.getElementById(`photoDot-0`).classList.add("activeDot");

slideShow();
// timer to change photos
function slideShow() {
  slideShowTimer = setInterval(() => {
    count++;
    if (count == photoArray.length) {
      count = 0;
    }

    changePhoto(count);
  }, 2500);
}

//When photo dots are clicked
dotCont.addEventListener("click", function (e) {
  //extract id from dot
  dotNum = e.target.id;

  //if no dot was clicked exit
  if (!dotNum) return;

  //get photo number
  photoNum = dotNum.slice(-1);
  count = photoNum;

  changePhoto(count);

  //restart the intervaltimer
  clearInterval(slideShowTimer);
  slideShow();
});

let oneTop = true;
//change the shown photo
function changePhoto(count) {
  //dot change as photo transition completes
  setTimeout(function () {
    dot.forEach((d) => d.classList.remove("activeDot"));
    document.getElementById(`photoDot-${count}`).classList.add("activeDot");
  }, 200);

  //if photo one is on top photo two will be revealed
  if (oneTop) {
    photo2.src = photoArray[count];
    photo1.classList.remove("showPhoto");
    photo2.classList.add("showPhoto");
    //varibale indicates photo1 is not being shown
    oneTop = false;
    //if photo one is not on top photo two will be revealed
  } else {
    photo1.src = photoArray[count];
    photo2.classList.remove("showPhoto");
    photo1.classList.add("showPhoto");
    //varibale indicates photo1 is now being shown
    oneTop = true;
  }
}

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
const openingBtn = document.querySelector(".overlay");
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
  threshold: 0.05,
});

//LINK
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //adds a class to hide all sections
  section.classList.add("section-hide");
});

//________________________________________________________________________________
