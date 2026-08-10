# Community Infrastructure Reporting Platform (CIRP)

> A smart web and mobile platform for reporting and managing public infrastructure problems.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Team](#team)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## Project Overview

CIRP allows citizens to report infrastructure problems (road damage, water leakage, drainage issues, etc.) via a Flutter mobile app. Municipality officers review, assign, and resolve reports through a React web application. The system uses AI for image classification and duplicate detection, and PostGIS for geographic visualization.

### Key Features

| Feature | Description |
|---|---|
| Report Submission | Citizens submit reports with image, GPS, category, priority |
| AI Image Classification | Auto-suggest category from uploaded image |
| AI Duplicate Detection | Detect similar existing reports before submission |
| GIS Heat Maps | Visualize problem density on interactive maps |
| Multilingual Support | English, Amharic, Afaan Oromo, Tigrinya |
| Report Lifecycle | Submitted → AI Analysis → Verified → Assigned → In Progress → Completed → Resolved |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Django, Django REST Framework, PostgreSQL, PostGIS, JWT |
| Frontend | React, Vite, Tailwind CSS, Axios, React Router, Leaflet |
| Mobile | Flutter, Dart |
| AI/ML | Python, PyTorch, Scikit-learn, Sentence-Transformers, OpenCV |
| Infrastructure | Docker, Docker Compose, Nginx |

---

## Repository Structure

```
CIRP/
├── backend/          # Django REST API
├── frontend/         # React web application
├── mobile/           # Flutter mobile application
├── ai/               # AI/ML services (image classification + duplicate detection)
├── database/         # Schema, migrations docs, seed data
├── docs/             # SRS, architecture, API, database, AI, UI, testing docs
├── .github/          # CI/CD workflows, PR templates, issue templates
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Team

| Role | Developer | Responsibility |
|---|---|---|
| Team Leader | [Your Name] | Architecture, GitHub, Integration, Review |
| Backend Dev 1 | [Name] | Auth, Users, Reports, Categories |
| Backend Dev 2 | [Name] | Assignments, GIS, Notifications, Analytics |
| Frontend Dev 1 | [Name] | Login, Dashboard, Reports, Search |
| Frontend Dev 2 | [Name] | Verification, AI display, GIS map, Analytics |
| Mobile Dev 1 | [Name] | Auth, Home, Profile, Language |
| Mobile Dev 2 | [Name] | Report creation, Camera, GPS, Notifications |
| AI Dev 1 | [Name] | Image Classification service |
| AI Dev 2 | [Name] | Duplicate Detection service |

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Clone the repository

```bash
git clone https://github.com/YOUR_ORG/CIRP.git
cd CIRP
```

### Copy environment files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ai/.env.example ai/.env
```

### Start all services

```bash
docker-compose up --build
```

### Access

| Service | URL |
|---|---|
| Django API | http://localhost:8000/api/ |
| React App | http://localhost:5173/ |
| AI Service | http://localhost:8001/ |
| pgAdmin | http://localhost:5050/ |

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready releases only |
| `develop` | Integration branch — all PRs target this |
| `feature/*` | Individual developer feature branches |

**No direct pushes to `main` or `develop`.**

See [docs/architecture/BRANCH_STRATEGY.md](docs/architecture/BRANCH_STRATEGY.md) for the full workflow.

---

## API Documentation

See [docs/api/](docs/api/) for the full API contract.

- [Authentication](docs/api/auth.md)
- [Reports](docs/api/reports.md)
- [Assignments](docs/api/assignments.md)
- [AI Services](docs/api/ai.md)
- [GIS](docs/api/gis.md)
- [Notifications](docs/api/notifications.md)

---

## Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Pull the latest `develop`
3. Create your feature branch
4. Commit your work
5. Open a Pull Request targeting `develop`
6. Wait for code review

---

## License

University project — Software Engineering Course.
