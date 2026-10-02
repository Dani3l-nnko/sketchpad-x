const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

try {
  const savedTheme = localStorage.getItem("quiet-signal-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
} catch {
  root.dataset.theme = "dark";
}

function syncThemeControl() {
  if (!themeToggle) return;
  const isLight = root.dataset.theme === "light";
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  themeToggle.setAttribute("title", `Switch to ${isLight ? "dark" : "light"} theme`);
}

syncThemeControl();

themeToggle?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  syncThemeControl();
  try {
    localStorage.setItem("quiet-signal-theme", root.dataset.theme);
  } catch {}
});

const signalCopy = {
  core: "Core router — illustrative link steady.",
  cloud: "Cloud edge — example route protected.",
  security: "Policy check — sample state nominal.",
  monitor: "Signal hub — illustrative metrics collected.",
  host: "Virtual host — demo node responding.",
};

const signalOutput = document.querySelector("[data-signal-output]");
const signalNodes = document.querySelectorAll("[data-signal]");

signalNodes.forEach((node) => {
  node.addEventListener("click", () => {
    signalNodes.forEach((item) => item.setAttribute("aria-pressed", String(item === node)));
    if (signalOutput) signalOutput.textContent = signalCopy[node.dataset.signal] ?? "Illustrative sample node.";
  });
});
