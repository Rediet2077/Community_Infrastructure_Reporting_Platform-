import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';

class AuthService {
  /// Register a new user
  static Future<Map<String, dynamic>> register({
    required String email,
    required String phoneNumber,
    required String firstName,
    required String lastName,
    required String password,
    required String passwordConfirm,
    String preferredLanguage = 'en-us',
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConstants.registerUrl),
        headers: ApiConstants.headers,
        body: jsonEncode({
          'email': email,
          'phone_number': phoneNumber,
          'first_name': firstName,
          'last_name': lastName,
          'password': password,
          'password_confirm': passwordConfirm,
          'preferred_language': preferredLanguage,
        }),
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 201) {
        return {
          'success': true,
          'message': data['message'] ?? 'Registration successful',
          'user': data['data']['user'],
          'tokens': data['data']['tokens'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Registration failed',
          'errors': data['errors'],
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Login user
  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConstants.loginUrl),
        headers: ApiConstants.headers,
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': data['message'] ?? 'Login successful',
          'user': data['data']['user'],
          'tokens': data['data'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Login failed',
          'errors': data['errors'],
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }
}
