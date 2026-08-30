# 🇮🇳 Heritage Food Atlas

> **“Preserving not just what India eats, but why India eats it.”**

Heritage Food Atlas is a production-grade digital platform engineered to discover, document, preserve, and celebrate India’s rich gastronomic biodiversity, regional culinary canons, sacred harvest calendars, and living oral traditions.

---

## 🌟 Key Highlights & Core Features

### 🗺️ 1. Interactive India Food Map
- Explore culinary traditions across **15+ Indian States and Union Territories** categorized by geographical zones (*East, South, West, North, Northeast, Central*).
- Dynamic regional drawer displaying signature spice tempering styles, native heirloom grains, and direct links to documented dishes.

### 📜 2. Deep Archival Dish Heritage Profiles
- Authentic profiles covering **Patishapta, Pakhala Bhata, Avial, Dal Baati Churma, Ukadiche Modak, Solkadhi, Litti Chokha, Surti Undhiyu, Wazwan Rogan Josh, Ven Pongal, Assamese Khar, Bisi Bele Bath, Hyderabadi Dum Biryani**, and more.
- Comprehensive sections:
  - **Local/Regional Names** (English, Hindi, Bengali, Tamil, Malayalam, Odia, Marathi, etc.)
  - **Cultural Significance & Sacred Temple Canons**
  - **Historical Background & Epigraphy**
  - **Traditional Vessels & Cooking Techniques**
  - **Key Indigenous Ingredients**
  - **Seasonal Availability & Harvest Rites**
  - **Geographical Indication (GI Tag) Status & Registry Details**

### 🌾 3. Traditional Ingredient & Festival Explorers
- **Traditional Ingredients**: Heirloom grains (*Gobindobhog, Tulaipanji, Kodo Millet*), natural souring agents (*Kokum, Gongura*), cold-pressed oils (*Kachi Ghani Mustard Oil*), wild forest sweeteners (*Nolen Gur*), and fresh curds (*Chhena*).
- **Festival Calendar**: Harvest and ritual foodways for *Poush Sankranti / Nabanna, Onam Sadya, Pongal, Magh Bihu, Durga Puja Bhog, Chhath Puja (Thekua), Ganesh Chaturthi (Modak), and Diwali*.

### 🎙️ 4. Stories from Our Grandparents (Oral History Preservation)
- Audio narration player with dynamic audio visualizer and expandable verbatim transcripts.
- In-browser voice recorder (`navigator.mediaDevices.getUserMedia`) allowing citizens to record elder narrations directly.
- Curatorial metadata: Storyteller name, maternal/paternal generation, community lineage, and geographical village.

### 🚶 5. Heritage Culinary Trails & Tourism
- Self-guided historic walking trails (e.g. *North Kolkata Heritage Sweet Trail, Old Delhi Shahjahanabad Imperial Walk*) with sequential waypoints, coordinates, best timings, and iconic dishes.

### 👁️ 6. AI Vision Traditional Food Recognition
- Dual-tier computer vision system:
  1. Integrates with **Google Gemini Vision API** when `GEMINI_API_KEY` is provided.
  2. Built-in **Deterministic Heuristic & Texture Matcher** fallback when running offline or without credentials.
- Estimates prediction confidence, highlights key visual markers (texture, vessel, color, garnish), and connects directly to verified database records.

### 🤖 7. AI Heritage Storyteller (Grounded RAG)
- Conversational assistant powered by Retrieval-Augmented Generation over verified historical documents and database records.
- Formulated to avoid hallucinations and always cites primary archival sources.

### 🌐 8. Scalable Multilingual Localization (i18n)
- Seamless real-time switching between **English**, **हिन्दी (Hindi)**, and **বাংলা (Bengali)** with dedicated locale JSON dictionaries.

### 🛡️ 9. Contributor Workflow & Senior Curator Admin Dashboard
- **Citizen Contribution Portal**: Submit heirloom recipes, oral stories, and indigenous ingredients.
- **Admin Dashboard**: System metrics, real-time moderation queue (`PENDING` -> `APPROVED` / `REJECTED`), and RAG knowledge document management.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & Design System** | Tailwind CSS, Lucide React, Custom Rangoli & Mandala Motifs |
| **Database & ORM** | Prisma ORM, SQLite (`prisma/dev.db` by default; Postgres-ready) |
| **Authentication** | Custom JWT, bcryptjs password hashing, HTTP-only session cookies, RBAC |
| **AI & RAG** | Google Gemini API (Vision & Storyteller) + Local Semantic Vector Fallback |
| **Testing** | Vitest, Testing Library |

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x

### 2. Installation
```bash
# Clone or navigate to the project directory
cd /Users/rajarshichatterjee/Desktop/Food

# Install dependencies
npm install
```

### 3. Environment Variables Setup
Create `.env` based on `.env.example`:
```bash
cp .env.example .env
```
Default configuration in `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="heritage-food-atlas-secure-production-jwt-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Add Google Gemini API Key for live AI Vision & Storyteller
GEMINI_API_KEY=""
```

### 4. Database Setup & Seeding
```bash
# Push Prisma schema to SQLite
npm run db:push

# Seed database with authentic 15+ states dataset
npm run db:seed
```

### 5. Running the Application
```bash
# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Accounts for Immediate Testing

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Senior Curator (Admin)** | `admin@heritagefoodatlas.in` | `heritage123` | Full Admin Dashboard, Content Moderation, RAG Document CRUD |
| **Contributor** | `contributor@heritagefoodatlas.in` | `heritage123` | Submit Dishes, Stories & Ingredients for Review |
| **Explorer User** | `user@heritagefoodatlas.in` | `heritage123` | Browse, Bookmark Favorites, Post Reviews |

*(Quick 1-click login buttons are also available on the `/auth/login` page).*

---

## 🧪 Testing Suite

Run unit and integration test suites via Vitest:
```bash
npm run test
```
All test suites verify:
- ✅ Password hashing & JWT verification security.
- ✅ i18n dictionary integrity across English, Hindi, and Bengali.
- ✅ AI Vision classification & Grounded RAG Storyteller response validity.
- ✅ Dishes & State zone relational queries.

To build the production bundle:
```bash
npm run build
```

---

## 🏛️ REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | `POST` | User registration |
| `/api/auth/login` | `POST` | User authentication & JWT issuance |
| `/api/auth/me` | `GET` | Get active user session |
| `/api/auth/logout` | `POST` | Clear session cookie |
| `/api/dishes` | `GET`, `POST` | Search & filter dishes / Create verified dish |
| `/api/dishes/[slug]` | `GET` | Retrieve detailed dish heritage profile |
| `/api/ingredients` | `GET` | List indigenous ingredients |
| `/api/ingredients/[slug]` | `GET` | Detailed ingredient profile |
| `/api/festivals` | `GET` | List festivals and harvest traditions |
| `/api/festivals/[slug]` | `GET` | Detailed festival profile |
| `/api/regions/map-data` | `GET` | Geo-coordinates and state dish catalog |
| `/api/stories` | `GET`, `POST` | Oral history recordings & submission |
| `/api/trails` | `GET`, `POST` | Culinary walking routes & itinerary |
| `/api/favorites` | `GET`, `POST` | User bookmark management |
| `/api/reviews` | `POST` | Submit cultural dish reviews |
| `/api/contributions` | `GET`, `POST` | Citizen contribution pipeline |
| `/api/ai/recognize` | `POST` | AI Food Recognition Vision API |
| `/api/ai/storyteller` | `POST` | Grounded RAG conversational endpoint |
| `/api/admin/metrics` | `GET` | Curator dashboard metrics |
| `/api/admin/contributions` | `GET` | List pending citizen submissions |
| `/api/admin/contributions/[id]` | `PATCH` | Approve or reject submission |
| `/api/admin/stories/[id]` | `PATCH` | Approve or reject oral story |
| `/api/admin/knowledge-base` | `GET`, `POST` | Manage RAG grounding documents |

---

## 🚢 Production Deployment

The application is built for seamless deployment on platforms such as **Vercel, Render, Railway, or AWS**:
1. Configure environment variables in your hosting dashboard:
   - `DATABASE_URL` (PostgreSQL connection string on Supabase/Neon/Railway or SQLite volume)
   - `JWT_SECRET` (A strong random 64-character secret)
   - `GEMINI_API_KEY` (Optional Google Gemini API key)
2. Build Command: `npm run build`
3. Start Command: `npm run start`

---

## 📜 License & Cultural Preservation Notice
Built for the digital safeguarding of India's living culinary traditions under open cultural heritage principles.
