document.addEventListener("DOMContentLoaded", () => {
  const { TOKEN_KEY } = window.CRM_CONFIG;
  if (localStorage.getItem(TOKEN_KEY)) {
    window.location.href = "pages/dashboard.html";
    return;
  }

  const form = document.getElementById("loginForm");
  const err = document.getElementById("loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.textContent = "";
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (!email || !password) { err.textContent = "Email and password are required."; return; }
    try {
      const res = await fetch(window.CRM_CONFIG.API_BASE + "/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem(TOKEN_KEY, data.token);
      window.location.href = "pages/dashboard.html";
    } catch (e2) {
      err.textContent = e2.message;
    }
  });
});
