import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/features/location/providers/location_search_provider.dart';

class LocationPickerScreen extends StatelessWidget {
  const LocationPickerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => LocationSearchProvider(),
      child: const _LocationPickerBody(),
    );
  }
}

class _LocationPickerBody extends StatefulWidget {
  const _LocationPickerBody();

  @override
  State<_LocationPickerBody> createState() => _LocationPickerBodyState();
}

class _LocationPickerBodyState extends State<_LocationPickerBody> {
  final MapController _mapController = MapController();
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _searchFocus = FocusNode();
  bool _showResults = false;

  @override
  void dispose() {
    _mapController.dispose();
    _searchController.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  void _onSearchChanged(String value) {
    final provider = context.read<LocationSearchProvider>();
    provider.onSearchChanged(value);
    setState(() => _showResults = value.trim().length >= 3);
  }

  void _onResultTap(SearchResult result) {
    final provider = context.read<LocationSearchProvider>();
    provider.selectResult(result);
    _searchController.text = result.shortName;
    _searchFocus.unfocus();
    setState(() => _showResults = false);
    _mapController.move(result.latLng, 16.0);
  }

  void _onMapTap(TapPosition tapPos, LatLng latLng) {
    context.read<LocationSearchProvider>().updatePickedLocation(latLng);
    _searchController.clear();
    setState(() => _showResults = false);
    _searchFocus.unfocus();
  }

  Future<void> _onCurrentLocation() async {
    final provider = context.read<LocationSearchProvider>();
    final success = await provider.useCurrentLocation();
    if (!mounted) return;
    if (success) {
      _mapController.move(provider.pickedLatLng, 16.0);
    } else if (provider.locationError.isNotEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(provider.locationError),
          backgroundColor: AppColors.red,
        ),
      );
    }
  }

  void _confirm() {
    final provider = context.read<LocationSearchProvider>();
    Navigator.pop(
      context,
      PickedLocation(
        latLng: provider.pickedLatLng,
        address: provider.pickedAddress,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<LocationSearchProvider>();
    final l10n = AppLocalizations.of(context);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: provider.pickedLatLng,
              initialZoom: 14.0,
              minZoom: 3.0,
              maxZoom: 19.0,
              onTap: _onMapTap,
            ),
            children: [
              TileLayer(
                urlTemplate:
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.cirp.app',
                maxZoom: 19,
              ),
              MarkerLayer(
                markers: [
                  Marker(
                    point: provider.pickedLatLng,
                    width: 48,
                    height: 56,
                    child: const _PinWidget(),
                  ),
                ],
              ),
            ],
          ),

          Positioned(
            top: MediaQuery.of(context).padding.top + 8,
            left: 12,
            right: 12,
            child: Column(
              children: [
                _SearchBar(
                  controller: _searchController,
                  focusNode: _searchFocus,
                  hint: l10n.searchLocation,
                  isSearching: provider.isSearching,
                  onChanged: _onSearchChanged,
                  onClear: () {
                    _searchController.clear();
                    context.read<LocationSearchProvider>().clearSearch();
                    setState(() => _showResults = false);
                  },
                  onBack: () => Navigator.pop(context),
                ),
                if (_showResults)
                  _SearchResultsList(
                    results: provider.searchResults,
                    isSearching: provider.isSearching,
                    error: provider.searchError,
                    onTap: _onResultTap,
                  ),
              ],
            ),
          ),

          Positioned(
            right: 12,
            bottom: 160,
            child: Column(
              children: [
                _MapButton(
                  icon: provider.isLocating
                      ? Icons.hourglass_top
                      : Icons.my_location,
                  tooltip: 'Use my location',
                  onTap: _onCurrentLocation,
                ),
                const SizedBox(height: 8),
                _MapButton(
                  icon: Icons.add,
                  tooltip: 'Zoom in',
                  onTap: () => _mapController.move(
                      _mapController.camera.center,
                      _mapController.camera.zoom + 1),
                ),
                const SizedBox(height: 8),
                _MapButton(
                  icon: Icons.remove,
                  tooltip: 'Zoom out',
                  onTap: () => _mapController.move(
                      _mapController.camera.center,
                      _mapController.camera.zoom - 1),
                ),
              ],
            ),
          ),

          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: _BottomAddressCard(
              address: provider.pickedAddress,
              latLng: provider.pickedLatLng,
              isLoading: provider.isLoadingAddress,
              onConfirm: _confirm,
              confirmLabel: l10n.next,
            ),
          ),

          Positioned(
            bottom: 160,
            right: 60,
            child: Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.75),
                borderRadius: BorderRadius.circular(4),
              ),
              child: const Text(
                '© OpenStreetMap contributors',
                style: TextStyle(fontSize: 9, color: Colors.black54),
              ),
            ),
          ),
        ],
      ),
    );
  }
}


class _SearchBar extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode focusNode;
  final String hint;
  final bool isSearching;
  final ValueChanged<String> onChanged;
  final VoidCallback onClear;
  final VoidCallback onBack;

  const _SearchBar({
    required this.controller,
    required this.focusNode,
    required this.hint,
    required this.isSearching,
    required this.onChanged,
    required this.onClear,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 52,
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.12),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back,
                color: AppColors.textPrimary, size: 22),
            onPressed: onBack,
          ),
          Expanded(
            child: TextField(
              controller: controller,
              focusNode: focusNode,
              onChanged: onChanged,
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: const TextStyle(
                    color: AppColors.textHint, fontSize: 14),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.zero,
              ),
              style: const TextStyle(
                  fontSize: 14, color: AppColors.textPrimary),
              textInputAction: TextInputAction.search,
            ),
          ),
          if (isSearching)
            const Padding(
              padding: EdgeInsets.only(right: 12),
              child: SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(
                    strokeWidth: 2, color: AppColors.primary),
              ),
            )
          else if (controller.text.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.close,
                  color: AppColors.textSecondary, size: 20),
              onPressed: onClear,
            )
          else
            const Padding(
              padding: EdgeInsets.only(right: 12),
              child: const Icon(Icons.search,
                  color: AppColors.textSecondary, size: 20),
            ),
        ],
      ),
    );
  }
}


class _SearchResultsList extends StatelessWidget {
  final List<SearchResult> results;
  final bool isSearching;
  final String error;
  final ValueChanged<SearchResult> onTap;

  const _SearchResultsList({
    required this.results,
    required this.isSearching,
    required this.error,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 4),
      constraints: const BoxConstraints(maxHeight: 260),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.12),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(14),
        child: _buildContent(),
      ),
    );
  }

  Widget _buildContent() {
    if (isSearching) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      );
    }
    if (error.isNotEmpty) {
      return Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            const Icon(Icons.info_outline,
                color: AppColors.textSecondary, size: 18),
            const SizedBox(width: 8),
            Expanded(
              child: Text(error,
                  style: const TextStyle(
                      fontSize: 13, color: AppColors.textSecondary)),
            ),
          ],
        ),
      );
    }
    if (results.isEmpty) return const SizedBox.shrink();

    return ListView.separated(
      shrinkWrap: true,
      itemCount: results.length,
      separatorBuilder: (_, __) =>
          const Divider(height: 1, color: AppColors.divider),
      itemBuilder: (_, i) {
        final r = results[i];
        return ListTile(
          dense: true,
          leading: const Icon(Icons.location_on_outlined,
              color: AppColors.primary, size: 20),
          title: Text(
            r.shortName,
            style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          subtitle: Text(
            r.displayName,
            style: const TextStyle(
                fontSize: 11, color: AppColors.textSecondary),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          onTap: () => onTap(r),
        );
      },
    );
  }
}


class _MapButton extends StatelessWidget {
  final IconData icon;
  final String tooltip;
  final VoidCallback onTap;

  const _MapButton({
    required this.icon,
    required this.tooltip,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: tooltip,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: AppColors.white,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.15),
                blurRadius: 8,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: Icon(icon, color: AppColors.textPrimary, size: 20),
        ),
      ),
    );
  }
}


class _BottomAddressCard extends StatelessWidget {
  final String address;
  final LatLng latLng;
  final bool isLoading;
  final VoidCallback onConfirm;
  final String confirmLabel;

  const _BottomAddressCard({
    required this.address,
    required this.latLng,
    required this.isLoading,
    required this.onConfirm,
    required this.confirmLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(
          20, 16, 20, MediaQuery.of(context).padding.bottom + 16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius:
            const BorderRadius.vertical(top: Radius.circular(24)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 16,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 36,
              height: 4,
              margin: const EdgeInsets.only(bottom: 14),
              decoration: BoxDecoration(
                color: AppColors.divider,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.location_on,
                    color: AppColors.primary, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (isLoading)
                      const SizedBox(
                        height: 16,
                        width: 160,
                        child: LinearProgressIndicator(
                          color: AppColors.primary,
                          backgroundColor: AppColors.divider,
                        ),
                      )
                    else
                      Text(
                        address,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    const SizedBox(height: 3),
                    Text(
                      'Lat: ${latLng.latitude.toStringAsFixed(5)}, '
                      'Lng: ${latLng.longitude.toStringAsFixed(5)}',
                      style: const TextStyle(
                          fontSize: 11, color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: isLoading ? null : onConfirm,
            icon: const Icon(Icons.check_circle_outline, size: 18),
            label: Text(confirmLabel),
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 50),
            ),
          ),
        ],
      ),
    );
  }
}


class _PinWidget extends StatelessWidget {
  const _PinWidget();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: AppColors.red,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: AppColors.red.withValues(alpha: 0.4),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: const Icon(Icons.location_on, color: Colors.white, size: 22),
        ),
        CustomPaint(
          size: const Size(12, 10),
          painter: _PinTailPainter(),
        ),
      ],
    );
  }
}

class _PinTailPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = AppColors.red;
    final path = ui.Path()
      ..moveTo(0, 0)
      ..lineTo(size.width / 2, size.height)
      ..lineTo(size.width, 0)
      ..close();
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter old) => false;
}

class PickedLocation {
  final LatLng latLng;
  final String address;

  const PickedLocation({required this.latLng, required this.address});
}
