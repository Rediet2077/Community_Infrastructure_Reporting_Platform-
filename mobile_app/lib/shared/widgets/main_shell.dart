import 'package:flutter/material.dart';
import 'package:cirp/core/routes/app_routes.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/features/home/screens/home_screen.dart';
import 'package:cirp/features/location/screens/map_screen.dart';
import 'package:cirp/features/reports/screens/my_reports_screen.dart';
import 'package:cirp/features/profile/screens/profile_screen.dart';
import 'package:cirp/features/reports/screens/report_problem_screen.dart';
import 'package:cirp/generated/app_localizations.dart';
import 'package:cirp/shared/widgets/bottom_nav_bar.dart';
import 'package:cirp/shared/widgets/cirp_logo.dart';

class MainShell extends StatefulWidget {
  final int initialIndex;

  const MainShell({super.key, this.initialIndex = 0});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  late int _currentIndex;

  final List<Widget> _screens = const [
    HomeScreen(),
    MapScreen(),
    SizedBox(),
    MyReportsScreen(),
    ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  void _onTabTap(int index) {
    if (index == 2) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const ReportProblemScreen()),
      );
      return;
    }
    setState(() => _currentIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: _buildDrawer(context),
      body: IndexedStack(
        index: _currentIndex == 2 ? 0 : _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: CirpBottomNavBar(
        currentIndex: _currentIndex,
        onTap: _onTabTap,
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return Drawer(
      backgroundColor: AppColors.white,
      child: SafeArea(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 28),
              color: AppColors.primary,
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const CirpLogo(size: 56),
                  const SizedBox(height: 16),
                  const Text('Selam Abebe',
                      style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
                  const Text('selam.abebe@email.com',
                      style: TextStyle(color: Colors.white70, fontSize: 12)),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(vertical: 8),
                children: [
                  _DrawerItem(icon: Icons.home_outlined, label: l10n.navHome,
                      onTap: () { Navigator.pop(context); setState(() => _currentIndex = 0); }),
                  _DrawerItem(icon: Icons.map_outlined, label: l10n.mapTitle,
                      onTap: () { Navigator.pop(context); setState(() => _currentIndex = 1); }),
                  _DrawerItem(icon: Icons.assignment_outlined, label: l10n.myReportsTitle,
                      onTap: () { Navigator.pop(context); setState(() => _currentIndex = 3); }),
                  _DrawerItem(icon: Icons.notifications_outlined, label: l10n.notificationsTitle,
                      onTap: () { Navigator.pop(context); Navigator.pushNamed(context, AppRoutes.notifications); }),
                  _DrawerItem(icon: Icons.person_outline, label: l10n.profile,
                      onTap: () { Navigator.pop(context); setState(() => _currentIndex = 4); }),
                  const Divider(height: 1, color: AppColors.divider, indent: 20, endIndent: 20),
                  const SizedBox(height: 8),
                  _DrawerItem(icon: Icons.logout, label: l10n.logout, color: AppColors.red,
                      onTap: () { Navigator.pop(context); Navigator.pushNamedAndRemoveUntil(context, AppRoutes.login, (_) => false); }),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16),
              child: Text('CIRP v1.0.0',
                  style: TextStyle(fontSize: 11, color: AppColors.textHint)),
            ),
          ],
        ),
      ),
    );
  }
}

class _DrawerItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color? color;

  const _DrawerItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final c = color ?? AppColors.textPrimary;
    return ListTile(
      leading: Icon(icon, color: c, size: 22),
      title: Text(label,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: c)),
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
    );
  }
}
