import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';

class SearchResult {
  final String displayName;
  final String shortName;
  final LatLng latLng;

  const SearchResult({
    required this.displayName,
    required this.shortName,
    required this.latLng,
  });

  factory SearchResult.fromJson(Map<String, dynamic> json) {
    final lat = double.parse(json['lat'] as String);
    final lon = double.parse(json['lon'] as String);
    final display = json['display_name'] as String;
    final parts = display.split(',');
    final short = parts.take(2).map((s) => s.trim()).join(', ');
    return SearchResult(
      displayName: display,
      shortName: short,
      latLng: LatLng(lat, lon),
    );
  }
}

class LocationSearchProvider extends ChangeNotifier {
  LatLng _pickedLatLng = const LatLng(9.0054, 38.7636);
  String _pickedAddress = 'Bole Road, near Atlas, Addis Ababa';
  bool _isLoadingAddress = false;

  LatLng get pickedLatLng => _pickedLatLng;
  String get pickedAddress => _pickedAddress;
  bool get isLoadingAddress => _isLoadingAddress;

  List<SearchResult> _searchResults = [];
  bool _isSearching = false;
  String _searchError = '';
  Timer? _debounce;

  List<SearchResult> get searchResults => _searchResults;
  bool get isSearching => _isSearching;
  String get searchError => _searchError;

  bool _isLocating = false;
  String _locationError = '';

  bool get isLocating => _isLocating;
  String get locationError => _locationError;

  void onSearchChanged(String query) {
    _debounce?.cancel();
    if (query.trim().length < 3) {
      _searchResults = [];
      _searchError = '';
      notifyListeners();
      return;
    }
    _debounce = Timer(const Duration(milliseconds: 500), () => _search(query));
  }

  Future<void> _search(String query) async {
    _isSearching = true;
    _searchError = '';
    notifyListeners();

    try {
      final uri = Uri.https('nominatim.openstreetmap.org', '/search', {
        'q': query,
        'format': 'json',
        'limit': '8',
        'addressdetails': '1',
      });

      final response = await http.get(uri, headers: {
        'User-Agent': 'CIRPApp/1.0 (community.infra.report@example.com)',
        'Accept-Language': 'en',
      }).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        _searchResults =
            data.map((e) => SearchResult.fromJson(e)).toList();
        if (_searchResults.isEmpty) {
          _searchError = 'No results found';
        }
      } else {
        _searchError = 'Search failed (${response.statusCode})';
      }
    } on TimeoutException {
      _searchError = 'Search timed out. Check your connection.';
    } catch (e) {
      _searchError = 'Search error: $e';
    }

    _isSearching = false;
    notifyListeners();
  }

  void clearSearch() {
    _debounce?.cancel();
    _searchResults = [];
    _searchError = '';
    notifyListeners();
  }

  void selectResult(SearchResult result) {
    _pickedLatLng = result.latLng;
    _pickedAddress = result.shortName;
    _searchResults = [];
    notifyListeners();
  }

  Future<void> updatePickedLocation(LatLng latLng) async {
    _pickedLatLng = latLng;
    _pickedAddress =
        '${latLng.latitude.toStringAsFixed(5)}, ${latLng.longitude.toStringAsFixed(5)}';
    notifyListeners();

    _isLoadingAddress = true;
    notifyListeners();
    try {
      final uri = Uri.https('nominatim.openstreetmap.org', '/reverse', {
        'lat': latLng.latitude.toString(),
        'lon': latLng.longitude.toString(),
        'format': 'json',
      });
      final response = await http.get(uri, headers: {
        'User-Agent': 'CIRPApp/1.0 (community.infra.report@example.com)',
      }).timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final display = data['display_name'] as String? ?? '';
        if (display.isNotEmpty) {
          final parts = display.split(',');
          _pickedAddress =
              parts.take(2).map((s) => s.trim()).join(', ');
        }
      }
    } catch (_) {
    }
    _isLoadingAddress = false;
    notifyListeners();
  }

  Future<bool> useCurrentLocation() async {
    _locationError = '';
    _isLocating = true;
    notifyListeners();

    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _locationError = 'Location services are disabled.';
        _isLocating = false;
        notifyListeners();
        return false;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _locationError = 'Location permission denied.';
          _isLocating = false;
          notifyListeners();
          return false;
        }
      }
      if (permission == LocationPermission.deniedForever) {
        _locationError =
            'Location permission permanently denied. Enable in app settings.';
        _isLocating = false;
        notifyListeners();
        return false;
      }

      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      ).timeout(const Duration(seconds: 15));

      await updatePickedLocation(
          LatLng(position.latitude, position.longitude));
      _isLocating = false;
      notifyListeners();
      return true;
    } on TimeoutException {
      _locationError = 'Location request timed out.';
    } catch (e) {
      _locationError = 'Could not get location: $e';
    }

    _isLocating = false;
    notifyListeners();
    return false;
  }

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }
}
