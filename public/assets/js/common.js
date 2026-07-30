/*================================= Sticky Header Starts =================================*/

window.history.scrollRestoration = "manual";

/* ======================================= */
var position = 0;
var delta = 5;
var hh = $("header").outerHeight();

$(window).on("scroll", function () {
  var st = $(this).scrollTop() + 50;

  // Remove scroll-up when at top
  if (st <= 0) {
    $("header").removeClass("scroll-up scroll-down");
    position = st;
    return;
  }

  if (Math.abs(position - st) <= delta) return;

  if (st > position && st > hh) {
    // Scrolling Down
    $("header").removeClass("scroll-down").addClass("scroll-up");
  } else {
    // Scrolling Up
    /*  $("header").removeClass("scroll-up").addClass("scroll-down"); */
  }

  position = st;
});

/* Sticky Header Ends */

$("#header").load("header.html", function () {
  /* MOBILE MENU */

  /* MOBILE MENU NEW */

  // Add submenu hide bar
  var nav = $(".mobileNav");
  var menu = $(".menu");
  var menuContainer = $(".menu-container");
  var subMenu = $(".submenu");
  var toggle = $(".toggleMenu");
  var subToggle = $(".has-children a");
  var back = '<div class="hide-submenu"></div>';
  var subHide = $(back);
  var header = $(".main-header");

  // Toggle menu
  /* $(document).on("click", toggle, function () {}); */

  toggle.on("click", function () {
    //alert("click");
    toggle.toggleClass("close");
    nav.toggleClass("is-visible");
    header.toggleClass("bg-blk");

    if (menu.hasClass("visually-hidden")) {
      menu.toggleClass("visually-hidden is-visible");
    } else {
      menu.removeClass("is-visible");
      // Wait for CSS animation
      setTimeout(function () {
        nav.removeClass("view-submenu");
        menu.addClass("visually-hidden");
      }, 200);
    }
  });

  // Add submenu hide bar
  subHide.prependTo(subMenu);
  var subHideToggle = $(".hide-submenu");

  // Show submenu
  subToggle.on("click", function () {
    nav.addClass("view-submenu");
    // Hide all the submenus...
    subMenu.hide();
    // ...except for the one being called
    $(this).parents("li").find(".submenu").show();
  });
  // Hide submenu
  subHideToggle.on("click", function () {
    nav.removeClass("view-submenu");
  });
});

// Load Footer
$("#footer").load("footer.html");

// ── Logo → scroll to top ───────────────────────────────────────────────────
$(document).on("click", ".grLogo", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);

  // Also close mobile menu if open
  $(".toggleMenu").removeClass("close");
  $(".mobileNav").removeClass("is-visible");
  $(".main-header").removeClass("bg-blk");
  $(".menu").removeClass("is-visible").addClass("visually-hidden");
});
// ──────────────────────────────────────────────────────────────────────────

// ── Smooth scroll to sections (event delegation) ──────────────────────────
// $(document).on() catches clicks on anchors injected later by $.load()
// in both header.html and footer.html.
$(document).on("click", 'a[href^="#"]', function (e) {
  var href = $(this).attr("href");

  // Ignore bare "#" links (e.g. social media placeholders)
  if (!href || href === "#") return;

  var target = $(href);
  if (!target.length) return;

  e.preventDefault();

  // Header height + 20 px breathing room so the section title isn't flush
  // with the bottom edge of the sticky header.
  var EXTRA_GAP = 20;
  var headerHeight = $("header").outerHeight() || 0;

  $("html, body").animate(
    {
      scrollTop: target.offset().top - headerHeight - EXTRA_GAP,
    },
    600,
  );

  // Close mobile menu after a nav link is clicked
  $(".toggleMenu").removeClass("close");
  $(".mobileNav").removeClass("is-visible");
  $(".main-header").removeClass("bg-blk");
  $(".menu").removeClass("is-visible").addClass("visually-hidden");
});
// ──────────────────────────────────────────────────────────────────────────

/* --------------------------------------- */
/* Video Slider */
// Swiper
var swiper = new Swiper(".myVideo", {
  //loop: true,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    800: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    360: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1.3,
      spaceBetween: 10,
    },
  },
  /* centeredSlides: true, */

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ================= VIDEO CONTROLS =================

document.querySelectorAll(".vid-card").forEach((card) => {
  const video = card.querySelector("video");

  if (!video) return;

  const controlBtns = card.querySelectorAll(".video-interaction__control");

  // const soundBtn = controlBtns[0];
  const playBtn = controlBtns[1];

  const playIcon = card.querySelector(".icon-play");
  const pauseIcon = card.querySelector(".icon-pause");

  /* const muteIcon = card.querySelector(".icon-mute");
  const unmuteIcon = card.querySelector(".icon-unmute"); */

  // ---------------- INITIAL STATE ----------------

  video.pause();
  video.currentTime = 0;
  // video.muted = true;

  if (playIcon) playIcon.classList.remove("hidden");
  if (pauseIcon) pauseIcon.classList.add("hidden");

  //soundBtn.classList.add("hidden");

  /* muteIcon.classList.remove("hidden");
  unmuteIcon.classList.add("hidden"); */

  // ---------------- HOVER PLAY ----------------

  card.addEventListener("mouseenter", () => {
    // Pause all other videos
    document.querySelectorAll(".vid-card").forEach((otherCard) => {
      if (otherCard === card) return;

      const otherVideo = otherCard.querySelector("video");
      if (!otherVideo) return;

      otherVideo.pause();
      otherVideo.currentTime = 0;
      //  otherVideo.muted = true;

      const otherPlayIcon = otherCard.querySelector(".icon-play");
      const otherPauseIcon = otherCard.querySelector(".icon-pause");

      if (otherPlayIcon) otherPlayIcon.classList.remove("hidden");
      if (otherPauseIcon) otherPauseIcon.classList.add("hidden");

      const otherBtns = otherCard.querySelectorAll(
        ".video-interaction__control",
      );
      if (otherBtns.length > 0) {
        otherBtns[0].classList.add("hidden");
      }

      /* otherCard.querySelector(".icon-mute").classList.remove("hidden");
      otherCard.querySelector(".icon-unmute").classList.add("hidden"); */
    });

    video.play();

    if (playIcon) playIcon.classList.add("hidden");
    if (pauseIcon) pauseIcon.classList.remove("hidden");

    //soundBtn.classList.remove("hidden");

    /* if (video.muted) {
      muteIcon.classList.remove("hidden");
      unmuteIcon.classList.add("hidden");
    } else {
      muteIcon.classList.add("hidden");
      unmuteIcon.classList.remove("hidden");
    } */
  });

  // ---------------- MOUSE LEAVE ----------------

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
    // video.muted = true;

    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");

    // soundBtn.classList.add("hidden");

    /* muteIcon.classList.remove("hidden");
    unmuteIcon.classList.add("hidden"); */
  });

  // ---------------- PLAY / PAUSE ----------------

  if (playBtn) {
    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      if (video.paused) {
        video.play();

        if (playIcon) playIcon.classList.add("hidden");
        if (pauseIcon) pauseIcon.classList.remove("hidden");

        //  soundBtn.classList.remove("hidden");
      } else {
        video.pause();

        if (playIcon) playIcon.classList.remove("hidden");
        if (pauseIcon) pauseIcon.classList.add("hidden");
      }
    });
  }

  // ---------------- MUTE / UNMUTE ----------------

  /* soundBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    video.muted = !video.muted;

   /*  if (video.muted) {
      muteIcon.classList.remove("hidden");
      unmuteIcon.classList.add("hidden");
    } else {
      muteIcon.classList.add("hidden");
      unmuteIcon.classList.remove("hidden");
    }  
  }); */
});

/*  */

// =========================================== Top Slider (Left -> Right) ===========================================
const swiper1 = new Swiper(".myGiftsCards1", {
  loop: true,
  speed: 5000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true, // Left -> Right
  },

  breakpoints: {
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    800: {
      slidesPerView: 3.8,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    360: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
  },
});

// Bottom Slider (Right -> Left)
const swiper2 = new Swiper(".myGiftsCards2", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  speed: 5000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: false, // Right -> Left
  },
  breakpoints: {
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    800: {
      slidesPerView: 3.8,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    360: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
  },
});
/* ========================================================================= */

/* ========================================================================= */
// NEW WINNER SLIDER WITH FIXED STOP ON HOVER
// =========================================================================
var swiper = new Swiper(".myWin", {
  slidesPerView: 1.2,
  spaceBetween: 0,
  speed: 800,
  centeredSlides: true,

  navigation: {
    nextEl: ".deck-next",
    prevEl: ".deck-prev",
  },
});

AOS.init({
  duration: 1000,
  /*  easing: "ease-out-cubic",
  once: true,*/
  offset: 80,
});
