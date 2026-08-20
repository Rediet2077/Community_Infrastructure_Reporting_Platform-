import 'package:flutter/material.dart';
import 'package:cirp/core/theme/app_theme.dart';

class CirpLogo extends StatelessWidget {
  final double size;

  const CirpLogo({super.key, this.size = 90});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.white,
            border: Border.all(color: AppColors.primary, width: 3),
            boxShadow: [
              BoxShadow(
                color: AppColors.primary.withValues(alpha: 0.15),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipOval(
            child: Stack(
              alignment: Alignment.center,
              children: [
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: size * 0.55,
                  child: Container(
                    color: AppColors.primary.withValues(alpha: 0.06),
                  ),
                ),
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: CustomPaint(
                    size: Size(size, size * 0.35),
                    painter: _SkylinePainter(),
                  ),
                ),
                Positioned(
                  top: size * 0.1,
                  child: Icon(
                    Icons.people_alt_rounded,
                    color: AppColors.primary,
                    size: size * 0.38,
                  ),
                ),
                Positioned(
                  top: size * 0.08,
                  right: size * 0.1,
                  child: Icon(
                    Icons.eco,
                    color: AppColors.accent,
                    size: size * 0.22,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          'CIRP',
          style: TextStyle(
            fontSize: size * 0.30,
            fontWeight: FontWeight.w900,
            color: AppColors.primary,
            letterSpacing: 4,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          'COMMUNITY INFRASTRUCTURE',
          style: TextStyle(
            fontSize: size * 0.095,
            fontWeight: FontWeight.w600,
            color: AppColors.textSecondary,
            letterSpacing: 1.2,
          ),
        ),
        Text(
          'REPORTING PLATFORM',
          style: TextStyle(
            fontSize: size * 0.095,
            fontWeight: FontWeight.w600,
            color: AppColors.textSecondary,
            letterSpacing: 1.2,
          ),
        ),
      ],
    );
  }
}

class _SkylinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary.withValues(alpha: 0.18);
    final buildings = [
      [0.0, 0.4, 0.08],
      [0.09, 0.15, 0.10],
      [0.20, 0.30, 0.09],
      [0.30, 0.05, 0.12],
      [0.43, 0.20, 0.09],
      [0.53, 0.35, 0.08],
      [0.62, 0.0, 0.11],
      [0.74, 0.25, 0.09],
      [0.84, 0.15, 0.08],
      [0.93, 0.30, 0.07],
    ];
    for (final b in buildings) {
      final left = b[0] * size.width;
      final top = b[1] * size.height;
      final w = b[2] * size.width;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(left, top, w, size.height - top),
          const Radius.circular(1),
        ),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter _) => false;
}
