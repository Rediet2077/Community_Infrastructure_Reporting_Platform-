import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../data/api_client.dart';
import '../models.dart';

class AppState extends ChangeNotifier {
  AppState(this._api);
  final ApiClient _api;
  List<Product> products = [], _catalog = [];
  List<String> categories = [];
  final Map<int, CartItem> _cart = {};
  String? token, error, selectedCategory;
  bool loadingProducts = false, loadingProfile = false;
  UserProfile? profile;
  String query = '';
  bool get loggedIn => token != null;
  List<CartItem> get cart => _cart.values.toList();
  int get cartCount => _cart.values.fold(0, (sum, item) => sum + item.quantity);
  double get total => _cart.values.fold(0, (sum, item) => sum + item.product.price * item.quantity);

  Future<void> restore() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token');
    await loadProducts();
    final saved = prefs.getString('cart');
    if (saved != null) {
      for (final item in jsonDecode(saved) as List) {
        final product = _catalog.where((p) => p.id == item['id']).firstOrNull;
        if (product != null) _cart[product.id] = CartItem(product, item['quantity'] as int);
      }
      notifyListeners();
    }
    if (loggedIn) await loadProfile();
  }
  Future<void> loadProducts() async {
    loadingProducts = true; error = null; notifyListeners();
    try { _catalog = await _api.products(); categories = await _api.categories(); _filter(); }
    on ApiException catch (e) { error = e.message; }
    finally { loadingProducts = false; notifyListeners(); }
  }
  void search(String value) { query = value; _filter(); notifyListeners(); }
  void selectCategory(String? value) { selectedCategory = value; _filter(); notifyListeners(); }
  void _filter() {
    products = _catalog.where((p) => (selectedCategory == null || p.category == selectedCategory) && p.title.toLowerCase().contains(query.toLowerCase())).toList();
  }
  void add(Product product) { _cart[product.id] = CartItem(product, (_cart[product.id]?.quantity ?? 0) + 1); _saveCart(); notifyListeners(); }
  void setQuantity(Product product, int quantity) { if (quantity <= 0) {_cart.remove(product.id);} else {_cart[product.id] = CartItem(product, quantity);} _saveCart(); notifyListeners(); }
  Future<void> _saveCart() async { final p = await SharedPreferences.getInstance(); await p.setString('cart', jsonEncode(cart.map((e) => e.toJson()).toList())); }
  Future<String?> login(String username, String password) async {
    try { token = await _api.login(username.trim(), password); final p = await SharedPreferences.getInstance(); await p.setString('token', token!); await loadProfile(); notifyListeners(); return null; }
    on ApiException catch (e) { return e.message; }
  }
  Future<void> loadProfile() async { loadingProfile = true; notifyListeners(); try { profile = await _api.user(1); } on ApiException catch (e) { error = e.message; } finally { loadingProfile = false; notifyListeners(); } }
  Future<void> logout() async { token = null; profile = null; final p = await SharedPreferences.getInstance(); await p.remove('token'); notifyListeners(); }
}

extension FirstOrNull<T> on Iterable<T> { T? get firstOrNull => isEmpty ? null : first; }
