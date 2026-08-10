# 🏙️ Community Infrastructure Reporting Platform (CIRP)

> **A smart web and mobile platform for reporting, managing, analyzing, and resolving community infrastructure problems.**

---

## 📌 Introduction

The **Community Infrastructure Reporting Platform (CIRP)** is a smart web and mobile-based system designed to improve how citizens report public infrastructure problems and how municipalities manage and resolve them.

Citizens can use the **Flutter mobile application** to report infrastructure problems such as road damage, water leakage, drainage problems, garbage, streetlight failures, and public facility damage. A report can include a description, photograph, category, and GPS location.

Municipality officers, contractors, and administrators use a **React-based web application** to review, verify, assign, monitor, and resolve infrastructure reports.

CIRP also integrates **Artificial Intelligence (AI)** and **Geographic Information Systems (GIS)** to make infrastructure management more intelligent and efficient.

The system includes four major smart capabilities:

* 🤖 **AI Duplicate Report Detection**
* 🖼️ **AI Image-Based Infrastructure Classification**
* 🗺️ **GIS Maps and Heat Maps**
* 🌍 **Multilingual Support: English, Amharic, Afaan Oromo, and Tigrinya**

The overall workflow is:

```text
Citizen
   ↓
Submit Report
   ↓
AI Image Classification
   ↓
AI Duplicate Detection
   ↓
Municipality Verification
   ↓
Task Assignment
   ↓
Contractor
   ↓
Maintenance
   ↓
Completion
   ↓
Officer Confirmation
   ↓
Resolved
   ↓
Citizen Notification
```

---

# 🚨 Statement of the Problem

Public infrastructure problems such as potholes, damaged roads, water leakage, blocked drainage systems, garbage accumulation, and broken streetlights directly affect community safety and quality of life.

Traditional infrastructure reporting methods often depend on:

* Physical visits to municipal offices
* Telephone calls
* Paper-based complaints
* Unstructured social media reports
* Manual record keeping

These approaches create several problems:

1. **Slow reporting and response**
2. **Lack of report tracking**
3. **Duplicate complaints**
4. **Poor communication between citizens and authorities**
5. **Difficulty identifying the correct infrastructure category**
6. **Limited geographic analysis**
7. **Language barriers**
8. **Difficulty prioritizing infrastructure problems**
9. **Limited data for decision-making**
10. **Lack of transparency in the maintenance process**

CIRP addresses these problems by providing a centralized digital platform that connects citizens, municipality officers, contractors, and administrators.

---

# 🎯 Objectives (Solutions)

## General Objective

To develop a smart web and mobile platform that enables citizens to report infrastructure problems and enables municipalities to efficiently verify, assign, monitor, analyze, and resolve those problems.

## Specific Objectives

CIRP aims to:

* Provide an easy-to-use mobile reporting system.
* Allow citizens to submit images and GPS locations.
* Track infrastructure reports from submission to resolution.
* Automatically classify infrastructure problems using AI.
* Detect potentially duplicate reports using AI.
* Help officers make better decisions using AI-generated recommendations.
* Display infrastructure problems using interactive GIS maps.
* Generate GIS heat maps to identify problem hotspots.
* Support English, Amharic, Afaan Oromo, and Tigrinya.
* Improve communication between citizens and municipalities.
* Improve maintenance task assignment and monitoring.
* Provide dashboards and analytics for decision-making.
* Improve transparency and accountability.
* Reduce duplicate reports and unnecessary resource usage.

---

# ✨ Key Features

## 👤 Citizen Mobile Application

Citizens can:

* Register and log in.
* Select their preferred language.
* Report infrastructure problems.
* Take photos using the camera.
* Upload images from the gallery.
* Capture their current GPS location.
* Select a location from the map.
* Select or confirm an infrastructure category.
* View submitted reports.
* Track report status.
* Receive notifications.
* Manage their profile.

---

## 🤖 AI Duplicate Detection

CIRP uses AI to identify reports that may describe the same infrastructure problem.

The system can compare:

* Report descriptions
* Images
* Geographic locations
* Categories

Example:

```text
Report A:
"Large pothole near DBU gate."

Report B:
"Big road hole close to the university entrance."
```

The system can identify these reports as potentially related.

Example result:

```json
{
  "is_duplicate": true,
  "similarity_score": 0.92,
  "similar_report_id": 1024
}
```

The final decision to merge reports remains with the municipality officer.

---

## 🖼️ AI Image Classification

When a citizen uploads an infrastructure image, the AI model analyzes it and suggests a category.

Possible categories include:

* Road Damage
* Water Leakage
* Garbage
* Drainage
* Streetlight
* Public Facility
* Other

Example:

```text
Uploaded Image
      ↓
AI Model
      ↓
Road Damage
      ↓
94% Confidence
```

The prediction is a recommendation and can be corrected by the user or officer.

---

## 🗺️ GIS Maps

CIRP uses GIS to display infrastructure reports geographically.

The municipality can:

* View report locations.
* Search locations.
* Filter reports.
* View individual reports on a map.
* Analyze problem distribution.

---

## 🔥 GIS Heat Maps

Heat maps show areas where infrastructure problems are highly concentrated.

Example:

```text
High concentration    🔴
Medium concentration  🟡
Low concentration     🟢
```

Heat maps can help municipalities identify infrastructure problem hotspots and prioritize resources.

---

## 🌍 Multilingual Support

CIRP supports:

* 🇬🇧 English
* 🇪🇹 Amharic
* Afaan Oromo
* Tigrinya

Language support applies to:

* Navigation
* Buttons
* Forms
* Notifications
* Instructions
* Error messages
* Dashboard labels

---

## 📊 Dashboard and Analytics

Municipality officers can monitor:

* Total reports
* Pending reports
* Verified reports
* Assigned reports
* In-progress reports
* Completed reports
* Resolved reports
* Reports by category
* Reports by location
* Resolution rate
* Response time

---

## 🔔 Notifications

Users can receive notifications when:

* A report is submitted.
* A report is verified.
* A report is rejected.
* A task is assigned.
* Maintenance starts.
* Progress is updated.
* Maintenance is completed.
* A report is resolved.

---

# 👥 Actors

CIRP contains four primary actors.

| Actor                   | Main Responsibilities                                             |
| ----------------------- | ----------------------------------------------------------------- |
| 👤 Citizen              | Report problems, track reports, receive notifications             |
| 🏢 Municipality Officer | Verify reports, assign tasks, monitor and resolve problems        |
| 👷 Contractor           | Perform assigned maintenance and update progress                  |
| 🔐 Administrator        | Manage users, roles, departments, categories, and system settings |

---

## 👤 Citizen

The citizen interacts primarily with the Flutter mobile application.

Main activities:

```text
Register
Login
↓
Select Language
↓
Create Report
↓
Upload Image
↓
Capture GPS
↓
Submit
↓
Track Report
↓
Receive Notification
```

---

## 🏢 Municipality Officer

The officer uses the React web application to:

* Review reports.
* Verify reports.
* Review AI predictions.
* Review duplicate suggestions.
* Reject invalid reports.
* Request additional information.
* Merge duplicate reports.
* Assign contractors.
* Monitor maintenance.
* Confirm completed work.
* Resolve reports.

---

## 👷 Contractor

The contractor can:

* View assigned tasks.
* Accept assignments.
* Start maintenance.
* Update progress.
* Upload completion information.
* Mark tasks as completed.

---

## 🔐 Administrator

The administrator manages:

* Users
* Roles
* Departments
* Contractors
* Categories
* System configuration

---

# ⚠️ Limitations

The first version of CIRP has the following limitations:

1. Internet connectivity is required for most online operations.
2. GPS accuracy depends on the user's device and environment.
3. AI predictions may not always be correct.
4. Image classification depends on the quality and diversity of training data.
5. Duplicate detection may produce false positives or false negatives.
6. GIS heat-map accuracy depends on the accuracy of submitted locations.
7. CIRP manages infrastructure reports but does not physically repair infrastructure.
8. Financial management and contractor payment are outside the project scope.
9. Translation quality may vary across languages.
10. External services such as map providers or file storage may affect system availability.
11. AI models require continuous evaluation and improvement.

---

# 🔄 Methodology

CIRP will be developed using the **Agile/Scrum methodology**.

Agile allows the 8-member development team to work on different modules simultaneously while integrating them incrementally.

## Development Teams

```text
                 CIRP TEAM
                    │
        ┌───────────┼───────────┐
        │           │           │
     Backend     Frontend     Mobile
      2 Devs       2 Devs      2 Devs
                    │
                   AI
                 2 Devs
```

## Development Process

```text
Requirements
     ↓
System Design
     ↓
Database + API Design
     ↓
Backend Development
     ↓
Frontend Development
     ↓
Mobile Development
     ↓
AI Development
     ↓
GIS Integration
     ↓
System Integration
     ↓
Testing
     ↓
Deployment
```

Development will use Git and GitHub for version control and team collaboration.

The repository will use a monorepo structure:

```text
CIRP/
├── backend/
├── frontend/
├── mobile/
├── ai/
├── database/
├── docs/
└── .github/
```

---

# ⚙️ Functional Requirements

## FR-01 Authentication

The system shall allow users to:

* Register.
* Login.
* Logout.
* Reset passwords.
* Manage profiles.

## FR-02 Role Management

The system shall support:

* Citizen
* Municipality Officer
* Contractor
* Administrator

## FR-03 Language Selection

The system shall allow users to select:

* English
* Amharic
* Afaan Oromo
* Tigrinya

## FR-04 Create Report

Citizens shall be able to submit:

* Title
* Description
* Category
* Image
* GPS location
* Priority

## FR-05 Image Upload

Citizens shall be able to:

* Take photographs.
* Select images from their gallery.
* Preview images.
* Upload images.

## FR-06 GPS Location

The system shall allow citizens to:

* Capture current location.
* Select a location on a map.
* Confirm the report location.

## FR-07 AI Image Classification

The system shall analyze uploaded infrastructure images and return:

* Predicted category
* Confidence score

## FR-08 AI Duplicate Detection

The system shall compare new reports with existing reports and identify potentially duplicate reports.

## FR-09 Report Verification

Municipality officers shall be able to:

* Approve reports.
* Reject reports.
* Request information.
* Review AI classification.
* Review duplicate suggestions.
* Merge duplicate reports.

## FR-10 Task Assignment

Officers shall be able to:

* Select departments.
* Select contractors.
* Set priority.
* Set deadlines.
* Assign tasks.

## FR-11 Contractor Management

Contractors shall be able to:

* View assigned tasks.
* Accept tasks.
* Start tasks.
* Update progress.
* Complete tasks.

## FR-12 Report Tracking

Reports shall follow:

```text
Submitted
    ↓
Verified
    ↓
Assigned
    ↓
In Progress
    ↓
Completed
    ↓
Resolved
```

## FR-13 Notifications

The system shall notify users about important report and task status changes.

## FR-14 GIS Map

The system shall display reports on interactive maps.

## FR-15 GIS Heat Map

The system shall generate heat maps based on the geographic concentration of reports.

## FR-16 Search and Filtering

Users shall be able to filter reports by:

* Category
* Status
* Priority
* Date
* Location

## FR-17 Dashboard

The system shall provide dashboards showing report statistics.

## FR-18 Analytics

The system shall calculate:

* Resolution rate
* Average response time
* Average resolution time
* Reports by category
* Reports by location

## FR-19 Administration

Administrators shall manage:

* Users
* Roles
* Departments
* Contractors
* Categories
* System settings

---

# 🔒 Non-Functional Requirements

## Performance

* Normal pages should load quickly under normal network conditions.
* API responses should be optimized.
* GIS operations should be efficient.
* AI prediction should return results within an acceptable time.

## Security

The system shall:

* Use secure authentication.
* Hash passwords.
* Use JWT authentication.
* Implement role-based authorization.
* Validate uploaded files.
* Protect APIs.
* Protect sensitive data.
* Never expose passwords or secret keys.

## Usability

The system should:

* Have a simple interface.
* Use clear navigation.
* Be responsive.
* Support mobile and desktop devices.
* Provide understandable error messages.
* Support four languages.

## Reliability

The system shall:

* Maintain report history.
* Record status changes.
* Handle errors gracefully.
* Provide database backup procedures.

## Scalability

The architecture should allow:

* More users.
* More reports.
* More municipalities.
* More categories.
* More AI models.

## Maintainability

The system should use:

* Modular architecture
* Clean code
* Reusable components
* API documentation
* Version control
* Automated testing

---

# 🧪 Testing and Evaluation

CIRP will use multiple levels of testing.

## 1. Unit Testing

Individual components will be tested independently.

Examples:

* Authentication
* Report creation
* Image upload
* GPS
* Task assignment
* Notifications

## 2. Integration Testing

The communication between system components will be tested.

```text
Flutter
   ↓
Django REST API
   ↓
PostgreSQL/PostGIS
```

```text
React
   ↓
Django REST API
```

```text
Django
   ↓
AI Service
```

## 3. System Testing

The complete workflow will be tested:

```text
Citizen
 ↓
Report
 ↓
AI Analysis
 ↓
Verification
 ↓
Assignment
 ↓
Contractor
 ↓
Completion
 ↓
Resolution
```

## 4. AI Evaluation

### Image Classification

The model will be evaluated using:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion Matrix

### Duplicate Detection

The model will be evaluated using:

* Precision
* Recall
* F1-score
* False Positive Rate
* False Negative Rate

## 5. GIS Testing

Testing will verify:

* GPS coordinates.
* Map markers.
* Location search.
* Geographic filtering.
* Heat-map generation.

## 6. User Acceptance Testing

The system will be evaluated by representative:

* Citizens
* Municipality officers
* Contractors
* Administrators

The evaluation will focus on:

* Ease of use
* Accuracy
* Performance
* Accessibility
* Report tracking
* AI usefulness
* GIS usefulness
* Multilingual usability

---

# 📐 Class Diagram

The main system entities and relationships are:

```text
                         ┌─────────────────┐
                         │      User       │
                         ├─────────────────┤
                         │ userId          │
                         │ name            │
                         │ email           │
                         │ password        │
                         │ role            │
                         │ language        │
                         └────────┬────────┘
                                  │
                                  │ creates
                                  ▼
                         ┌─────────────────┐
                         │     Report      │
                         ├─────────────────┤
                         │ reportId        │
                         │ title           │
                         │ description     │
                         │ priority        │
                         │ status          │
                         │ createdAt       │
                         └──────┬──────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │   Category   │  │ ReportImage  │  │   Location   │
      ├──────────────┤  ├──────────────┤  ├──────────────┤
      │ categoryId   │  │ imageId      │  │ latitude     │
      │ name         │  │ imageUrl     │  │ longitude    │
      └──────────────┘  └──────────────┘  └──────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │ AI Classification│
                       ├──────────────────┤
                       │ predictedClass   │
                       │ confidence       │
                       └──────────────────┘

                         ┌──────────────────┐
                         │DuplicateDetection│
                         ├──────────────────┤
                         │ similarityScore  │
                         │ similarReportId  │
                         │ isDuplicate      │
                         └──────────────────┘

                         ┌──────────────────┐
                         │    Assignment    │
                         ├──────────────────┤
                         │ assignmentId     │
                         │ deadline         │
                         │ status           │
                         └────────┬─────────┘
                                  │
                       ┌──────────┴──────────┐
                       ▼                     ▼
                ┌──────────────┐      ┌──────────────┐
                │  Department  │      │  Contractor  │
                └──────────────┘      └──────────────┘

                         ┌──────────────────┐
                         │ StatusHistory    │
                         ├──────────────────┤
                         │ status           │
                         │ timestamp        │
                         │ comment          │
                         └──────────────────┘

                         ┌──────────────────┐
                         │  Notification    │
                         ├──────────────────┤
                         │ message          │
                         │ isRead           │
                         │ createdAt        │
                         └──────────────────┘
```

### Main Relationships

```text
User 1 ──────── * Report

Report 1 ────── * ReportImage

Report 1 ────── 1 Location

Category 1 ──── * Report

Report 1 ────── 1 AIClassification

Report 1 ────── * DuplicateDetection

Report 1 ────── 1 Assignment

Department 1 ── * Assignment

Contractor 1 ── * Assignment

Report 1 ────── * StatusHistory

User 1 ──────── * Notification
```

---

# 🛠️ Technologies Used

## Mobile Application

| Technology | Purpose               |
| ---------- | --------------------- |
| Flutter    | Mobile application    |
| Dart       | Programming language  |
| GPS        | Location capture      |
| Camera     | Infrastructure images |

## Web Application

| Technology   | Purpose                |
| ------------ | ---------------------- |
| React.js     | Web application        |
| Vite         | Development/build tool |
| Tailwind CSS | UI styling             |
| Axios        | API communication      |
| React Router | Navigation             |
| Leaflet      | GIS maps               |

## Backend

| Technology            | Purpose           |
| --------------------- | ----------------- |
| Python                | Backend language  |
| Django                | Backend framework |
| Django REST Framework | REST APIs         |
| JWT                   | Authentication    |

## Database

| Technology | Purpose             |
| ---------- | ------------------- |
| PostgreSQL | Relational database |
| PostGIS    | Geographic data     |

## AI/ML

| Technology         | Purpose          |
| ------------------ | ---------------- |
| Python             | AI development   |
| Scikit-learn       | Machine learning |
| PyTorch/TensorFlow | Deep learning    |
| OpenCV             | Image processing |

## GIS

| Technology    | Purpose          |
| ------------- | ---------------- |
| Leaflet       | Interactive maps |
| OpenStreetMap | Map data         |
| PostGIS       | Spatial database |

## Development Tools

| Tool    | Purpose          |
| ------- | ---------------- |
| Git     | Version control  |
| GitHub  | Collaboration    |
| Docker  | Containerization |
| Postman | API testing      |

---

# 🎨 UI

CIRP contains two main user interfaces.

## 📱 Citizen Mobile Application

### Main Screens

```text
Splash
  ↓
Login / Register
  ↓
Home
  ├── Create Report
  ├── My Reports
  ├── Map
  ├── Notifications
  └── Profile
```

### Create Report Screen

The citizen should be able to enter:

```text
┌─────────────────────────────┐
│   Report Problem            │
├─────────────────────────────┤
│ Title                       │
│ [_______________________]   │
│                             │
│ Description                 │
│ [_______________________]   │
│                             │
│ Category                    │
│ [ AI Suggested ▼ ]          │
│                             │
│ Photo                       │
│ [ Camera ] [ Gallery ]      │
│                             │
│ Location                    │
│ [ Use Current Location ]    │
│                             │
│ [ Submit Report ]            │
└─────────────────────────────┘
```

---

# 🖥️ Municipality Web Application

### Dashboard

```text
┌──────────────────────────────────────────────────┐
│ CIRP                         Notifications        │
├──────────────┬───────────────────────────────────┤
│ Dashboard    │ Total Reports        1,250        │
│ Reports      │ Pending               120         │
│ Verification │ In Progress            85         │
│ Assignments  │ Resolved             1,045        │
│ GIS Map      │                                   │
│ Heat Map     │ Recent Reports                    │
│ Analytics    │ ┌──────────────────────────────┐  │
│ Contractors  │ │ Road Damage     Pending     │  │
│ Users        │ │ Water Leakage   Verified    │  │
│ Departments  │ │ Garbage         Assigned   │  │
│ Settings     │ └──────────────────────────────┘  │
└──────────────┴───────────────────────────────────┘
```

---

# 🗺️ GIS UI

The municipality GIS interface will display:

```text
              INFRASTRUCTURE MAP

       🔴 🔴
     🔴 🔴 🔴
        🟡
                     🟢

Filters:
Category: [All ▼]
Status:   [All ▼]
Date:     [All ▼]

[ Markers ] [ Heat Map ]
```

---

# ⭐ Unique Features

## 1. AI-Powered Duplicate Detection

Unlike a traditional complaint management system, CIRP can identify reports that may refer to the same infrastructure problem.

---

## 2. AI Image Classification

Citizens do not need to know the exact technical infrastructure category. The AI can analyze the submitted image and suggest a category.

---

## 3. GIS Infrastructure Heat Maps

Municipalities can visually identify areas where infrastructure problems are concentrated.

---

## 4. Ethiopian Multilingual Support

CIRP supports:

**English + Amharic + Afaan Oromo + Tigrinya**

This makes the platform more accessible to different language communities.

---

## 5. Complete Infrastructure Lifecycle

CIRP provides a complete workflow:

```text
Report
  ↓
AI Analysis
  ↓
Verification
  ↓
Assignment
  ↓
Maintenance
  ↓
Progress
  ↓
Completion
  ↓
Resolution
```

---

## 6. Transparent Citizen Tracking

Citizens can see what happens after submitting a report rather than simply submitting a complaint and waiting.

---

## 7. Data-Driven Municipal Decision Making

GIS and analytics allow municipality authorities to identify:

* Problem hotspots
* Frequent infrastructure categories
* Response times
* Resolution rates
* Maintenance trends

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      CITIZEN        │
                    │   Flutter Mobile    │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │    Django REST      │
                    │        API          │
                    ├─────────────────────┤
                    │ Authentication      │
                    │ Reports             │
                    │ Assignments         │
                    │ Notifications       │
                    │ GIS                 │
                    │ Analytics           │
                    └───────┬───────┬─────┘
                            │       │
                            │       ▼
                            │  ┌─────────────┐
                            │  │ AI Service  │
                            │  ├─────────────┤
                            │  │ Image AI    │
                            │  │ Duplicate AI│
                            │  └─────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │ PostgreSQL + PostGIS│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      React Web      │
                    │ Officer/Admin/       │
                    │ Contractor           │
                    └─────────────────────┘
```

---

# 📂 Project Structure

```text
CIRP/
│
├── backend/
│   ├── config/
│   ├── apps/
│   │   ├── accounts/
│   │   ├── reports/
│   │   ├── assignments/
│   │   ├── notifications/
│   │   ├── gis/
│   │   └── analytics/
│   └── tests/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       └── utils/
│
├── mobile/
│   └── lib/
│       ├── screens/
│       ├── models/
│       ├── services/
│       ├── providers/
│       └── widgets/
│
├── ai/
│   ├── image_classification/
│   ├── duplicate_detection/
│   └── api/
│
├── database/
├── docs/
├── .github/
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# 🔐 Security

CIRP will implement:

* JWT authentication
* Password hashing
* Role-based access control
* API authorization
* Input validation
* File upload validation
* Secure environment variables
* Protected database access
* Error handling
* Audit/status history

Sensitive information such as passwords, secret keys, and database credentials must never be committed to GitHub.

---

# 🚀 Development Workflow

The project uses GitHub for collaborative development.

```text
Developer
    ↓
Feature Branch
    ↓
Commit
    ↓
Push
    ↓
Pull Request
    ↓
Code Review
    ↓
develop
    ↓
Testing
    ↓
main
```

Example branches:

```text
feature/backend-auth
feature/backend-reports
feature/frontend-dashboard
feature/frontend-gis
feature/mobile-report
feature/mobile-map
feature/ai-image-classification
feature/ai-duplicate-detection
```

---

# 📈 Expected Benefits

### Citizens

* Easier reporting
* Faster communication
* Report tracking
* Multilingual access

### Municipality Officers

* Centralized reports
* AI-assisted verification
* GIS visualization
* Better task management
* Data-driven decisions

### Contractors

* Clear task assignments
* Easy progress reporting
* Better communication

### Municipality Management

* Problem hotspot identification
* Better resource allocation
* Performance monitoring
* Improved transparency

---

# 🏁 Conclusion

The **Community Infrastructure Reporting Platform (CIRP)** provides a centralized and intelligent solution for managing community infrastructure problems.

The platform connects citizens, municipality officers, contractors, and administrators through mobile and web applications.

The combination of **Flutter, React, Django, PostgreSQL/PostGIS, AI, and GIS technologies** provides a scalable foundation for digital infrastructure management.

The four major innovations of CIRP are:

> 🤖 **AI Duplicate Detection**
> 🖼️ **AI Image Classification**
> 🗺️ **GIS Heat Maps**
> 🌍 **English, Amharic, Afaan Oromo & Tigrinya Support**

Through these capabilities, CIRP can reduce duplicate reports, simplify infrastructure classification, identify geographic problem hotspots, improve communication, and provide municipalities with better information for decision-making.

The ultimate goal of CIRP is to create a more **transparent, accessible, intelligent, and efficient infrastructure reporting and management process** that connects community members with the authorities responsible for maintaining their public environment.

---

## 📌 Project Status

**Development Status:** 🚧 In Development

**Project Type:** University Software Engineering Project

**Architecture:** Web + Mobile + AI + GIS

**Platforms:**

* 📱 Flutter Mobile
* 🖥️ React Web
* ☁️ Django REST API
* 🤖 AI/ML Services
* 🗺️ GIS

---

## 👨‍💻 Development Team

**8-Member Development Team**

| Team     | Members | Responsibility                            |
| -------- | ------: | ----------------------------------------- |
| Backend  |       2 | Django, REST API, PostgreSQL/PostGIS      |
| Frontend |       2 | React, Tailwind CSS, Municipality Web     |
| Mobile   |       2 | Flutter, Citizen Mobile App               |
| AI/ML    |       2 | Image Classification, Duplicate Detection |

---

## 📄 Documentation

Additional project documentation can be found in:

```text
docs/
├── SRS/
├── architecture/
├── api/
├── database/
├── ai/
├── UI/
└── testing/
```

---

## ⭐ CIRP

**Report. Analyze. Assign. Resolve.**

> **Building a smarter connection between communities and public infrastructure services.**
