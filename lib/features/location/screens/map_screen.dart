import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  final MapController _mapController = MapController();
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _searchFocus = FocusNode();

  bool _isSearching = false;
  List<_SearchResult> _searchResults = [];
  bool _showResults = false;
  Timer? _debounce;

  Set<String> _activeFilters = {
    'Road Damage', 'Water Leakage', 'Garbage',
    'Streetlight', 'Drainage', 'Other',
  };

  final List<_ReportPin> _allPins = [
    _ReportPin(location: const LatLng(9.0120, 38.7600), category: 'Road Damage', count: 12, color: AppColors.mapRed),
    _ReportPin(location: const LatLng(9.0180, 38.7750), category: 'Water Leakage', count: 7, color: AppColors.mapBlue),
    _ReportPin(location: const LatLng(9.0050, 38.7650), category: 'Garbage', count: 5, color: AppColors.mapOrange),
    _ReportPin(location: const LatLng(9.0070, 38.7820), category: 'Water Leakage', count: 8, color: AppColors.mapBlue),
    _ReportPin(location: const LatLng(9.0200, 38.7500), category: 'Drainage', count: 3, color: AppColors.mapGreen),
    _ReportPin(location: const LatLng(9.0090, 38.7900), category: 'Streetlight', count: 2, color: AppColors.mapPurple),
    _ReportPin(location: const LatLng(9.0150, 38.7700), category: 'Other', count: 4, color: AppColors.textSecondary),
  ];

  List<_ReportPin> get _visiblePins =>
      _allPins.where((p) => _activeFilters.contains(p.category)).toList();

  @override
  void dispose() {
    _mapController.dispose();
    _searchController.dispose();
    _searchFocus.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  void _onSearchChanged(String query) {
    _debounce?.cancel();
    if (query.trim().length < 3) {
      setState(() { _searchResults = []; _showResults = false; _isSearching = false; });
      return;
    }
    setState(() => _isSearching = true);
    _debounce = Timer(const Duration(milliseconds: 500), () => _search(query));
  }

  Future<void> _search(String query) async {
    try {
      final uri = Uri.https('nominatim.openstreetmap.org', '/search', {
        'q': query, 'format': 'json', 'limit': '6', 'addressdetails': '1',
      });
      final response = await http.get(uri, headers: {
        'User-Agent': 'CIRPApp/1.0 (community.infra.report@example.com)',
        'Accept-Language': 'en',
      }).timeout(const Duration(seconds: 10));

      if (!mounted) return;

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        final results = data.map((e) {
          final display = e['display_name'] as String;
          final parts = display.split(',');
          final short = parts.take(2).map((s) => s.trim()).join(', ');
          return _SearchResult(
            shortName: short, fullName: display,
            latLng: LatLng(double.parse(e['lat'] as String), double.parse(e['lon'] as String)),
          );
        }).toList();
        setState(() { _searchResults = results; _showResults = results.isNotEmpty; _isSearching = false; });
      } else {
        setState(() => _isSearching = false);
      }
    } catch (_) {
      if (mounted) setState(() => _isSearching = false);
    }
  }

  void _onResultTap(_SearchResult result) {
    _searchController.text = result.shortName;
    _searchFocus.unfocus();
    setState(() { _showResults = false; _searchResults = []; });
    _mapController.move(result.latLng, 15.0);
  }

  void _clearSearch() {
    _searchController.clear();
    _debounce?.cancel();
    setState(() { _searchResults = []; _showResults = false; _isSearching = false; });
  }

  void _showFilterSheet(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final categories = [
      {'label': l10n.catRoadDamage, 'key': 'Road Damage', 'color': AppColors.mapRed},
      {'label': l10n.catWaterLeakage, 'key': 'Water Leakage', 'color': AppColors.mapBlue},
      {'label': l10n.catGarbage, 'key': 'Garbage', 'color': AppColors.mapOrange},
      {'label': l10n.catStreetlight, 'key': 'Streetlight', 'color': AppColors.mapPurple},
      {'label': l10n.catDrainage, 'key': 'Drainage', 'color': AppColors.mapGreen},
      {'label': l10n.catOther, 'key': 'Other', 'color': AppColors.textSecondary},
    ];

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheet) => Padding(
          padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(child: Container(width: 40, height: 4,
                  decoration: BoxDecoration(color: AppColors.divider, borderRadius: BorderRadius.circular(2)))),
              const SizedBox(height: 16),
              const Text('Filter by Category',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
              const SizedBox(height: 16),
              Wrap(
                spacing: 10, runSpacing: 10,
                children: categories.map((cat) {
                  final key = cat['key'] as String;
                  final color = cat['color'] as Color;
                  final isOn = _activeFilters.contains(key);
                  return GestureDetector(
                    onTap: () {
                      setSheet(() { isOn ? _activeFilters.remove(key) : _activeFilters.add(key); });
                      setState(() {});
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 150),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: isOn ? color.withValues(alpha: 0.12) : AppColors.inputFill,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: isOn ? color : AppColors.divider, width: isOn ? 1.5 : 1),
                      ),
                      child: Row(mainAxisSize: MainAxisSize.min, children: [
                        Container(width: 10, height: 10,
                            decoration: BoxDecoration(color: isOn ? color : AppColors.divider, shape: BoxShape.circle)),
                        const SizedBox(width: 6),
                        Text(cat['label'] as String,
                            style: TextStyle(fontSize: 13, fontWeight: isOn ? FontWeight.w600 : FontWeight.w400,
                                color: isOn ? color : AppColors.textSecondary)),
                      ]),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 20),
              Row(children: [
                Expanded(child: OutlinedButton(
                  onPressed: () {
                    setSheet(() => _activeFilters = {'Road Damage','Water Leakage','Garbage','Streetlight','Drainage','Other'});
                    setState(() {});
                  },
                  style: OutlinedButton.styleFrom(minimumSize: const Size(0, 46)),
                  child: const Text('Show All'),
                )),
                const SizedBox(width: 12),
                Expanded(child: ElevatedButton(
                  onPressed: () => Navigator.pop(ctx),
                  style: ElevatedButton.styleFrom(minimumSize: const Size(0, 46)),
                  child: const Text('Apply'),
                )),
              ]),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final legendItems = [
      {'color': AppColors.mapRed, 'label': l10n.catRoadDamage},
      {'color': AppColors.mapBlue, 'label': l10n.catWaterLeakage},
      {'color': AppColors.mapOrange, 'label': l10n.catGarbage},
      {'color': AppColors.mapPurple, 'label': l10n.catStreetlight},
      {'color': AppColors.mapGreen, 'label': l10n.catDrainage},
      {'color': AppColors.textSecondary, 'label': l10n.catOther},
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),
        title: Text(l10n.mapTitle),
        backgroundColor: AppColors.white,
        elevation: 0,
        actions: [
          IconButton(icon: const Icon(Icons.filter_list), onPressed: () => _showFilterSheet(context)),
        ],
      ),
      body: Stack(children: [
        FlutterMap(
          mapController: _mapController,
          options: const MapOptions(
            initialCenter: LatLng(9.0100, 38.7636),
            initialZoom: 13.5, minZoom: 3.0, maxZoom: 19.0,
          ),
          children: [
            TileLayer(urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.cirp.app', maxZoom: 19),
            MarkerLayer(
              markers: _visiblePins.map((pin) => Marker(
                point: pin.location, width: 44, height: 44,
                child: GestureDetector(
                  onTap: () => _mapController.move(pin.location, 15.0),
                  child: Container(
                    width: 44, height: 44,
                    decoration: BoxDecoration(color: pin.color, shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: pin.color.withValues(alpha: 0.45), blurRadius: 8, offset: const Offset(0, 3))]),
                    child: Center(child: Text('${pin.count}',
                        style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w800))),
                  ),
                ),
              )).toList(),
            ),
          ],
        ),
        Positioned(
          top: 12, left: 12, right: 12,
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(12),
            child: Column(children: [
              Container(
                height: 50,
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(children: [
                  const Padding(padding: EdgeInsets.only(left: 14),
                      child: Icon(Icons.search, color: AppColors.textSecondary, size: 20)),
                  Expanded(child: TextField(
                    controller: _searchController,
                    focusNode: _searchFocus,
                    onChanged: _onSearchChanged,
                    onSubmitted: _onSearchChanged,
                    decoration: InputDecoration(
                      hintText: l10n.searchLocation,
                      border: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      filled: false,
                      isDense: true,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 14),
                    ),
                    style: const TextStyle(fontSize: 14, color: AppColors.textPrimary),
                    textInputAction: TextInputAction.search,
                  )),
                  if (_isSearching)
                    const Padding(padding: EdgeInsets.only(right: 12),
                        child: SizedBox(width: 18, height: 18,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary)))
                  else if (_searchController.text.isNotEmpty)
                    IconButton(
                      icon: const Icon(Icons.close, color: AppColors.textSecondary, size: 18),
                      onPressed: _clearSearch,
                    ),
                ]),
              ),
              if (_showResults && _searchResults.isNotEmpty)
                Container(
                  constraints: const BoxConstraints(maxHeight: 240),
                  decoration: const BoxDecoration(
                    color: AppColors.white,
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(12),
                      bottomRight: Radius.circular(12),
                    ),
                  ),
                  child: ClipRRect(
                    borderRadius: const BorderRadius.only(
                      bottomLeft: Radius.circular(12),
                      bottomRight: Radius.circular(12),
                    ),
                    child: ListView.separated(
                      shrinkWrap: true,
                      itemCount: _searchResults.length,
                      separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.divider),
                      itemBuilder: (_, i) {
                        final r = _searchResults[i];
                        return ListTile(
                          dense: true,
                          leading: const Icon(Icons.location_on_outlined, color: AppColors.primary, size: 20),
                          title: Text(r.shortName,
                              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textPrimary),
                              maxLines: 1, overflow: TextOverflow.ellipsis),
                          subtitle: Text(r.fullName,
                              style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                              maxLines: 1, overflow: TextOverflow.ellipsis),
                          onTap: () => _onResultTap(r),
                        );
                      },
                    ),
                  ),
                ),
            ]),
          ),
        ),
        Positioned(
          right: 12, bottom: 160,
          child: Column(children: [
            _FloatButton(icon: Icons.add, onTap: () => _mapController.move(_mapController.camera.center, _mapController.camera.zoom + 1)),
            const SizedBox(height: 8),
            _FloatButton(icon: Icons.remove, onTap: () => _mapController.move(_mapController.camera.center, _mapController.camera.zoom - 1)),
            const SizedBox(height: 8),
            _FloatButton(icon: Icons.my_location, onTap: () => _mapController.move(const LatLng(9.0100, 38.7636), 13.5)),
          ]),
        ),
        Positioned(
          bottom: 16, left: 16, right: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(color: AppColors.white, borderRadius: BorderRadius.circular(14),
                boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 12, offset: const Offset(0, 4))]),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Categories', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.textSecondary)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 16, runSpacing: 8,
                children: legendItems.map((item) => Row(mainAxisSize: MainAxisSize.min, children: [
                  Container(width: 10, height: 10, decoration: BoxDecoration(color: item['color'] as Color, shape: BoxShape.circle)),
                  const SizedBox(width: 5),
                  Text(item['label'] as String, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                ])).toList(),
              ),
            ]),
          ),
        ),
      ]),
    );
  }
}

class _ReportPin {
  final LatLng location;
  final String category;
  final int count;
  final Color color;
  const _ReportPin({required this.location, required this.category, required this.count, required this.color});
}

class _SearchResult {
  final String shortName;
  final String fullName;
  final LatLng latLng;
  const _SearchResult({required this.shortName, required this.fullName, required this.latLng});
}

class _FloatButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  const _FloatButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 42, height: 42,
        decoration: BoxDecoration(color: AppColors.white, shape: BoxShape.circle,
            boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.15), blurRadius: 8, offset: const Offset(0, 3))]),
        child: Icon(icon, color: AppColors.textPrimary, size: 20),
      ),
    );
  }
}
