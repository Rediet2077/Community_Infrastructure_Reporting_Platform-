profileimport 'package:flutter/material.dart';
import 'package:mobile_apps/core/theme/app_theme.dart';
import 'package:mobile_apps/core/routes/app_routes.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildProfileHeader(),
            const SizedBox(height: 12),
            _buildMenuSection(context),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Container(
      width: double.infinity,
      color: AppColors.white,
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
      child: Column(
        children: [
          // Avatar
          Container(
            width: 80,
            height: 80,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFFEDE7F6),
            ),
            child: const Icon(Icons.person, size: 44, color: AppColors.purple),
          ),
          const SizedBox(height: 12),
          const Text(
            'Selam Abebe',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'selam.abebe@email.com',
            style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 2),
          Text(
            '+251 91 234 5678',
            style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 12),
          const _StatusChip(label: '● Resolved', color: AppColors.resolved),
        ],
      ),
    );
  }

  Widget _buildMenuSection(BuildContext context) {
    final menuItems = [
      _MenuItem(
        icon: Icons.edit_outlined,
        label: 'Edit Profile',
        onTap: () {},
      ),
      _MenuItem(
        icon: Icons.language_outlined,
        label: 'Language',
        trailing: 'English',
        onTap: () {},
      ),
      _MenuItem(
        icon: Icons.notifications_outlined,
        label: 'Notifications',
        onTap: () => Navigator.pushNamed(context, AppRoutes.notifications),
      ),
      _MenuItem(
        icon: Icons.help_outline,
        label: 'Help & Support',
        onTap: () {},
      ),
      _MenuItem(
        icon: Icons.info_outline,
        label: 'About CIRP',
        onTap: () => _showAboutDialog(context),
      ),
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          ...menuItems.asMap().entries.map((entry) {
            final index = entry.key;
            final item = entry.value;
            return Column(
              children: [
                _buildMenuItem(item),
                if (index < menuItems.length - 1)
                  const Divider(
                    height: 1,
                    indent: 56,
                    color: AppColors.divider,
                  ),
              ],
            );
          }),
          const Divider(height: 1, color: AppColors.divider),
          _buildMenuItem(
            _MenuItem(
              icon: Icons.logout,
              label: 'Logout',
              iconColor: AppColors.red,
              labelColor: AppColors.red,
              onTap: () => _showLogoutDialog(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(_MenuItem item) {
    return ListTile(
      leading: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: (item.iconColor ?? AppColors.primary).withOpacity(0.08),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(
          item.icon,
          color: item.iconColor ?? AppColors.primary,
          size: 20,
        ),
      ),
      title: Text(
        item.label,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: item.labelColor ?? AppColors.textPrimary,
        ),
      ),
      trailing: item.trailing != null
          ? Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  item.trailing!,
                  style: TextStyle(
                    fontSize: 13,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(width: 4),
                const Icon(Icons.chevron_right,
                    size: 18, color: AppColors.textSecondary),
              ],
            )
          : const Icon(Icons.chevron_right,
              size: 18, color: AppColors.textSecondary),
      onTap: item.onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Logout',
            style:
                TextStyle(fontWeight: FontWeight.w700, color: AppColors.red)),
        content: const Text('Are you sure you want to log out?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel',
                style: TextStyle(color: AppColors.textSecondary)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pushNamedAndRemoveUntil(
                  context, AppRoutes.login, (r) => false);
            },
            style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.red,
                minimumSize: const Size(80, 40)),
            child: const Text('Logout'),
          ),
        ],
      ),
    );
  }

  void _showAboutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('About CIRP',
            style: TextStyle(fontWeight: FontWeight.w700)),
        content: const Text(
          'CIRP (Community Infrastructure Reporting Platform) helps citizens report and track infrastructure problems in their community. Together we can build a better city.',
          style: TextStyle(fontSize: 13, height: 1.6),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            style: ElevatedButton.styleFrom(minimumSize: const Size(80, 40)),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  final String label;
  final Color color;

  const _StatusChip({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _MenuItem {
  final IconData icon;
  final String label;
  final String? trailing;
  final Color? iconColor;
  final Color? labelColor;
  final VoidCallback onTap;

  const _MenuItem({
    required this.icon,
    required this.label,
    this.trailing,
    this.iconColor,
    this.labelColor,
    required this.onTap,
  });
}
