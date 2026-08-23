import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LanguageProvider extends ChangeNotifier {
  static const _prefKey = 'selected_language_code';

  String _languageCode = 'en';

  LanguageProvider() {
    _loadSaved();
  }

  String get languageCode => _languageCode;

  Locale get locale => Locale(_languageCode);

  Future<void> setLanguage(String code) async {
    if (_languageCode == code) return;
    _languageCode = code;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefKey, code);
  }

  Future<void> _loadSaved() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_prefKey);
    if (saved != null && saved != _languageCode) {
      _languageCode = saved;
      notifyListeners();
    }
  }

  String currentLanguageName() {
    switch (_languageCode) {
      case 'am':
        return 'Amharic';
      case 'or':
        return 'Afaan Oromo';
      case 'ti':
        return 'Tigrinya';
      default:
        return 'English';
    }
  }

  List<Map<String, String>> get languageOptions => [
        {'code': 'en', 'name': 'English', 'icon': 'EN'},
        {'code': 'am', 'name': 'Amharic', 'icon': 'AM'},
        {'code': 'or', 'name': 'Afaan Oromo', 'icon': 'OR'},
        {'code': 'ti', 'name': 'Tigrinya', 'icon': 'TI'},
      ];
}
