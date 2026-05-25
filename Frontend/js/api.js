const API = (() => {
  const { API_BASE, TOKEN_KEY } = window.CRM_CONFIG;

  const token = () => localStorage.getItem(TOKEN_KEY);

  async function request(path, opts = {}) {
    try {
      const res = await fetch(API_BASE + path, {
        ...opts,
        headers: {
          "Content-Type": "application/json",
          ...(token()
            ? { Authorization: "Bearer " + token() }
            : {}),
          ...(opts.headers || {}),
        },
      });

      // Prevent instant logout during demo/testing
      if (res.status === 401) {
        console.warn("Unauthorized request:", path);

        return {
          message: "Unauthorized",
          leads: [],
          stats: {},
          user: null,
        };
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }

  return {
    // LOGIN
    login: (email, password) =>
      request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    // LEADS
    listLeads: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return request("/leads" + (q ? "?" + q : ""));
    },

    getLead: (id) => request("/leads/" + id),

    createLead: (body) =>
      request("/leads", {
        method: "POST",
        body: JSON.stringify(body),
      }),

    updateLead: (id, body) =>
      request("/leads/" + id, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    deleteLead: (id) =>
      request("/leads/" + id, {
        method: "DELETE",
      }),

    // DASHBOARD STATS
    stats: () => request("/leads/stats/summary"),
  };
})();