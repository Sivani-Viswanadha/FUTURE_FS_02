# Mini CRM — Frontend (vanilla HTML/CSS/JS)

No build step. Open `index.html` in a browser, or serve the folder:

```bash
# Any static server works:
npx serve frontend
# or
python3 -m http.server 8080 -d frontend
```

Update `js/config.js` if your backend isn't at `http://localhost:5000/api`.

## Structure
```
frontend/
├── index.html              # Login page
├── pages/
│   ├── dashboard.html
│   └── leads.html
├── css/
│   ├── styles.css          # tokens, buttons, inputs, badges
│   ├── auth.css
│   ├── dashboard.css       # sidebar, cards, panels, table, responsive
│   └── leads.css           # toolbar + modal
└── js/
    ├── config.js           # API_BASE, theme bootstrap
    ├── api.js              # fetch wrapper with JWT
    ├── ui.js               # sidebar, theme, logout, helpers
    ├── auth.js             # login flow
    ├── charts.js           # canvas donut + bar (no deps)
    ├── dashboard.js
    └── leads.js            # CRUD + search + filter + modal
```

## Features
- Responsive sidebar (collapses on mobile)
- Dark mode toggle (persists in localStorage)
- Dashboard stat cards + charts (status + source)
- Leads table with search, status filter, add/edit modal, delete
- JWT stored in localStorage; auto-redirect to login on 401
