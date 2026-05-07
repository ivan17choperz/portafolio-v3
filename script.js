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
const typingText = document.querySelector(".typing-text");
const langToggle = document.querySelector("#langToggle");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.kicker": "Full Stack Engineer",
    "hero.typing": "Welcome, I'm Ivan Perez",
    "hero.lead":
      "Full Stack Engineer with 5+ years building scalable web systems across healthcare, fintech, and education platforms, with strong backend leadership in Spring Boot, NestJS, and Laravel.",
    "hero.ctaWork": "View My Work",
    "hero.ctaContact": "Contact Me",
    "about.title": "About Me",
    "about.p1":
      "I am Ivan Perez, a Full Stack Engineer specialized in backend architecture and high-performance APIs. I have designed secure systems handling 2M+ daily transactions with 99.9% uptime.",
    "about.p2":
      "My core stack includes Spring Boot, NestJS, Laravel, Angular, and PostgreSQL. I focus on microservices, database optimization, Docker-based environments, and CI/CD automation to deliver reliable, scalable products.",
    "about.p3":
      "I enjoy solving complex architecture challenges, mentoring junior developers, and building clean, maintainable systems aligned with business goals.",
    "projects.title": "Featured Projects",
    "projects.p1Title": "Enterprise Healthcare API Platform",
    "projects.p1Desc":
      "Secure REST API architecture processing 2M+ daily transactions with JWT, OAuth 2.0, RBAC, Redis caching, and 99.9% uptime.",
    "projects.p2Title": "Evalua-GPS Medical Survey System",
    "projects.p2Desc":
      "Full-stack medical survey platform handling 500+ concurrent responses with dynamic questionnaires, real-time validation, and automated PDF reporting.",
    "projects.p3Title": "VEMAX Streaming Frontend",
    "projects.p3Desc":
      "High-performance Angular frontend with NgRx and RxJS, optimized video experience, and a 30% UI latency reduction using lazy loading and code splitting.",
    "projects.view": "View Project",
    "contact.title": "Get In Touch",
    "contact.desc":
      "Available for remote contract and full-time opportunities in Full Stack Development, Backend Engineering, and Microservices Architecture.",
    "contact.location": "Bogota, Colombia (UTC-5)",
    "form.name": "Name",
    "form.email": "Email",
    "form.subject": "Subject",
    "form.message": "Message",
    "form.send": "Send Message",
    "footer.copy": "© 2026 Ivan Perez. All rights reserved.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mi",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "hero.kicker": "Ingeniero Full Stack",
    "hero.typing": "Hola, soy Ivan Perez",
    "hero.lead":
      "Ingeniero Full Stack con mas de 5 anos construyendo sistemas web escalables para salud, fintech y educacion, con liderazgo backend en Spring Boot, NestJS y Laravel.",
    "hero.ctaWork": "Ver Mi Trabajo",
    "hero.ctaContact": "Contactarme",
    "about.title": "Sobre Mi",
    "about.p1":
      "Soy Ivan Perez, Ingeniero Full Stack especializado en arquitectura backend y APIs de alto rendimiento. He disenado sistemas seguros que manejan mas de 2M de transacciones diarias con 99.9% de disponibilidad.",
    "about.p2":
      "Mi stack principal incluye Spring Boot, NestJS, Laravel, Angular y PostgreSQL. Me enfoco en microservicios, optimizacion de bases de datos, entornos con Docker y automatizacion CI/CD para entregar productos confiables y escalables.",
    "about.p3":
      "Disfruto resolver retos complejos de arquitectura, mentorizar desarrolladores junior y construir sistemas limpios y mantenibles alineados con los objetivos del negocio.",
    "projects.title": "Proyectos Destacados",
    "projects.p1Title": "Plataforma API Empresarial de Salud",
    "projects.p1Desc":
      "Arquitectura API REST segura que procesa mas de 2M de transacciones diarias con JWT, OAuth 2.0, RBAC, cache con Redis y 99.9% de disponibilidad.",
    "projects.p2Title": "Sistema Medico de Encuestas Evalua-GPS",
    "projects.p2Desc":
      "Plataforma full stack de encuestas medicas que maneja mas de 500 respuestas concurrentes con cuestionarios dinamicos, validacion en tiempo real y reportes PDF automatizados.",
    "projects.p3Title": "Frontend de Streaming VEMAX",
    "projects.p3Desc":
      "Frontend Angular de alto rendimiento con NgRx y RxJS, experiencia de video optimizada y reduccion del 30% en latencia de interfaz mediante lazy loading y code splitting.",
    "projects.view": "Ver Proyecto",
    "contact.title": "Hablemos",
    "contact.desc":
      "Disponible para oportunidades remotas por contrato y tiempo completo en Desarrollo Full Stack, Ingenieria Backend y Arquitectura de Microservicios.",
    "contact.location": "Bogota, Colombia (UTC-5)",
    "form.name": "Nombre",
    "form.email": "Correo",
    "form.subject": "Asunto",
    "form.message": "Mensaje",
    "form.send": "Enviar Mensaje",
    "footer.copy": "© 2026 Ivan Perez. Todos los derechos reservados.",
  },
};

let currentLang = localStorage.getItem("lang") || "en";
let textToType = translations[currentLang]["hero.typing"];
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

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  i18nNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = translations[lang][key];
    if (value) {
      node.textContent = value;
    }
  });

  textToType = translations[lang]["hero.typing"];
  charIndex = 0;
  isDeleting = false;
  if (typingText) {
    typingText.textContent = "";
  }
  if (langToggle) {
    langToggle.textContent = lang === "en" ? "ES" : "EN";
    langToggle.setAttribute("aria-label", lang === "en" ? "Switch to Spanish" : "Switch to English");
  }
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  if (typingText) {
    setTimeout(typeWriter, 500);
  }
  langToggle?.addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "es" : "en");
  });
});
