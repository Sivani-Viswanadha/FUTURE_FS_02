document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [stats, leadsRes] = await Promise.all([API.stats(), API.listLeads({ limit: 5 })]);
    document.getElementById("statTotal").textContent = stats.total ?? 0;
    document.getElementById("statNew").textContent = stats.newThisWeek ?? 0;
    document.getElementById("statQualified").textContent = stats.qualified ?? 0;
    document.getElementById("statValue").textContent = "$" + (stats.pipelineValue ?? 0).toLocaleString();

    const palette = ["#4f46e5","#22d3ee","#f59e0b","#10b981","#ef4444","#a855f7"];
    const statusData = Object.entries(stats.byStatus || {}).map(([label, value], i) => ({ label, value, color: palette[i % palette.length] }));
    const sourceData = Object.entries(stats.bySource || {}).map(([label, value], i) => ({ label, value, color: palette[(i+2) % palette.length] }));
    Charts.donut(document.getElementById("statusChart"), statusData.length ? statusData : [{label:"No data", value:1, color:"#cbd5e1"}]);
    Charts.bar(document.getElementById("sourceChart"), sourceData.length ? sourceData : [{label:"—", value:0, color:"#cbd5e1"}]);

    const tbody = document.getElementById("recentLeads");
    const leads = leadsRes.leads || leadsRes.data || [];
    tbody.innerHTML = leads.slice(0, 5).map(l => `
      <tr>
        <td>${escapeHtml(l.firstName + " " + l.lastName)}</td>
        <td>${escapeHtml(l.company || "—")}</td>
        <td>${badgeFor(l.status)}</td>
        <td>${escapeHtml(l.source || "—")}</td>
        <td>${fmtDate(l.followUpDate)}</td>
      </tr>`).join("") || `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">No leads yet</td></tr>`;
  } catch (e) {
    console.error(e);
  }
});
