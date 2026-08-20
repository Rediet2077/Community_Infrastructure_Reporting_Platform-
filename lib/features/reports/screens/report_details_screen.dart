import 'package:flutter/material.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/shared/widgets/status_badge.dart';

class ReportDetailsScreen extends StatelessWidget {
  const ReportDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

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
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const StatusBadge(status: 'In Progress'),
            const SizedBox(height: 12),
            const Text(
              'Large pothole on main road',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Report ID: #1023  -  May 30, 2024 - 10:30 AM',
              style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            Container(
              height: 180,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                color: Colors.grey.shade300,
              ),
              child: const Center(
                child: const Icon(Icons.image, size: 50, color: Colors.grey),
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
            _TimelineItem(
              label: l10n.statusSubmitted,
              time: 'May 30, 2024 - 10:30 AM',
              color: AppColors.textSecondary,
              isCompleted: true,
            ),
            _TimelineItem(
              label: l10n.statusUnderReview,
              time: 'May 30, 2024 - 11:15 AM',
              color: AppColors.underReview,
              isCompleted: true,
            ),
            _TimelineItem(
              label: l10n.statusAssigned,
              time: 'May 30, 2024 - 01:09 PM',
              color: AppColors.purple,
              isCompleted: true,
            ),
            _TimelineItem(
              label: l10n.statusInProgress,
              time: 'May 30, 2024 - 09:00 AM',
              color: AppColors.inProgress,
              isActive: true,
              isCompleted: false,
            ),
            _TimelineItem(
              label: l10n.statusCompleted,
              time: '',
              color: AppColors.textHint,
              isCompleted: false,
              isPending: true,
            ),
            _TimelineItem(
              label: l10n.statusConfirmed,
              time: '',
              color: AppColors.textHint,
              isCompleted: false,
              isPending: true,
              isLast: true,
            ),
            const SizedBox(height: 24),
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.phone_outlined, size: 20),
              label: Text(l10n.contactOfficer),
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
                foregroundColor: AppColors.primary,
                side: const BorderSide(color: AppColors.primary),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
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
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 16,
              height: 16,
              decoration: BoxDecoration(
                color: isPending
                    ? AppColors.divider
                    : isActive
                        ? color
                        : isCompleted
                            ? color
                            : AppColors.divider,
                shape: BoxShape.circle,
                border: isActive ? Border.all(color: color, width: 2) : null,
              ),
              child: isCompleted && !isActive
                  ? const Icon(Icons.check, color: Colors.white, size: 10)
                  : null,
            ),
            if (!isLast)
              Container(
                width: 1.5,
                height: 36,
                color:
                    isPending ? AppColors.divider : color.withValues(alpha: 0.3),
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: isActive || isCompleted
                        ? FontWeight.w600
                        : FontWeight.w400,
                    color: isPending
                        ? AppColors.textHint
                        : isActive
                            ? color
                            : AppColors.textPrimary,
                  ),
                ),
                if (time.isNotEmpty)
                  Text(
                    time,
                    style: const TextStyle(
                        fontSize: 11, color: AppColors.textSecondary),
                  ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
