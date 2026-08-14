# Community Infrastructure Reporting Platform (CIRP)

> **A smart web and mobile platform for reporting, managing, analyzing, and resolving community infrastructure problems.**

---

# 1. Introduction

The **Community Infrastructure Reporting Platform (CIRP)** is a smart web and mobile-based system designed to improve how citizens report public infrastructure problems and how municipalities manage and resolve them.

Citizens can use the **Flutter mobile application** to report infrastructure problems such as road damage, water leakage, drainage problems, garbage, streetlight failures, and public facility damage. A report can include a description, photograph, category, and GPS location.

Municipality officers, contractors, and administrators use a **React-based web application** to review, verify, assign, monitor, and resolve infrastructure reports.

CIRP integrates **Artificial Intelligence (AI)** and **Geographic Information Systems (GIS)** to make infrastructure management more intelligent, efficient, and data-driven.

The system includes four major smart capabilities:

* **AI Duplicate Report Detection**
* **AI Image-Based Infrastructure Classification**
* **GIS Maps and Heat Maps**
* **Multilingual Support: English, Amharic, Afaan Oromo, and Tigrinya**

## Overall Workflow

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

# 2. Statement of the Problem

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

# 3. Objectives

## 3.1 General Objective

To develop a smart web and mobile platform that enables citizens to report infrastructure problems and enables municipalities to efficiently verify, assign, monitor, analyze, and resolve those problems.

## 3.2 Specific Objectives

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

# 4. Key Features

## 4.1 Citizen Mobile Application

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

## 4.2 AI Duplicate Detection

CIRP uses AI to identify reports that may describe the same infrastructure problem.

The system can compare:

* Report descriptions
* Images
* Geographic locations
* Categories

### Example

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

## 4.3 AI Image Classification

When a citizen uploads an infrastructure image, the AI model analyzes it and suggests a category.

Possible categories include:

* Road Damage
* Water Leakage
* Garbage
* Drainage
* Streetlight
* Public Facility
* Other

### Example

```text
Uploaded Image
      ↓
AI Model
      ↓
Road Damage
      ↓
94% Confidence
```

The prediction is a recommendation and can be corrected by the citizen or municipality officer.

---

## 4.4 GIS Maps

CIRP uses GIS to display infrastructure reports geographically.

Municipality officers can:

* View report locations.
* Search locations.
* Filter reports.
* View individual reports on a map.
* Analyze problem distribution.

---



Heat maps help municipalities identify infrastructure problem hotspots and prioritize resources.

---

## 4.5 Multilingual Support

CIRP supports:

* English
* Amharic
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

## 4.6 Dashboard and Analytics

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

## 4.7 Notifications

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

# 5. System Actors

CIRP contains four primary actors.

| Actor                    | Main Responsibilities                                                   |
| ------------------------ | ----------------------------------------------------------------------- |
| **Citizen**              | Report problems, track reports, and receive notifications               |
| **Municipality Officer** | Verify reports, assign tasks, monitor maintenance, and resolve problems |
| **Contractor**           | Perform assigned maintenance and update progress                        |
| **Administrator**        | Manage users, roles, departments, categories, and system settings       |

---

# 6. Actor Responsibilities

## 6.1 Citizen

The citizen interacts primarily with the Flutter mobile application.

### Main Activities

```text
Register
   ↓
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
Submit Report
   ↓
Track Report
   ↓
Receive Notification
```

---

## 6.2 Municipality Officer

The municipality officer uses the React web application to:

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

## 6.3 Contractor

The contractor can:

* View assigned tasks.
* Accept assignments.
* Start maintenance.
* Update progress.
* Upload completion information.
* Mark tasks as completed.

---

## 6.4 Administrator

The administrator manages:

* Users
* Roles
* Departments
* Contractors
* Categories
* System configuration

---

# 7. Unique Features

## 7.1 AI-Powered Duplicate Detection

Unlike a traditional complaint management system, CIRP can identify reports that may refer to the same infrastructure problem.

## 7.2 AI Image Classification

Citizens do not need to know the exact technical infrastructure category. The AI analyzes the submitted image and suggests an appropriate category.

## 7.3 GIS Infrastructure Heat Maps

Municipalities can visually identify areas where infrastructure problems are concentrated.

## 7.4 Ethiopian Multilingual Support

CIRP supports **English, Amharic, Afaan Oromo, and Tigrinya**, making the platform more accessible to different language communities.

## 7.5 Complete Infrastructure Lifecycle

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

## 7.6 Transparent Citizen Tracking

Citizens can see what happens after submitting a report instead of simply submitting a complaint and waiting for a response.

## 7.7 Data-Driven Municipal Decision Making

GIS and analytics allow municipality authorities to identify:

* Problem hotspots
* Frequent infrastructure categories
* Response times
* Resolution rates
* Maintenance trends

---

# 8. Security

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
* Audit and status history

Sensitive information such as passwords, secret keys, and database credentials must never be committed to GitHub.

---

# 9. Development Team

## 8-Member Development Team

| Name(s)                   | Team        | Members | Responsibility                            |
| ------------------------- | ----------- | ------: | ----------------------------------------- |
| **Migbaru, Musse, Meron** | Backend     |       3 | Django, REST API, PostgreSQL/PostGIS      |
| **Naol, Nahom**           | Frontend    |       2 | React, Tailwind CSS, Municipality Web     |
| **Rediet, Meron**         | Mobile      |       2 | Flutter, Citizen Mobile App               |
| **Rediet Sharew**         | AI/ML       |       1 | Image Classification, Duplicate Detection |
| **Total**                 | **4 Teams** |   **8** | **Web, Mobile, Backend, AI/ML**           |

---

# 10. Development Branches

The development team uses separate Git branches for different areas of the system:


Each developer can work on their assigned feature branch and later merge the completed work into the appropriate shared branch.

---

# 11. Expected Benefits

## Citizens

* Easier reporting
* Faster communication
* Report tracking
* Multilingual access

## Municipality Officers

* Centralized reports
* AI-assisted verification
* GIS visualization
* Better task management
* Data-driven decisions

## Contractors

* Clear task assignments
* Easy progress reporting
* Better communication

## Municipality Management

* Problem hotspot identification
* Better resource allocation
* Performance monitoring
* Improved transparency

---

# 12. Technology Stack

| Layer              | Technology                       |
| ------------------ | -------------------------------- |
| Mobile Application | Flutter                          |
| Web Application    | React                            |
| Backend            | Django REST Framework            |
| Database           | PostgreSQL                       |
| Spatial Database   | PostGIS                          |
| AI/ML              | Python, PyTorch                  |
| GIS                | GIS Mapping and Spatial Analysis |
| Authentication     | JWT                              |
| API Communication  | REST API                         |
| Version Control    | Git and GitHub                   |

---

# 13. Conclusion

The **Community Infrastructure Reporting Platform (CIRP)** provides a centralized and intelligent solution for managing community infrastructure problems.

The platform connects citizens, municipality officers, contractors, and administrators through mobile and web applications.

The combination of **Flutter, React, Django, PostgreSQL/PostGIS, AI, and GIS technologies** provides a scalable foundation for digital infrastructure management.

The four major innovations of CIRP are:

> **AI Duplicate Detection**
> **AI Image Classification**
> **GIS Heat Maps**
> **English, Amharic, Afaan Oromo & Tigrinya Support**

Through these capabilities, CIRP can reduce duplicate reports, simplify infrastructure classification, identify geographic problem hotspots, improve communication, and provide municipalities with better information for decision-making.

The ultimate goal of CIRP is to create a more **transparent, accessible, intelligent, and efficient infrastructure reporting and management process** that connects community members with the authorities responsible for maintaining their public environment.

---

# 14. Project Status

**Development Status:** In Development

**Project Type:** University Software Engineering Project

**Architecture:** Web + Mobile + AI + GIS

**Platforms:**

* Flutter Mobile
* React Web
* Django REST API
* AI/ML Services
* GIS

---

# CIRP

**Report. Analyze. Assign. Resolve.**

> **Building a smarter connection between communities and public infrastructure services.**
