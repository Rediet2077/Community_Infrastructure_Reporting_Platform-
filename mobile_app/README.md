# CIRP Mobile App

**Community Infrastructure Reporting Platform** — a Flutter app that lets citizens report infrastructure problems like road damage, water leaks, and streetlight failures to local authorities.

---

## What it does

- Report infrastructure problems with location, photos, category, and severity
- Pick a location on an interactive map or use your current location
- Track your submitted reports and their status
- Get notifications on report updates
- Supports 4 languages: English, Amharic, Oromiffa, Tigrinya

---

## Screens

| Screen | Description |
|---|---|
| Login / Register / OTP | User authentication |
| Home | Dashboard overview |
| Report Problem | 4-step form: Location → Details → Photo → Review |
| My Reports | List of your submitted reports |
| Report Details | Full view of a single report |
| Map | Browse reports on a map |
| Notifications | Alerts and updates |
| Profile | User account settings |

---

## Tech Stack

- **Framework:** Flutter (Dart)
- **State management:** Provider
- **Maps:** flutter_map + OpenStreetMap
- **Location:** geolocator
- **Image:** image_picker
- **Networking:** http
- **Localization:** Flutter Gen l10n (ARB files)
- **Storage:** shared_preferences

---

## Project Structure

```
lib/
├── core/
│   ├── constants/       # API and app constants
│   ├── routes/          # Named routes
│   ├── services/        # API, auth, email services
│   └── theme/           # App colors and theme
├── features/
│   ├── auth/            # Login, register, OTP
│   ├── home/            # Home screen
│   ├── location/        # Map and location picker
│   ├── media/           # Camera and gallery
│   ├── notifications/   # Notifications screen
│   ├── profile/         # User profile
│   └── reports/         # Report problem, my reports, details
├── shared/
│   └── widgets/         # Reusable UI components
└── l10n/                # Translation ARB files
```

---

## Getting Started

**Requirements:** Flutter SDK `>=3.2.0`, Dart `>=3.2.0`

```bash
# Install dependencies
flutter pub get

# Run the app
flutter run
```

---

## Team

| Member | Responsibility |
|---|---|
| Rediet | Reports, Location, Media, Core services, Shared widgets |
| Meron | Auth, Profile, Notifications, Language/i18n, Theme |
