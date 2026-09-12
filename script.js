/* In-site booking overlay: BOOK links open GlossGenius in a modal iframe.
   If the embed cannot load (blocked or offline), falls back to a new tab. */

(function () {
  "use strict";

  var BOOKING_URL = "https://jordandodds.glossgenius.com/";
  var modal = document.getElementById("bookModal");
  var frame = document.getElementById("bookFrame");
  if (!modal || !frame) return;

  var closeBtn = modal.querySelector(".book-modal-close");
  var fallback = document.getElementById("bookFallback");
  var frameLoaded = false;
  var loadTimer = null;

  function openModal(e) {
    e.preventDefault();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (!frame.src) {
      frame.src = BOOKING_URL;
      loadTimer = setTimeout(function () {
        if (!frameLoaded) {
          // embed blocked or too slow — offer a direct link instead
          frame.hidden = true;
          fallback.hidden = false;
        }
      }, 4000);
    }
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  frame.addEventListener("load", function () {
    frameLoaded = true;
    if (loadTimer) clearTimeout(loadTimer);
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  var links = document.querySelectorAll("a.js-book");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", openModal);
  }
})();
