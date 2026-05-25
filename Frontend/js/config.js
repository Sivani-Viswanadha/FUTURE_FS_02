// Update API_BASE to point to your backend.
window.CRM_CONFIG = {
  API_BASE: "http://localhost:5000/api",
  TOKEN_KEY: "crm_token",
  THEME_KEY: "crm_theme",
};
(function applyTheme(){
  const t = localStorage.getItem(window.CRM_CONFIG.THEME_KEY) || "light";
  document.documentElement.setAttribute("data-theme", t);
})();
