# Mini CRM — Backend

Node.js + Express + MongoDB + JWT.

## Setup

```bash
cp .env.example .env
npm install
npm run seed     # creates admin + 10 sample leads
npm run dev      # http://localhost:5000
```

Default admin (from `.env`): `admin@crm.io` / `admin123`.

## API

All `/api/leads/*` routes require `Authorization: Bearer <token>`.

### Auth
- `POST /api/auth/login` → `{ email, password }` → `{ token, user }`
- `POST /api/auth/register` → bootstrap an admin
- `GET  /api/auth/me`

### Leads
- `GET    /api/leads?q=&status=&source=&priority=&page=&limit=&sort=`
- `POST   /api/leads`
- `GET    /api/leads/:id`
- `PUT    /api/leads/:id`
- `DELETE /api/leads/:id`
- `GET    /api/leads/stats/summary`

## Test with curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.io","password":"admin123"}'

# List leads
curl http://localhost:5000/api/leads -H "Authorization: Bearer <TOKEN>"

# Create a lead
curl -X POST http://localhost:5000/api/leads \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@x.io","status":"New","source":"Website"}'
```

## Folder Structure

```
backend/
├── config/db.js
├── controllers/{authController,leadController}.js
├── middleware/{authMiddleware,errorMiddleware,validate}.js
├── models/{User,Lead}.js
├── routes/{authRoutes,leadRoutes}.js
├── utils/seed.js
├── server.js
├── .env.example
└── postman_collection.json
```
