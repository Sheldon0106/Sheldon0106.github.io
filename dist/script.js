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

const copyButton = document.querySelector(".copy-email");
if (copyButton && navigator.clipboard && window.isSecureContext) {
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
