# 📱 CIRP Mobile App

**Community Infrastructure Reporting Platform (CIRP)** is a Flutter mobile application that allows citizens to report damaged or problematic community infrastructure and track the progress of their reports.

The app helps connect citizens with responsible authorities by providing a simple way to submit infrastructure problems with **photos, location, category, and severity**.

## ✨ Features

* 🔐 User registration, login, and OTP authentication
* 📝 Report infrastructure problems
* 📍 Select your current location or choose a location on the map
* 📷 Upload photos of reported problems
* 🗂️ Categorize infrastructure problems
* ⚠️ Set report severity
* 📊 Track submitted reports and their status
* 🔔 Receive notifications about report updates
* 🗺️ View reports on a map
* 👤 Manage user profile
* 🌍 Multi-language support:

  * English
  * Amharic
  * Afaan Oromoo
  * Tigrinya

## 🛠️ Tech Stack

* **Framework:** Flutter
* **Language:** Dart
* **State Management:** Provider
* **Maps:** Flutter Map + OpenStreetMap
* **Location:** Geolocator
* **Image Handling:** Image Picker
* **Networking:** HTTP
* **Local Storage:** Shared Preferences
* **Localization:** Flutter Gen-l10n

## 📁 Project Structure

```text
lib/
├── core/
│   ├── constants/
│   ├── routes/
│   ├── services/
│   └── theme/
│
├── features/
│   ├── auth/
│   ├── home/
│   ├── location/
│   ├── media/
│   ├── notifications/
│   ├── profile/
│   └── reports/
│
├── shared/
│   └── widgets/
│
└── l10n/
```

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Flutter SDK `>= 3.2.0`
* Dart SDK `>= 3.2.0`

### Installation

Clone the repository:

```bash
git clone https://github.com/Rediet2077/Community_Infrastructure_Reporting_Platform-.git
```

Move into the mobile application:

```bash
cd Community_Infrastructure_Reporting_Platform-/mobile_app
```

Install dependencies:

```bash
flutter pub get
```

Run the application:

```bash
flutter run
```

## 📱 Main Screens

| Screen           | Purpose                            |
| ---------------- | ---------------------------------- |
| Login / Register | User authentication                |
| Home             | Application dashboard              |
| Report Problem   | Submit a new infrastructure report |
| My Reports       | View submitted reports             |
| Report Details   | View report information and status |
| Map              | View reports and locations         |
| Notifications    | Receive report updates             |
| Profile          | Manage account settings            |

## 👥 Team

| Member     | Responsibility                                              |
| ---------- | ----------------------------------------------------------- |
| **Rediet** | Reports, Location, Media, Core Services, Shared Widgets     |
| **Meron**  | Authentication, Profile, Notifications, Localization, Theme |

## 🎯 Project Goal

CIRP aims to make infrastructure problem reporting **faster, easier, and more transparent** by giving citizens a direct way to communicate problems to responsible authorities.

---

**Built with ❤️ using Flutter**
