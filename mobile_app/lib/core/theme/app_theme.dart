import 'package:flutter/material.dart';

class AppColors {
  static const Color primary      = Color(0xFF1B5E20);
  static const Color primaryDark  = Color(0xFF145214);
  static const Color primaryLight = Color(0xFF2E7D32);
  static const Color accent       = Color(0xFFFF8F00);

  static const Color green        = Color(0xFF2E7D32);
  static const Color orange       = Color(0xFFFF9800);
  static const Color blue         = Color(0xFF1976D2);
  static const Color purple       = Color(0xFF7B1FA2);
  static const Color red          = Color(0xFFD32F2F);

  static const Color background   = Color(0xFFF4F6F4);
  static const Color white        = Color(0xFFFFFFFF);
  static const Color inputFill    = Color(0xFFF9FAFB);
  static const Color cardBg       = Color(0xFFFFFFFF);

  static const Color textPrimary   = Color(0xFF1A2E1A);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textHint      = Color(0xFF9CA3AF);

  static const Color divider      = Color(0xFFE5E7EB);
  static const Color secondary    = Color(0xFF388E3C);

  static const Color inProgress   = Color(0xFF1976D2);
  static const Color underReview  = Color(0xFFFF9800);
  static const Color resolved     = Color(0xFF2E7D32);
  static const Color rejected     = Color(0xFFD32F2F);

  static const Color mapRed       = Color(0xFFD32F2F);
  static const Color mapBlue      = Color(0xFF1976D2);
  static const Color mapGreen     = Color(0xFF2E7D32);
  static const Color mapOrange    = Color(0xFFFF9800);
  static const Color mapPurple    = Color(0xFF7B1FA2);

  static const Color severityLow    = Color(0xFF2E7D32);
  static const Color severityMedium = Color(0xFFFF9800);
  static const Color severityHigh   = Color(0xFFD32F2F);
}

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
        brightness: Brightness.light,
      ),
      scaffoldBackgroundColor: AppColors.background,
      fontFamily: 'Roboto',
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.white,
        foregroundColor: AppColors.textPrimary,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
        iconTheme: IconThemeData(color: AppColors.textPrimary),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.inputFill,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.divider),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.divider),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide:
              const BorderSide(color: AppColors.primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.red),
        ),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: const TextStyle(
          color: AppColors.textHint,
          fontSize: 14,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          minimumSize: const Size(double.infinity, 52),
          elevation: 0,
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          minimumSize: const Size(double.infinity, 52),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
        ),
      ),
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected)
              ? AppColors.primary
              : Colors.transparent,
        ),
        checkColor: WidgetStateProperty.all(AppColors.white),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
        side: const BorderSide(color: AppColors.divider),
      ),
    );
  }
}
