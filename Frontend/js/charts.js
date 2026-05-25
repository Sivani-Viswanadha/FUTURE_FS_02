// Tiny dependency-free chart helpers (donut + bar)
const Charts = {
  donut(canvas, data) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.height;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0,0,w,h);
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const cx = w/2, cy = h/2, r = Math.min(w,h)/2 - 20, ir = r - 28;
    let start = -Math.PI/2;
    data.forEach((d) => {
      const angle = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.fillStyle = d.color;
      ctx.moveTo(cx + Math.cos(start)*ir, cy + Math.sin(start)*ir);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.arc(cx, cy, ir, start + angle, start, true);
      ctx.closePath(); ctx.fill();
      start += angle;
    });
    // legend
    ctx.font = "12px Inter, sans-serif";
    let ly = 10;
    data.forEach((d) => {
      ctx.fillStyle = d.color; ctx.fillRect(w - 130, ly, 10, 10);
      ctx.fillStyle = getComputedStyle(document.body).color;
      ctx.fillText(`${d.label} (${d.value})`, w - 114, ly + 9);
      ly += 18;
    });
  },
  bar(canvas, data) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.height;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    ctx.clearRect(0,0,w,h);
    const max = Math.max(...data.map(d => d.value), 1);
    const pad = 30, gap = 14;
    const bw = (w - pad*2 - gap*(data.length-1)) / data.length;
    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = getComputedStyle(document.body).color;
    data.forEach((d, i) => {
      const x = pad + i * (bw + gap);
      const bh = (h - 50) * (d.value / max);
      const y = h - 30 - bh;
      const grd = ctx.createLinearGradient(0, y, 0, y+bh);
      grd.addColorStop(0, d.color);
      grd.addColorStop(1, d.color + "88");
      ctx.fillStyle = grd;
      ctx.beginPath();
      const r = 6;
      ctx.moveTo(x+r,y); ctx.lineTo(x+bw-r,y); ctx.quadraticCurveTo(x+bw,y,x+bw,y+r);
      ctx.lineTo(x+bw,y+bh); ctx.lineTo(x,y+bh); ctx.lineTo(x,y+r);
      ctx.quadraticCurveTo(x,y,x+r,y); ctx.fill();
      ctx.fillStyle = getComputedStyle(document.body).color;
      ctx.textAlign = "center";
      ctx.fillText(d.label, x + bw/2, h - 12);
      ctx.fillText(d.value, x + bw/2, y - 6);
    });
  }
};
