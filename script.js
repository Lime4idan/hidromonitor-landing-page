const root = document.documentElement;
root.classList.add("has-js");

const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const hero = document.querySelector(".hero");
const heroMedia = document.querySelector(".hero-media");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const closeMenu = () => {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
};

menuToggle?.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

addEventListener(
  "scroll",
  () => header?.classList.toggle("is-fixed", scrollY > 80),
  { passive: true },
);

if (hero && heroMedia && !reducedMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroMedia.style.transform = `scale(1.025) translate3d(${x * -9}px, ${y * -7}px, 0)`;
  });

  hero.addEventListener("pointerleave", () => {
    heroMedia.style.transform = "scale(1.01)";
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8%" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    if (formStatus) formStatus.textContent = "Preencha os três campos para continuar.";
    return;
  }

  if (formStatus) {
    formStatus.textContent =
      "Formulário demonstrativo preenchido. A integração com o canal comercial será feita na publicação.";
  }
});
