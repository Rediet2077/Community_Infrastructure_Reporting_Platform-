import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models.dart';

class ApiException implements Exception { ApiException(this.message); final String message; }

class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();
  final http.Client _client;
  static const _base = 'https://fakestoreapi.com';

  Future<List<Product>> products() async {
    final response = await _get('/products');
    return (jsonDecode(response) as List).map((e) => Product.fromJson(e)).toList();
  }
  Future<List<String>> categories() async => (jsonDecode(await _get('/products/categories')) as List).cast<String>();
  Future<UserProfile> user(int id) async => UserProfile.fromJson(jsonDecode(await _get('/users/$id')));
  Future<String> login(String username, String password) async {
    final response = await _client.post(Uri.parse('$_base/auth/login'), headers: {'Content-Type': 'application/json'}, body: jsonEncode({'username': username, 'password': password})).timeout(const Duration(seconds: 15));
    if (response.statusCode != 200) throw ApiException('Incorrect username or password.');
    final token = jsonDecode(response.body)['token'] as String?;
    if (token == null) throw ApiException('Login response was invalid.');
    return token;
  }
  Future<String> _get(String path) async {
    try {
      final response = await _client.get(Uri.parse('$_base$path')).timeout(const Duration(seconds: 15));
      if (response.statusCode != 200) throw ApiException('Could not load data (${response.statusCode}).');
      return response.body;
    } catch (e) { if (e is ApiException) rethrow; throw ApiException('Check your connection and try again.'); }
  }
}
