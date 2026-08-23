import 'package:flutter/material.dart';
import 'package:cirp/features/auth/screens/login_screen.dart';
import 'package:cirp/features/auth/screens/register_screen.dart';
import 'package:cirp/features/reports/screens/report_details_screen.dart';
import 'package:cirp/features/reports/screens/report_problem_screen.dart';
import 'package:cirp/features/notifications/screens/notifications_screen.dart';
import 'package:cirp/shared/widgets/main_shell.dart';

class AppRoutes {
  static const String splash = '/';
  static const String login = '/login';
  static const String register = '/register';
  static const String otp = '/otp';
  static const String home = '/home';
  static const String map = '/map';
  static const String reportProblem = '/report-problem';
  static const String myReports = '/my-reports';
  static const String reportDetails = '/report-details';
  static const String notifications = '/notifications';
  static const String profile = '/profile';

  static Map<String, WidgetBuilder> get routes => {
        login: (context) => const LoginScreen(),
        register: (context) => const RegisterScreen(),
        home: (context) => const MainShell(initialIndex: 0),
        map: (context) => const MainShell(initialIndex: 1),
        reportProblem: (context) => const ReportProblemScreen(),
        myReports: (context) => const MainShell(initialIndex: 3),
        reportDetails: (context) => const ReportDetailsScreen(),
        notifications: (context) => const NotificationsScreen(),
        profile: (context) => const MainShell(initialIndex: 4),
      };
}
