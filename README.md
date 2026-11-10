# MediCore 2.0 — Connected Healthcare Operations

A full-stack portfolio demonstration built with React, TypeScript, Vite, Express, Prisma and MySQL. It has separate Patient, Doctor and Admin workspaces and an administrator-controlled clinician onboarding model.

## Included capabilities
- Premium responsive UI and role-specific workspaces.
- Patient self-registration; clinician accounts can only be created by an Admin.
- Admin clinician directory, account creation, activation/suspension and operational metrics.
- Doctor schedule and appointment status workflow; patient appointment booking and cancellation.
- Patient health timeline, clinician-authored records and prescriptions.
- Symptom-intake preparation assistant with emergency signposting and explicit non-diagnostic disclaimer.
- In-app notifications and administrative audit events.
- JWT authentication, bcrypt password hashing, role guards, request validation, Helmet, CORS and rate limiting.

## Demo accounts
All seeded demo accounts use `Demo123!`:
- Admin: `admin@medicore.demo`
- Doctor: `doctor@medicore.demo`
- Patient: `patient@medicore.demo`

## Windows setup
1. Extract the ZIP to `D:\Git-projects\MediCore`.
2. Ensure MySQL is running and create the database in MySQL Workbench:
   ```sql
   CREATE DATABASE medicore;
   ```
3. Create your local environment files:
   ```powershell
   Copy-Item .env.example .env
   Copy-Item .env.example .\apps\api\.env
   ```
4. Edit both `.env` files with the same MySQL URL and a unique JWT secret. URL-encode special characters in the database password (for example `@` becomes `%40`). Never commit `.env` files.
5. Install dependencies and update Prisma:
   ```powershell
   npm install
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```
6. Start the app:
   ```powershell
   npm run dev
   ```
7. Open `http://localhost:5173`. API health: `http://localhost:8080/api/health`.

## Important scope and integration notes
This is a portfolio/demo application, not a clinically validated or production healthcare system. Use synthetic data only. The symptom intake is deterministic guidance, not a connected LLM or medical diagnosis. Notifications are in-app only; SMTP/email delivery is not configured. The telemedicine experience is a planned integration surface, not a live video calling service. Redis caching, real-time WebSocket delivery, external AI, payment processing, secure file storage, NHS integration, and production-grade consent/retention controls require additional infrastructure and credentials before they can be claimed as operational. Do not use real patient data.

## Recommended production hardening
Use secure HttpOnly cookies, CSRF protection, refresh-token rotation, strong secret management, encryption at rest, granular clinical consent, access logging/monitoring, tested backup/restore, secure document storage, validated clinical pathways and independent security/privacy review.
