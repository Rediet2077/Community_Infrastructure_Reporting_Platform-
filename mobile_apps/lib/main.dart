import 'package:flutter/material.dart';
import 'package:mobile_apps/core/routes/app_routes.dart';
import 'package:mobile_apps/core/theme/app_theme.dart';
import 'package:mobile_apps/features/auth/screens/login_screen.dart';

void main() {
  runApp(const CirpApp());
}

class CirpApp extends StatelessWidget {
  const CirpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CIRP',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routes: AppRoutes.routes,
      home: const LoginScreen(),
    );
  }
}
