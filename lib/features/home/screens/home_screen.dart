import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/core/routes/app_routes.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/features/reports/screens/report_details_screen.dart';
import 'package:cirp/shared/widgets/status_badge.dart';
import 'package:cirp/core/services/api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _userName = '';
  List<dynamic> _recentReports = [];
  bool _isLoading = true;
  int _unreadNotifications = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    
    // Load user name from storage
    final prefs = await SharedPreferences.getInstance();
    final firstName = prefs.getString('user_first_name') ?? '';
    final lastName = prefs.getString('user_last_name') ?? '';
    
    // Fetch recent reports from API
    final reportsResult = await ApiService.getReports(pageSize: 5);
    
    // Fetch notifications to get unread count
    final notificationsResult = await ApiService.getNotifications();
    
    setState(() {
      _userName = firstName.isNotEmpty ? '$firstName $lastName'.trim() : 'User';
      
      if (reportsResult['success'] == true) {
        _recentReports = reportsResult['data'] ?? [];
      }
      
      if (notificationsResult['success'] == true) {
        _unreadNotifications = notificationsResult['unread_count'] ?? 0;
      }
      
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }
    
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadData,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(context, l10n),
                _buildBanner(),
                const SizedBox(height: 20),
                _buildQuickActions(context, l10n),
                const SizedBox(height: 24),
                _buildRecentReports(context, l10n),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, AppLocalizations l10n) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: const Icon(Icons.menu,
                color: AppColors.textPrimary, size: 26),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Hello, $_userName!',
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textPrimary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  l10n.homeSubtitle,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                    height: 1.4,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          Stack(
            clipBehavior: Clip.none,
            children: [
              IconButton(
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
                icon: const Icon(Icons.notifications_outlined,
                    color: AppColors.textPrimary, size: 26),
                onPressed: () =>
                    Navigator.pushNamed(context, AppRoutes.notifications),
              ),
              if (_unreadNotifications > 0)
                Positioned(
                  top: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: AppColors.red,
                      shape: BoxShape.circle,
                    ),
                    constraints: const BoxConstraints(
                      minWidth: 18,
                      minHeight: 18,
                    ),
                    child: Text(
                      _unreadNotifications > 9 ? '9+' : '$_unreadNotifications',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBanner() {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 14, 16, 0),
      height: 120,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        gradient: const LinearGradient(
          colors: [Color(0xFF1B5E20), Color(0xFF2E7D32), Color(0xFF388E3C)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Stack(
        clipBehavior: Clip.hardEdge,
        children: [
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: CustomPaint(
              size: const Size(double.infinity, 60),
              painter: _BannerSkylinePainter(),
            ),
          ),
          Positioned(
            right: -10,
            top: -10,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withValues(alpha: 0.07),
              ),
            ),
          ),
          Positioned(
            right: 18,
            top: 8,
            child: Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withValues(alpha: 0.10),
              ),
              child: const Icon(Icons.eco, color: Colors.white, size: 24),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions(BuildContext context, AppLocalizations l10n) {
    final actions = [
      _ActionItem(
        icon: Icons.report_problem_outlined,
        label: l10n.reportProblem,
        sublabel: l10n.reportProblemSub,
        color: AppColors.primary,
        onTap: () =>
            Navigator.pushNamed(context, AppRoutes.reportProblem),
      ),
      _ActionItem(
        icon: Icons.assignment_outlined,
        label: l10n.myReports,
        sublabel: l10n.myReportsSub,
        color: AppColors.blue,
        onTap: () => Navigator.pushNamed(context, AppRoutes.myReports),
      ),
      _ActionItem(
        icon: Icons.notifications_outlined,
        label: l10n.notifications,
        sublabel: l10n.notificationsSub,
        color: AppColors.orange,
        onTap: () =>
            Navigator.pushNamed(context, AppRoutes.notifications),
      ),
      _ActionItem(
        icon: Icons.person_outline,
        label: l10n.profile,
        sublabel: l10n.profileSub,
        color: AppColors.purple,
        onTap: () => Navigator.pushNamed(context, AppRoutes.profile),
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Row(
            children: [
              _QuickActionCard(item: actions[0]),
              const SizedBox(width: 10),
              _QuickActionCard(item: actions[1]),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              _QuickActionCard(item: actions[2]),
              const SizedBox(width: 10),
              _QuickActionCard(item: actions[3]),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildRecentReports(BuildContext context, AppLocalizations l10n) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                l10n.recentReports,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
              GestureDetector(
                onTap: () =>
                    Navigator.pushNamed(context, AppRoutes.myReports),
                child: Text(
                  l10n.viewAll,
                  style: const TextStyle(
                    fontSize: 13,
                    color: AppColors.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (_recentReports.isEmpty)
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Text(
              'No reports yet',
              style: const TextStyle(
                color: AppColors.textSecondary,
                fontSize: 14,
              ),
            ),
          )
        else
          ..._recentReports.map(
            (report) => _RecentReportCard(
              title: report['title'] ?? 'Untitled',
              status: report['status'] ?? 'pending',
              date: report['created_at'] ?? '',
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (_) => const ReportDetailsScreen()),
              ),
            ),
          ),
      ],
    );
  }
}

class _ActionItem {
  final IconData icon;
  final String label;
  final String sublabel;
  final Color color;
  final VoidCallback onTap;

  const _ActionItem({
    required this.icon,
    required this.label,
    required this.sublabel,
    required this.color,
    required this.onTap,
  });
}

class _QuickActionCard extends StatelessWidget {
  final _ActionItem item;

  const _QuickActionCard({required this.item});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: item.onTap,
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.white,
            borderRadius: BorderRadius.circular(14),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: item.color.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(11),
                ),
                child: Icon(item.icon, color: item.color, size: 22),
              ),
              const SizedBox(height: 10),
              Text(
                item.label,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                  height: 1.2,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Text(
                item.sublabel,
                style: const TextStyle(
                  fontSize: 10,
                  color: AppColors.textSecondary,
                  height: 1.3,
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RecentReportCard extends StatelessWidget {
  final String title;
  final String status;
  final String date;
  final VoidCallback onTap;

  const _RecentReportCard({
    required this.title,
    required this.status,
    required this.date,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 10),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 6,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: AppColors.background,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.image_outlined,
                  color: AppColors.textSecondary, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 5),
                  StatusBadge(status: status, small: true),
                  const SizedBox(height: 3),
                  Text(date,
                      style: const TextStyle(
                          fontSize: 10,
                          color: AppColors.textSecondary)),
                ],
              ),
            ),
            const Icon(Icons.chevron_right,
                color: AppColors.textSecondary, size: 18),
          ],
        ),
      ),
    );
  }
}

class _BannerSkylinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.12);
    final buildings = [
      [0.0, 0.3, 0.06], [0.07, 0.1, 0.07], [0.15, 0.22, 0.08],
      [0.24, 0.0, 0.10], [0.35, 0.18, 0.07], [0.43, 0.28, 0.06],
      [0.50, 0.08, 0.09], [0.60, 0.20, 0.08], [0.69, 0.12, 0.07],
      [0.77, 0.25, 0.08], [0.86, 0.15, 0.07], [0.94, 0.30, 0.06],
    ];
    for (final b in buildings) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(b[0] * size.width, b[1] * size.height,
              b[2] * size.width, (1 - b[1]) * size.height),
          const Radius.circular(2),
        ),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter _) => false;
}
