const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const header = document.querySelector("header");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navAnchors.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

function setActiveLink(id) {
  navAnchors.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

if (sections.length && navAnchors.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.2,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
});

// Typing Effect
// Reads the text already present in the HTML (so crawlers and no-JS users
// see it), then clears it and types it out for the animation.
const typingText = document.querySelector(".typing-text");
let textToType = typingText ? typingText.textContent.trim() : "";
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!typingText) {
    return;
  }

  if (!isDeleting && charIndex < textToType.length) {
    typingText.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 85);
  } else if (!isDeleting && charIndex === textToType.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1400);
  } else if (isDeleting && charIndex > 0) {
    typingText.textContent = textToType.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeWriter, 50);
  } else {
    isDeleting = false;
    setTimeout(typeWriter, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingText && textToType) {
    typingText.textContent = "";
    setTimeout(typeWriter, 500);
  }
});
