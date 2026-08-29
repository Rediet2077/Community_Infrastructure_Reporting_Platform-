class ApiConstants {
  static const String _localBaseUrl = 'http://localhost:8000';
  static const String _androidEmulatorBaseUrl = 'http://10.0.2.2:8000';
  static const String baseUrl = _localBaseUrl;
  static const String apiVersion = '/api/v1';
  static String get apiBaseUrl => '$baseUrl$apiVersion';
  static String get loginUrl => '$apiBaseUrl/auth/login/';
  static String get registerUrl => '$apiBaseUrl/auth/register/';
  static String get logoutUrl => '$apiBaseUrl/auth/logout/';
  static String get refreshTokenUrl => '$apiBaseUrl/auth/token/refresh/';
  static String get reportsUrl => '$apiBaseUrl/reports/';
  static String get myReportsUrl => '$apiBaseUrl/reports/my-reports/';
  static String reportDetailUrl(int id) => '$apiBaseUrl/reports/$id/';
  static String get categoriesUrl => '$apiBaseUrl/categories/';
  static String get departmentsUrl => '$apiBaseUrl/departments/';
  static String get profileUrl => '$apiBaseUrl/users/me/';
  static String get updateProfileUrl => '$apiBaseUrl/users/me/update/';
  static String get notificationsUrl => '$apiBaseUrl/notifications/';
  static String get assetsUrl => '$apiBaseUrl/assets/';
  static const String aiServiceBaseUrl = 'http://localhost:8001';
  static String get imageClassificationUrl => '$aiServiceBaseUrl/classify/';
  static String get duplicateDetectionUrl => '$aiServiceBaseUrl/detect-duplicate/';
  static String get uploadUrl => '$apiBaseUrl/media/upload/';
  static String get confirmUrl => '$apiBaseUrl/media/confirm/';
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  static Map<String, String> authHeaders(String token) => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer $token',
  };
  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
}
