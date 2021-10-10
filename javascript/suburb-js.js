//PAGE LOADING ANIMATION
const loading = document.querySelector(".loading");
const video = document.querySelector(".open-vid");

//turn off opening video load when page has loaded
video.addEventListener("loadeddata", hideLoad);

function hideLoad() {
  //remove loading div
  loading.classList.add("hide-load");
}

//_______________________________________________________________
//MEDIA SECTION
const tabsCont = document.querySelectorAll(".media-tabs");

//checks if any of the tabs have been clicked
tabsCont.forEach((tab) =>
  tab.addEventListener("click", function (e) {
    // finds parent - to determine if in section1 or section2
    parent = this.parentNode.id;
    //finds the tab-button that has been clicked
    clicked = e.target.closest(".tab-btn-" + parent);
    //identifies qhich button has been clicked
    clickedID = e.target.id;

    // if no button is clicked - exit
    if (!clicked) {
      return;
    }

    // give variable names to all components
    let tab = document.querySelectorAll(".tab-btn-" + parent);
    let image = document.querySelector("#img-" + parent);
    let video = document.querySelector("#video-" + parent);

    // remove active class from all tabs
    tab.forEach((t) => t.classList.remove("active-tab"));

    // if the image tab is clicked
    if (clickedID == "image") {
      clicked.classList.add("active-tab");
      image.classList.remove("hide");
      video.classList.add("hide");
      //hide video controls
      video.controls = false;
      //pause video
      video.pause();
      //set video time to 0
      video.currentTime = 0;
      // if the video tab is clicked
    } else {
      clicked.classList.add("active-tab");
      video.classList.remove("hide");
      image.classList.add("hide");
      //show video controls
      video.controls = true;
    }
  })
);

//_____________________________________________________________________________
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
