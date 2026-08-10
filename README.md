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








