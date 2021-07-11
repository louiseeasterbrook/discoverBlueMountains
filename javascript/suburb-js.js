const ready = function () {
  const openingBtn = document.querySelector(".overlay");

  //title slide in
  openingBtn.classList.add("overlay-sub-animation");

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

  // _______________________________________________________________

  //ELEMENT
  const allSections = document.querySelectorAll(".section");

  //FUNCTION
  const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    //if section is intersection the 'section-hide' class with be removed and a transition class will be added
    entry.target.classList.remove("section-hide");
    entry.target.classList.add("slide-in");
    observer.unobserve(entry.target);
  };

  //OBSERVER
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.02,
  });

  //LINK
  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    //adds a class to hide all sections
    section.classList.add("section-hide");
  });

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
};

//trigger all javascript after HTML has loaded
window.addEventListener("load", ready);

//_____________________________________________________________
