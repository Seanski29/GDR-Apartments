const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeNav() {
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function openLightbox(button) {
  const image = button.querySelector("img");
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = image ? image.alt : "GDR Apartments photo";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeNav();
  }
});

document.querySelectorAll("[data-gallery] button").forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
    if (!lightbox.hidden) {
      closeLightbox();
    }
  }
});
