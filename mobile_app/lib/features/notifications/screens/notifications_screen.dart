import 'package:flutter/material.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/core/services/api_service.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  List<dynamic> _notifications = [];
  bool _isLoading = true;
  int _unreadCount = 0;

  @override
  void initState() {
    super.initState();
    _loadNotifications();
  }

  Future<void> _loadNotifications() async {
    setState(() => _isLoading = true);

    final result = await ApiService.getNotifications();

    setState(() {
      if (result['success'] == true) {
        _notifications = result['data'] ?? [];
        _unreadCount = result['unread_count'] ?? 0;
      }
      _isLoading = false;
    });
  }

  IconData _getIcon(String? type) {
    final t = (type ?? '').toLowerCase();
    if (t.contains('update')) return Icons.update_outlined;
    if (t.contains('resolve')) return Icons.check_circle_outline;
    if (t.contains('progress')) return Icons.info_outline;
    if (t.contains('comment')) return Icons.chat_outlined;
    if (t.contains('assign')) return Icons.person_outline;
    return Icons.notifications_outlined;
  }

  Color _getColor(String? type) {
    final t = (type ?? '').toLowerCase();
    if (t.contains('resolve') || t.contains('complete')) return AppColors.resolved;
    if (t.contains('progress')) return AppColors.inProgress;
    if (t.contains('review')) return AppColors.underReview;
    if (t.contains('comment')) return AppColors.blue;
    return AppColors.primary;
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          automaticallyImplyLeading: Navigator.canPop(context),
          title: Text(l10n.notificationsTitle),
          backgroundColor: AppColors.white,
        ),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        automaticallyImplyLeading: Navigator.canPop(context),
        title: Text(l10n.notificationsTitle),
        backgroundColor: AppColors.white,
        elevation: 0,
        actions: [
          if (_unreadCount > 0)
            TextButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Marked all as read')),
                );
              },
              child: Text(
                l10n.markAllRead,
                style: const TextStyle(
                  color: AppColors.primary,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadNotifications,
        child: _notifications.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.notifications_outlined,
                        size: 64, color: AppColors.textHint),
                    const SizedBox(height: 16),
                    Text(
                      'No notifications yet',
                      style: const TextStyle(
                        fontSize: 16,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              )
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _notifications.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final n = _notifications[index];
                  return _NotificationCard(
                    title: n['title'] ?? 'Notification',
                    body: n['message'] ?? '',
                    time: n['created_at'] ?? '',
                    icon: _getIcon(n['type']),
                    color: _getColor(n['type']),
                    isRead: n['is_read'] ?? false,
                  );
                },
              ),
      ),
    );
  }
}

class _NotificationCard extends StatelessWidget {
  final String title;
  final String body;
  final String time;
  final IconData icon;
  final Color color;
  final bool isRead;

  const _NotificationCard({
    required this.title,
    required this.body,
    required this.time,
    required this.icon,
    required this.color,
    required this.isRead,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isRead ? AppColors.white : color.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isRead ? AppColors.divider : color.withValues(alpha: 0.2),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.12),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: color, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight:
                              isRead ? FontWeight.w500 : FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ),
                    if (!isRead)
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: color,
                          shape: BoxShape.circle,
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  body,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  time,
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.textHint,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
