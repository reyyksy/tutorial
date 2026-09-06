const tabs = document.querySelectorAll(".os-tab");
const panels = document.querySelectorAll(".os-panel");
const copyButtons = document.querySelectorAll(".copy-button");
const toolsReady = document.querySelector("#tools-ready");
const checkStatus = document.querySelector("#check-status");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedOs = tab.dataset.os;
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== selectedOs;
      panel.classList.toggle("active", !panel.hidden);
    });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const originalText = button.textContent;
      button.textContent = "Tersalin";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("copied");
      }, 1400);
    } catch {
      button.textContent = "Salin manual";
    }
  });
});

toolsReady.addEventListener("change", () => {
  checkStatus.textContent = toolsReady.checked ? "Tools siap digunakan" : "Belum dicek";
  checkStatus.classList.toggle("ready", toolsReady.checked);
});
