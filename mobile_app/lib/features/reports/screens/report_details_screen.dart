import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/shared/widgets/status_badge.dart';
import 'package:cirp/core/services/api_service.dart';

class ReportDetailsScreen extends StatefulWidget {
  final Map<String, dynamic>? report;
  final String? reportId;

  const ReportDetailsScreen({
    super.key,
    this.report,
    this.reportId,
  });

  @override
  State<ReportDetailsScreen> createState() => _ReportDetailsScreenState();
}

class _ReportDetailsScreenState extends State<ReportDetailsScreen> {
  Map<String, dynamic>? _reportData;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _reportData = widget.report;
    final id = widget.reportId ?? widget.report?['id']?.toString();
    if (id != null && id.isNotEmpty) {
      _fetchDetails(id);
    }
  }

  Future<void> _fetchDetails(String id) async {
    if (_reportData == null) {
      setState(() => _isLoading = true);
    }
    final result = await ApiService.getReportDetails(int.parse(id));
    if (mounted && result['success'] == true && result['data'] != null) {
      setState(() {
        _reportData = result['data'];
        _isLoading = false;
      });
    } else if (mounted) {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _deleteReport() async {
    final reportId = (_reportData?['id'] ?? widget.reportId ?? '').toString();
    if (reportId.isEmpty) return;

    final confirm = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('Remove Report'),
        content: const Text('Are you sure you want to remove this resolved report from your history?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx, rootNavigator: true).pop(false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx, rootNavigator: true).pop(true),
            style: FilledButton.styleFrom(backgroundColor: AppColors.red),
            child: const Text('Remove'),
          ),
        ],
      ),
    );

    if (confirm == true && mounted) {
      final res = await ApiService.deleteReport(reportId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(res['message'] ?? 'Report removed'),
            backgroundColor: res['success'] == true ? AppColors.primary : AppColors.red,
          ),
        );
        Navigator.pop(context, true);
      }
    }
  }

  String _formatDate(String? rawDate) {
    if (rawDate == null || rawDate.isEmpty) return '';
    try {
      final dt = DateTime.parse(rawDate).toLocal();
      return '${dt.year}-${dt.month.toString().padLeft(2, '0')}-${dt.day.toString().padLeft(2, '0')} ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
    } catch (_) {
      return rawDate.split('T')[0];
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final data = _reportData ?? {};
    final statusRaw = (data['status'] as String? ?? 'SUBMITTED').toUpperCase();
    final isResolved = statusRaw == 'RESOLVED';
    final isRejected = statusRaw == 'REJECTED';
    final isInProgress = statusRaw == 'IN_PROGRESS' || statusRaw == 'IN PROGRESS';
    final isAccepted = statusRaw == 'ACCEPTED' || statusRaw == 'ASSIGNED' || isInProgress || isResolved;

    final title = data['title'] ?? 'Infrastructure Issue';
    final reportNo = data['report_number'] ?? (data['id'] != null ? '#${data['id'].toString().substring(0, 8)}' : '#---');
    final dateStr = _formatDate(data['created_at']);
    final desc = data['description'] ?? 'No description provided';
    final address = data['address'] ?? '';
    final completionNotes = data['completion_notes'] ?? data['admin_feedback'] ?? '';

    String? photoUrl;
    if (data['media'] != null && (data['media'] as List).isNotEmpty) {
      final m = (data['media'] as List).first;
      final fileStr = m['file'] ?? m['file_url'];
      if (fileStr != null && fileStr.toString().isNotEmpty) {
        final f = fileStr.toString();
        if (f.startsWith('http') || f.startsWith('data:')) {
          photoUrl = f;
        } else {
          photoUrl = 'http://localhost:8000${f.startsWith('/') ? '' : '/'}$f';
        }
      }
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(l10n.reportDetails),
        backgroundColor: AppColors.white,
        elevation: 0,
        actions: [
          if (isResolved)
            IconButton(
              icon: const Icon(Icons.delete_outline, color: AppColors.red),
              tooltip: 'Remove Report',
              onPressed: _deleteReport,
            ),
        ],
      ),
      body: _isLoading && _reportData == null
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      StatusBadge(status: statusRaw),
                      if (data['priority'] != null)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.orange.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            '${data['priority']} PRIORITY',
                            style: const TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                              color: AppColors.orange,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Report ID: $reportNo  •  $dateStr',
                    style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                  ),
                  if (address.isNotEmpty) ...[
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        const Icon(Icons.location_on_outlined, size: 14, color: AppColors.textSecondary),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            address,
                            style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ],
                  const SizedBox(height: 16),

                  // Description card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppColors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Description',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppColors.textSecondary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          desc,
                          style: const TextStyle(
                            fontSize: 14,
                            color: AppColors.textPrimary,
                            height: 1.4,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Image Evidence Box
                  if (photoUrl != null)
                    Container(
                      height: 200,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        color: Colors.black,
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(14),
                        child: Image.network(
                          photoUrl,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => const Center(
                            child: Icon(Icons.broken_image, size: 40, color: Colors.white54),
                          ),
                        ),
                      ),
                    ),

                  const SizedBox(height: 24),
                  Text(
                    l10n.progressTimeline,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Dynamic Progress Timeline Steps
                  _TimelineItem(
                    label: 'Report Submitted',
                    time: dateStr,
                    color: AppColors.primary,
                    isCompleted: true,
                  ),
                  _TimelineItem(
                    label: 'Under Review / Triage',
                    time: isAccepted ? dateStr : '',
                    color: isAccepted ? AppColors.underReview : AppColors.textHint,
                    isCompleted: isAccepted,
                    isPending: !isAccepted,
                  ),
                  _TimelineItem(
                    label: 'Work In Progress',
                    time: (isInProgress || isResolved) ? _formatDate(data['updated_at']) : '',
                    color: isInProgress ? AppColors.inProgress : (isResolved ? AppColors.primary : AppColors.textHint),
                    isActive: isInProgress,
                    isCompleted: isResolved,
                    isPending: !isInProgress && !isResolved,
                  ),
                  _TimelineItem(
                    label: isRejected ? 'Rejected' : 'Resolved & Completed',
                    time: isResolved ? _formatDate(data['resolved_at'] ?? data['updated_at']) : '',
                    color: isResolved ? AppColors.resolved : (isRejected ? AppColors.red : AppColors.textHint),
                    isCompleted: isResolved,
                    isPending: !isResolved && !isRejected,
                    isLast: true,
                  ),

                  // Resolution / Admin Feedback Box
                  if (completionNotes.toString().isNotEmpty) ...[
                    const SizedBox(height: 20),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isResolved ? AppColors.resolved.withValues(alpha: 0.1) : AppColors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isResolved ? AppColors.resolved.withValues(alpha: 0.4) : AppColors.border,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(
                                isResolved ? Icons.check_circle_outline : Icons.info_outline,
                                size: 18,
                                color: isResolved ? AppColors.resolved : AppColors.textPrimary,
                              ),
                              const SizedBox(width: 6),
                              Text(
                                isResolved ? 'Resolution Update' : 'Admin Notes',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w700,
                                  color: isResolved ? AppColors.resolved : AppColors.textPrimary,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            completionNotes.toString(),
                            style: const TextStyle(
                              fontSize: 13,
                              color: AppColors.textPrimary,
                              height: 1.4,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],

                  // Remove Button for Resolved Reports
                  if (isResolved) ...[
                    const SizedBox(height: 28),
                    FilledButton.icon(
                      onPressed: _deleteReport,
                      icon: const Icon(Icons.delete_outline, size: 20),
                      label: const Text('Remove Report from History'),
                      style: FilledButton.styleFrom(
                        minimumSize: const Size(double.infinity, 50),
                        backgroundColor: AppColors.red,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
    );
  }
}

class _TimelineItem extends StatelessWidget {
  final String label;
  final String time;
  final Color color;
  final bool isCompleted;
  final bool isActive;
  final bool isPending;
  final bool isLast;

  const _TimelineItem({
    required this.label,
    required this.time,
    required this.color,
    this.isCompleted = false,
    this.isActive = false,
    this.isPending = false,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 24,
            child: Column(
              children: [
                Container(
                  width: 20,
                  height: 20,
                  decoration: BoxDecoration(
                    color: isCompleted
                        ? color
                        : (isActive ? color.withValues(alpha: 0.15) : Colors.transparent),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isPending ? AppColors.border : color,
                      width: 2,
                    ),
                  ),
                  child: isCompleted
                      ? const Icon(Icons.check, size: 12, color: Colors.white)
                      : (isActive
                          ? Center(
                              child: Container(
                                width: 8,
                                height: 8,
                                decoration: BoxDecoration(
                                  color: color,
                                  shape: BoxShape.circle,
                                ),
                              ),
                            )
                          : null),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      color: isCompleted ? color : AppColors.border,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: isActive || isCompleted ? FontWeight.w700 : FontWeight.w500,
                      color: isPending ? AppColors.textHint : AppColors.textPrimary,
                    ),
                  ),
                  if (time.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(
                      time,
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
