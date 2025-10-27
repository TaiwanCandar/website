let translations = {};
let currentLang = localStorage.getItem("lang") || "zh";

async function loadLang() {
  const res = await fetch("lang.json");
  translations = await res.json();
  applyLang(currentLang);
}

function applyLang(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

function setLang(lang) {
  currentLang = lang;
  applyLang(lang);
}

document.addEventListener("DOMContentLoaded", loadLang);