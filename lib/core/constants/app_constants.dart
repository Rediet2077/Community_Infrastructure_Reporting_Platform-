/// Application-wide constants
class AppConstants {
  // App Information
  static const String appName = 'CIRP';
  static const String appFullName = 'Community Infrastructure Reporting Platform';
  static const String appVersion = '1.0.0';

  // Supported Languages
  static const List<Map<String, String>> languages = [
    {'code': 'en', 'name': 'English', 'flag': '🇺🇸'},
    {'code': 'am', 'name': 'አማርኛ', 'flag': '🇪🇹'},
    {'code': 'or', 'name': 'Afaan Oromo', 'flag': '🌿'},
    {'code': 'ti', 'name': 'ትግርኛ', 'flag': '🌿'},
  ];

  // Report Categories (matched with backend)
  static const List<String> reportCategories = [
    'Road Damage',
    'Water Leakage',
    'Garbage',
    'Streetlight',
    'Drainage',
    'Other',
  ];

  // Report Statuses (matched with backend)
  static const List<String> reportStatuses = [
    'All',
    'Pending',
    'In Progress',
    'Resolved',
    'Rejected',
  ];
  
  // Storage Keys
  static const String authTokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userDataKey = 'user_data';
  static const String languageKey = 'language';
}
