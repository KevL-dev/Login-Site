"use strict";

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const statusEl = document.getElementById("status");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");

const themeToggle = document.getElementById("theme-toggle");

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
  setStatus("");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
  setStatus("");
});

function handleDemoSubmit(e, mode) {
  e.preventDefault();

  if (!e.target.checkValidity()) {
    e.target.reportValidity();
    return;
  }

  setStatus(
    mode === "login"
      ? "✅ Demo: Login abgeschickt."
      : "✅ Demo: Registrierung abgeschickt.",
  );
}

signinForm.addEventListener("submit", (e) => handleDemoSubmit(e, "login"));
signupForm.addEventListener("submit", (e) => handleDemoSubmit(e, "register"));

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
    themeToggle.setAttribute("aria-label", "Zu Light Mode wechseln");
  } else {
    icon.className = "fa-solid fa-moon";
    themeToggle.setAttribute("aria-label", "Zu Dark Mode wechseln");
  }
}

function initTheme() {
  if (!themeToggle) return;

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
    return;
  }

  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  applyTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

initTheme();
