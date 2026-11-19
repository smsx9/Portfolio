const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// ---------- Projects (render first) ----------
const projects = [
  {
    image: "images/masar.jpeg",
    name: { ar: "مسار الحجاز السياحية", en: "Masar Alhijaz" },
    desc: {
      ar: "هي شركة رائدة في مجال السفر والسياحة في المملكة العربية السعودية",
      en: "It is a leading company in the travel and tourism sector in the Kingdom of Saudi Arabia",
    },
    tags: ["HTML", "CSS", "JS"],
    link: "https://masaralhijaz.sa/", // optional
  },
  {
    image: "images/sundos.png",
    name: { ar: "سندس برجر", en: "Sundos Burger" },
    desc: {
      ar: "موقع عصري يعرض قائمة الطعام واصنافه.",
      en: "A modern website showcasing the restaurant's menu and offerings.",
    },
    tags: ["HTML", "CSS", "JS"],
    link: "https://sundosburger.netlify.app/",
  },
  {
    image: "images/elzero-template3.png",
    name: { ar: "الزيرو مشروع الثالث", en: "Elzero Template3" },
    desc: {
      ar: "مشروع تطبيقي خلال رحلتي في تعلم تطوير الويب",
      en: "A partical project built during my web developmen learning jounery.",
    },
    tags: ["HTML", "CSS"],
    link: "https://elzero-template3.netlify.app/",
  },
  {
    image: "images/hattan.jpeg",
    name: {
      ar: "زاوية الهتان التجارية",
      en: "Al Hattan Trading Establishment",
    },
    desc: {
      ar: "مؤسسة الهتان التجارية، إحدى المؤسسات السعودية الرائدة في المقاولات العامة والأعمال الإنشائية والتشطيبات الحديثة.",
      en: "Al Hattan Trading Establishment, one of the leading Saudi establishments in general contracting, construction works, and modern finishing.",
    },
    tags: ["HTML", "CSS", "JS"],
    link: "https://alhattan.netlify.app/",
  },
];

const grid = document.getElementById("projectsGrid");

projects.forEach((p, i) => {
  const tag = p.link ? "a" : "div";
  const href = p.link ? `href="${p.link}" target="_blank" rel="noopener"` : "";

  const card = document.createElement("article");
  card.className = "project reveal";
  card.innerHTML = `
    <${tag} class="project-image" ${href}>
      <span>${String(i + 1).padStart(2, "0")}</span>
      <img src="${p.image}" alt="${p.name.en}" loading="lazy" />
    </${tag}>
    <div class="project-info">
      <h3 data-ar="${p.name.ar}" data-en="${p.name.en}">${p.name.ar}</h3>
      <p data-ar="${p.desc.ar}" data-en="${p.desc.en}">${p.desc.ar}</p>
      <div class="tags">
        ${p.tags.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </div>`;

  card.querySelector("img").addEventListener("error", (e) => {
    e.target.style.display = "none";
  });

  grid.appendChild(card);
});

// ---------- Language ----------
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar]").forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  langBtn.textContent = lang === "ar" ? "EN" : "AR";
  localStorage.setItem("language", lang);
}

langBtn.addEventListener("click", () => {
  const current = document.documentElement.lang;
  setLanguage(current === "ar" ? "en" : "ar");
});

// ---------- Theme ----------
function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");

  themeBtn.innerHTML =
    theme === "light"
      ? `<i class="fa-solid fa-moon"></i>`
      : `<i class="fa-solid fa-sun"></i>`;

  localStorage.setItem("theme", theme);
}

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// ---------- Mobile menu ----------
menuBtn.setAttribute("aria-expanded", "false");
menuBtn.setAttribute("aria-label", "Menu");

function toggleMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.innerHTML = open
    ? `<i class="fa-solid fa-xmark"></i>`
    : `<i class="fa-solid fa-bars"></i>`;
  document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) toggleMenu(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});

// ---------- Scroll reveal (one observer, runs after cards exist) ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Load saved preferences ----------
setLanguage(localStorage.getItem("language") || "ar");
setTheme(localStorage.getItem("theme") || "dark");
