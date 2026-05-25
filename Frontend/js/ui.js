// Shared UI: sidebar toggle, theme, logout, auth guard
(function () {
  const { TOKEN_KEY, THEME_KEY } = window.CRM_CONFIG;

  if (!localStorage.getItem(TOKEN_KEY)) {
    window.location.href = "../index.html";
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    menuToggle?.addEventListener("click", () => sidebar.classList.toggle("open"));

    const themeToggle = document.getElementById("themeToggle");
    themeToggle?.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "light";
      const next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "../index.html";
    });
  });
})();

function badgeFor(status) {
  const map = {
    New: "badge-new", Contacted: "badge-contacted", Qualified: "badge-qualified",
    Proposal: "badge-proposal", Won: "badge-won", Lost: "badge-lost",
  };
  return `<span class="badge ${map[status] || "badge-new"}">${status || "New"}</span>`;
}
function fmtDate(d) {
  if (!d) return "—";
  const x = new Date(d);
  return isNaN(x) ? "—" : x.toLocaleDateString();
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
