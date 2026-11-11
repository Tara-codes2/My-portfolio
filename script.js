const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const root = document.documentElement;

function setTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const projects = [
  {
    name: "Project One",
    description: "A short description of this project goes here. Replace it with the little story behind the work.",
    languages: "HTML, CSS, JavaScript",
    tools: "Figma, VS Code"
  },
  {
    name: "Project Two",
    description: "A short description of this project goes here. Add the problem you solved and what made it special.",
    languages: "JavaScript, HTML, CSS",
    tools: "Figma, GitHub"
  },
  {
    name: "Project Three",
    description: "A short description of this project goes here. Share a detail you are especially proud of.",
    languages: "Python, JavaScript",
    tools: "VS Code, Git"
  }
];

const scrapbookDialog = document.querySelector(".scrapbook-dialog");
const closeDialogButton = document.querySelector(".dialog-close");
const askLink = document.querySelector(".scrapbook-ask");

document.querySelectorAll(".project-heart").forEach((heart) => {
  heart.addEventListener("click", () => {
    const project = projects[Number(heart.dataset.project)];
    scrapbookDialog.querySelector(".pixel-heading").textContent = project.name;
    scrapbookDialog.querySelector(".scrapbook-description").textContent = project.description;
    scrapbookDialog.querySelector(".scrapbook-languages").textContent = project.languages;
    scrapbookDialog.querySelector(".scrapbook-tools").textContent = project.tools;
    askLink.href = `mailto:hello@example.com?subject=${encodeURIComponent(`A question about ${project.name}`)}`;
    scrapbookDialog.showModal();
  });
});

closeDialogButton.addEventListener("click", () => scrapbookDialog.close());
scrapbookDialog.addEventListener("click", (event) => {
  if (event.target === scrapbookDialog) scrapbookDialog.close();
});

const envelopeButton = document.querySelector(".envelope-button");
const letterPanel = document.querySelector(".letter-panel");
const letterForm = document.querySelector(".letter-form");
const letterStatus = document.querySelector(".letter-status");

envelopeButton.addEventListener("click", () => {
  const isOpen = envelopeButton.getAttribute("aria-expanded") === "true";
  envelopeButton.setAttribute("aria-expanded", String(!isOpen));
  envelopeButton.setAttribute("aria-label", isOpen ? "Open the sealed letter addressed to Tara" : "Close the letter addressed to Tara");
  letterPanel.hidden = isOpen;
  if (!isOpen) letterPanel.querySelector("input").focus();
});

letterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!letterForm.reportValidity()) return;

  const formData = new FormData(letterForm);
  const subject = `A love letter for Tara from ${formData.get("name")}`;
  const body = `From: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`;
  letterStatus.textContent = "Your letter is ready in your email app. Press Send there to deliver it.";
  window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});