import 'package:flutter/material.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/features/reports/screens/report_details_screen.dart';
import 'package:cirp/shared/widgets/status_badge.dart';
import 'package:cirp/core/services/api_service.dart';

class MyReportsScreen extends StatefulWidget {
  const MyReportsScreen({super.key});

  @override
  State<MyReportsScreen> createState() => _MyReportsScreenState();
}

class _MyReportsScreenState extends State<MyReportsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<dynamic> _allReports = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _loadReports();
  }

  Future<void> _loadReports() async {
    setState(() => _isLoading = true);
    
    final result = await ApiService.getMyReports();
    
    setState(() {
      if (result['success'] == true) {
        _allReports = result['data'] ?? [];
      }
      _isLoading = false;
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  List<dynamic> _filtered(int index) {
    switch (index) {
      case 0:
        return _allReports;
      case 1:
        return _allReports.where((r) {
          final s = (r['status'] as String? ?? '').toLowerCase();
          return s == 'in_progress' || s == 'under_review' || s == 'in progress' || s == 'under review';
        }).toList();
      case 2:
        return _allReports
            .where((r) =>
                (r['status'] as String? ?? '').toLowerCase() == 'resolved')
            .toList();
      case 3:
        return _allReports
            .where((r) =>
                (r['status'] as String? ?? '').toLowerCase() == 'rejected')
            .toList();
      default:
        return _allReports;
    }
  }
  
  Color _getStatusColor(String status) {
    final s = status.toLowerCase();
    if (s == 'resolved' || s == 'completed') return AppColors.resolved;
    if (s == 'in_progress' || s == 'in progress') return AppColors.inProgress;
    if (s == 'under_review' || s == 'under review') return AppColors.underReview;
    if (s == 'rejected') return AppColors.red;
    return AppColors.orange; // Default color for pending/unknown statuses
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final tabs = [
      l10n.tabAll,
      l10n.tabInProgress,
      l10n.tabResolved,
      l10n.tabRejected,
    ];

    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          automaticallyImplyLeading: Navigator.canPop(context),
          title: Text(l10n.myReportsTitle),
          backgroundColor: AppColors.white,
        ),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        automaticallyImplyLeading: Navigator.canPop(context),
        title: Text(l10n.myReportsTitle),
        backgroundColor: AppColors.white,
        elevation: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            color: AppColors.white,
            child: TabBar(
              controller: _tabController,
              isScrollable: true,
              tabAlignment: TabAlignment.start,
              labelColor: AppColors.primary,
              unselectedLabelColor: AppColors.textSecondary,
              indicatorColor: AppColors.primary,
              indicatorWeight: 2.5,
              labelStyle: const TextStyle(
                  fontSize: 13, fontWeight: FontWeight.w700),
              unselectedLabelStyle: const TextStyle(
                  fontSize: 13, fontWeight: FontWeight.w400),
              tabs: tabs.map((t) => Tab(text: t)).toList(),
            ),
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _loadReports,
        child: TabBarView(
          controller: _tabController,
          children: List.generate(4, (index) {
            final reports = _filtered(index);
            if (reports.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.assignment_outlined,
                        size: 56, color: AppColors.textHint),
                    const SizedBox(height: 12),
                    Text(
                      l10n.noTabReports(tabs[index]),
                      style: const TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 15),
                    ),
                  ],
                ),
              );
            }
            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: reports.length,
              itemBuilder: (context, i) {
                final r = reports[i];
                return _ReportCard(
                  title: r['title'] ?? 'Untitled',
                  status: r['status'] ?? 'pending',
                  date: r['created_at'] ?? '',
                  accentColor: _getStatusColor(r['status'] ?? ''),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (_) => const ReportDetailsScreen()),
                  ),
                );
              },
            );
          }),
        ),
      ),
    );
  }
}

class _ReportCard extends StatelessWidget {
  final String title;
  final String status;
  final String date;
  final Color accentColor;
  final VoidCallback onTap;

  const _ReportCard({
    required this.title,
    required this.status,
    required this.date,
    required this.accentColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 80,
              height: 90,
              decoration: BoxDecoration(
                color: accentColor.withValues(alpha: 0.10),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(14),
                  bottomLeft: Radius.circular(14),
                ),
                border: Border(
                  left: BorderSide(color: accentColor, width: 3),
                ),
              ),
              child: Icon(Icons.image_outlined,
                  color: accentColor.withValues(alpha: 0.5), size: 30),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                        height: 1.3,
                      ),
                    ),
                    const SizedBox(height: 6),
                    StatusBadge(status: status, small: true),
                    const SizedBox(height: 6),
                    Text(date,
                        style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.textSecondary)),
                  ],
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 16, right: 8),
              child: const Icon(Icons.chevron_right,
                  color: AppColors.textSecondary, size: 20),
            ),
          ],
        ),
      ),
    );
  }
}
