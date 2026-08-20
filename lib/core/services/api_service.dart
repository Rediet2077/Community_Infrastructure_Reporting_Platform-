import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/api_constants.dart';

class ApiService {
  /// Get authorization headers with token
  static Future<Map<String, String>> _getAuthHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('access_token') ?? '';
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  /// Get current user profile
  static Future<Map<String, dynamic>> getUserProfile() async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.get(
        Uri.parse(ApiConstants.profileUrl),
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch profile',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get all reports (paginated)
  static Future<Map<String, dynamic>> getReports({
    int page = 1,
    int pageSize = 20,
    String? status,
    String? category,
  }) async {
    try {
      final headers = await _getAuthHeaders();
      
      // Build query parameters
      final queryParams = {
        'page': page.toString(),
        'page_size': pageSize.toString(),
      };
      if (status != null) queryParams['status'] = status;
      if (category != null) queryParams['category'] = category;
      
      final uri = Uri.parse(ApiConstants.reportsUrl).replace(
        queryParameters: queryParams,
      );

      final response = await http.get(
        uri,
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'],
          'count': data['count'],
          'next': data['next'],
          'previous': data['previous'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch reports',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get user's own reports
  static Future<Map<String, dynamic>> getMyReports({int page = 1}) async {
    try {
      final headers = await _getAuthHeaders();
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('user_id') ?? '';
      
      final uri = Uri.parse(ApiConstants.reportsUrl).replace(
        queryParameters: {
          'page': page.toString(),
          'reporter': userId,
        },
      );

      final response = await http.get(
        uri,
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'] ?? [],
          'count': data['count'] ?? 0,
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch your reports',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get report by ID
  static Future<Map<String, dynamic>> getReportById(int id) async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.get(
        Uri.parse(ApiConstants.reportDetailUrl(id)),
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch report',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Create new report
  static Future<Map<String, dynamic>> createReport({
    required String title,
    required String description,
    required int categoryId,
    required double latitude,
    required double longitude,
    String? address,
    String priority = 'medium',
    List<String>? images,
  }) async {
    try {
      final headers = await _getAuthHeaders();
      
      final body = {
        'title': title,
        'description': description,
        'category': categoryId,
        'latitude': latitude,
        'longitude': longitude,
        'priority': priority,
      };
      
      if (address != null) body['address'] = address;
      if (images != null) body['images'] = images;

      final response = await http.post(
        Uri.parse(ApiConstants.reportsUrl),
        headers: headers,
        body: jsonEncode(body),
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 201) {
        return {
          'success': true,
          'message': data['message'] ?? 'Report created successfully',
          'data': data['data'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to create report',
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

  /// Get all categories
  static Future<Map<String, dynamic>> getCategories() async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.get(
        Uri.parse(ApiConstants.categoriesUrl),
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'] ?? [],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch categories',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get all departments
  static Future<Map<String, dynamic>> getDepartments() async {
    try {
      final headers = await _getAuthHeaders();
      final response = await http.get(
        Uri.parse(ApiConstants.departmentsUrl),
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'] ?? [],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch departments',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get notifications
  static Future<Map<String, dynamic>> getNotifications({int page = 1}) async {
    try {
      final headers = await _getAuthHeaders();
      final uri = Uri.parse(ApiConstants.notificationsUrl).replace(
        queryParameters: {'page': page.toString()},
      );

      final response = await http.get(
        uri,
        headers: headers,
      ).timeout(ApiConstants.connectTimeout);

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': data['data'] ?? [],
          'count': data['count'] ?? 0,
          'unread_count': data['unread_count'] ?? 0,
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Failed to fetch notifications',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }

  /// Get dashboard statistics
  static Future<Map<String, dynamic>> getDashboardStats() async {
    try {
      final headers = await _getAuthHeaders();
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('user_id') ?? '';
      
      // Fetch user's reports to get statistics
      final myReportsResult = await getMyReports();
      final allReportsResult = await getReports(pageSize: 1);
      
      int myReportsCount = 0;
      int pendingCount = 0;
      int inProgressCount = 0;
      int resolvedCount = 0;
      
      if (myReportsResult['success'] == true) {
        myReportsCount = myReportsResult['count'] ?? 0;
        final reports = myReportsResult['data'] as List? ?? [];
        
        for (var report in reports) {
          final status = report['status'] ?? '';
          if (status == 'pending') pendingCount++;
          else if (status == 'in_progress') inProgressCount++;
          else if (status == 'resolved') resolvedCount++;
        }
      }
      
      final totalReports = allReportsResult['count'] ?? 0;
      
      return {
        'success': true,
        'data': {
          'my_reports': myReportsCount,
          'pending': pendingCount,
          'in_progress': inProgressCount,
          'resolved': resolvedCount,
          'total_reports': totalReports,
        },
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: $e',
      };
    }
  }
}
