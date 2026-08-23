import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:cirp/core/routes/app_routes.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/features/auth/screens/login_screen.dart';
import 'package:cirp/features/language/language_provider.dart';
import 'package:cirp/generated/app_localizations.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => LanguageProvider(),
      child: const CirpApp(),
    ),
  );
}

class CirpApp extends StatelessWidget {
  const CirpApp({super.key});

  @override
  Widget build(BuildContext context) {
    final langProvider = context.watch<LanguageProvider>();
    return MaterialApp(
      title: 'CIRP',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      locale: langProvider.locale,
      supportedLocales: const [
        Locale('en'),
        Locale('am'),
        Locale('or'),
        Locale('ti'),
      ],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      localeResolutionCallback: (locale, supportedLocales) {
        if (locale == null) return const Locale('en');
        for (final supported in supportedLocales) {
          if (supported.languageCode == locale.languageCode) {
            return supported;
          }
        }
        return const Locale('en');
      },
      routes: AppRoutes.routes,
      home: const LoginScreen(),
    );
  }
}
