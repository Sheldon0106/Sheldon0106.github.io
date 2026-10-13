"use strict";
document.documentElement.classList.add("js");

// All research content and resource links remain available without JavaScript.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector("span").textContent = "+";
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector("span").textContent = open ? "−" : "+";
  navigation.classList.toggle("is-open", open);
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

const filters = document.querySelector(".publication-filters");
const publications = [...document.querySelectorAll(".publication")];
filters.hidden = false;
filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  const kind = button.dataset.filter;
  filters.querySelectorAll("button").forEach(item => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  let count = 0;
  publications.forEach(publication => {
    publication.hidden = kind !== "all" && publication.dataset.kind !== kind;
    if (!publication.hidden) count++;
  });
  document.querySelector("#filter-status").textContent = `${count} ${count === 1 ? "work" : "works"} shown.`;
});

const copyButton = document.querySelector(".copy-email");
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("huan2814@umn.edu");
      copyButton.textContent = "Copied!";
      status.textContent = "Email address copied to clipboard.";
      window.setTimeout(() => { copyButton.textContent = "Copy email"; }, 2500);
    } catch {
      status.classList.remove("sr-only");
      status.textContent = "Please select and copy huan2814@umn.edu, or use the email link.";
    }
  });
}

const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const trackedSections = sectionLinks.map(link => document.querySelector(link.hash));
let scrollQueued = false;
function updateNavigation() {
  let current = trackedSections[0];
  for (const section of trackedSections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  sectionLinks.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
window.addEventListener("scroll", () => {
  if (!scrollQueued) {
    scrollQueued = true;
    window.requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
updateNavigation();
