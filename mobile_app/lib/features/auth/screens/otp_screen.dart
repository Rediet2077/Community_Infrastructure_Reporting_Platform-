import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:cirp/core/theme/app_theme.dart';
import 'package:cirp/core/routes/app_routes.dart';
import 'package:cirp/core/services/email_service.dart';
import 'package:cirp/features/language/language_provider.dart';
import 'package:cirp/generated/app_localizations.dart';

class OtpScreen extends StatefulWidget {
  final String email;
  const OtpScreen({super.key, required this.email});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  static const int _otpLength = 6;
  static const int _countdownSeconds = 60;

  final List<TextEditingController> _controllers =
      List.generate(_otpLength, (_) => TextEditingController());
  final List<FocusNode> _focusNodes =
      List.generate(_otpLength, (_) => FocusNode());

  int _secondsLeft = _countdownSeconds;
  Timer? _timer;

  bool _isSending = false;
  bool _isVerifying = false;
  bool _hasError = false;
  bool _verified = false;
  String _errorMessage = '';
  bool _otpSent = false;
  String _currentOtp = '';

  @override
  void initState() {
    super.initState();
    _sendOtp();
  }

  @override
  void dispose() {
    for (final c in _controllers) c.dispose();
    for (final f in _focusNodes) f.dispose();
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    setState(() {
      _isSending = true;
      _hasError = false;
      _errorMessage = '';
    });

    _currentOtp = EmailService.generateOtp();

    final result = await EmailService.sendOtp(
      toEmail: widget.email,
      otp: _currentOtp,
    );

    if (!mounted) return;

    if (result.success) {
      setState(() {
        _isSending = false;
        _otpSent = true;
      });
      _startCountdown();
      _showSnack('Verification code sent to ${widget.email}',
          success: true);
    } else {
      setState(() {
        _isSending = false;
        _hasError = true;
        _errorMessage =
            'Could not send email: ${result.message}';
      });
    }
  }

  void _startCountdown() {
    _timer?.cancel();
    setState(() => _secondsLeft = _countdownSeconds);
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) {
        t.cancel();
        return;
      }
      if (_secondsLeft <= 0) {
        t.cancel();
      } else {
        setState(() => _secondsLeft--);
      }
    });
  }

  Future<void> _resend() async {
    if (_secondsLeft > 0) return;
    for (final c in _controllers) c.clear();
    setState(() {
      _hasError = false;
      _errorMessage = '';
    });
    _focusNodes[0].requestFocus();
    await _sendOtp();
  }

  String get _otpValue => _controllers.map((c) => c.text).join();
  bool get _isFilled => _otpValue.length == _otpLength;

  void _onDigitChanged(String value, int index) {
    setState(() {
      _hasError = false;
      _errorMessage = '';
    });
    if (value.length == 1) {
      if (index < _otpLength - 1) {
        _focusNodes[index + 1].requestFocus();
      } else {
        _focusNodes[index].unfocus();
        if (_isFilled) _verify();
      }
    } else if (value.isEmpty && index > 0) {
      _focusNodes[index - 1].requestFocus();
    }
  }

  void _onKeyEvent(KeyEvent event, int index) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.backspace &&
        _controllers[index].text.isEmpty &&
        index > 0) {
      _focusNodes[index - 1].requestFocus();
      _controllers[index - 1].clear();
    }
  }

  Future<void> _handlePaste() async {
    final data = await Clipboard.getData('text/plain');
    final digits =
        (data?.text?.trim() ?? '').replaceAll(RegExp(r'\D'), '');
    if (digits.length >= _otpLength) {
      for (int i = 0; i < _otpLength; i++) {
        _controllers[i].text = digits[i];
      }
      _focusNodes.last.unfocus();
      setState(() {});
      if (_isFilled) _verify();
    }
  }

  Future<void> _verify() async {
    if (!_isFilled || _isVerifying || !_otpSent) return;
    final l10n = AppLocalizations.of(context);

    setState(() {
      _isVerifying = true;
      _hasError = false;
      _errorMessage = '';
    });

    await Future.delayed(const Duration(milliseconds: 600));
    if (!mounted) return;

    if (_otpValue != _currentOtp) {
      setState(() {
        _isVerifying = false;
        _hasError = true;
        _errorMessage = l10n.invalidOtp;
      });
      for (final c in _controllers) c.clear();
      _focusNodes[0].requestFocus();
      return;
    }

    setState(() {
      _isVerifying = false;
      _verified = true;
    });

    await Future.delayed(const Duration(milliseconds: 800));
    if (mounted) {
      Navigator.pushReplacementNamed(context, AppRoutes.home);
    }
  }

  void _showSnack(String message, {bool success = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: success ? AppColors.green : AppColors.red,
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.all(16),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: AppBar(
        backgroundColor: AppColors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding:
              const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 8),
              if (_verified)
                _SuccessView(message: l10n.otpSuccess)
              else ...[
                _EmailIcon(isSending: _isSending),
                const SizedBox(height: 28),
                Text(
                  l10n.verifyEmail,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Text(
                  l10n.otpSentTo(widget.email),
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColors.textSecondary,
                    height: 1.6,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 6),
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Text(
                    l10n.changeEmail,
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
                const SizedBox(height: 36),
                if (_isSending)
                  const Column(
                    children: [
                      CircularProgressIndicator(color: AppColors.primary),
                      SizedBox(height: 12),
                      Text(
                        'Sending verification code...',
                        style: TextStyle(
                          fontSize: 13,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  )
                else if (_hasError && !_otpSent)
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppColors.red.withValues(alpha: 0.06),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                          color: AppColors.red.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.error_outline,
                            color: AppColors.red, size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            _errorMessage,
                            style: const TextStyle(
                                fontSize: 13, color: AppColors.red),
                          ),
                        ),
                      ],
                    ),
                  )
                else ...[
                  GestureDetector(
                    onLongPress: _handlePaste,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(_otpLength, (i) {
                        return _OtpBox(
                          controller: _controllers[i],
                          focusNode: _focusNodes[i],
                          hasError: _hasError,
                          onChanged: (v) => _onDigitChanged(v, i),
                          onKeyEvent: (e) => _onKeyEvent(e, i),
                        );
                      }),
                    ),
                  ),
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    height: _hasError ? 36 : 0,
                    child: _hasError
                        ? Padding(
                            padding: const EdgeInsets.only(top: 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.error_outline,
                                    color: AppColors.red, size: 16),
                                const SizedBox(width: 6),
                                Flexible(
                                  child: Text(
                                    _errorMessage,
                                    style: const TextStyle(
                                      color: AppColors.red,
                                      fontSize: 13,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          )
                        : const SizedBox.shrink(),
                  ),
                  const SizedBox(height: 28),
                  ElevatedButton(
                    onPressed:
                        (_isFilled && !_isVerifying) ? _verify : null,
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 52),
                      disabledBackgroundColor:
                          AppColors.primary.withValues(alpha: 0.35),
                      disabledForegroundColor: AppColors.white,
                    ),
                    child: _isVerifying
                        ? const SizedBox(
                            width: 22,
                            height: 22,
                            child: CircularProgressIndicator(
                              strokeWidth: 2.5,
                              color: AppColors.white,
                            ),
                          )
                        : Text(l10n.verifyCode),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    l10n.didntReceive,
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  _secondsLeft > 0
                      ? Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.timer_outlined,
                                size: 16,
                                color: AppColors.textSecondary),
                            const SizedBox(width: 4),
                            Text(
                              l10n.resendIn(_secondsLeft.toString()),
                              style: const TextStyle(
                                fontSize: 13,
                                color: AppColors.textSecondary,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        )
                      : GestureDetector(
                          onTap: _resend,
                          child: Text(
                            l10n.resendCode,
                            style: const TextStyle(
                              fontSize: 14,
                              color: AppColors.primary,
                              fontWeight: FontWeight.w700,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                  const SizedBox(height: 36),
                  _CountdownRing(
                    secondsLeft: _secondsLeft,
                    total: _countdownSeconds,
                  ),
                ],
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _OtpBox extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode focusNode;
  final bool hasError;
  final ValueChanged<String> onChanged;
  final ValueChanged<KeyEvent> onKeyEvent;

  const _OtpBox({
    required this.controller,
    required this.focusNode,
    required this.hasError,
    required this.onChanged,
    required this.onKeyEvent,
  });

  @override
  Widget build(BuildContext context) {
    final isFilled = controller.text.isNotEmpty;
    return Container(
      width: 46,
      height: 56,
      margin: const EdgeInsets.symmetric(horizontal: 4),
      decoration: BoxDecoration(
        color: hasError
            ? AppColors.red.withValues(alpha: 0.06)
            : isFilled
                ? AppColors.primary.withValues(alpha: 0.06)
                : AppColors.inputFill,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: hasError
              ? AppColors.red
              : isFilled
                  ? AppColors.primary
                  : AppColors.divider,
          width: isFilled || hasError ? 1.8 : 1.2,
        ),
      ),
      child: KeyboardListener(
        focusNode: FocusNode(),
        onKeyEvent: onKeyEvent,
        child: TextField(
          controller: controller,
          focusNode: focusNode,
          textAlign: TextAlign.center,
          keyboardType: TextInputType.number,
          inputFormatters: [
            FilteringTextInputFormatter.digitsOnly,
            LengthLimitingTextInputFormatter(1),
          ],
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: hasError ? AppColors.red : AppColors.textPrimary,
          ),
          decoration: const InputDecoration(
            border: InputBorder.none,
            enabledBorder: InputBorder.none,
            focusedBorder: InputBorder.none,
            counterText: '',
            contentPadding: EdgeInsets.zero,
            filled: false,
          ),
          onChanged: onChanged,
        ),
      ),
    );
  }
}

class _EmailIcon extends StatelessWidget {
  final bool isSending;
  const _EmailIcon({required this.isSending});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 96,
      height: 96,
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.08),
        shape: BoxShape.circle,
      ),
      child: isSending
          ? const Center(
              child: CircularProgressIndicator(
                color: AppColors.primary,
                strokeWidth: 3,
              ),
            )
          : Stack(
              alignment: Alignment.center,
              children: [
                const Icon(Icons.mark_email_unread_outlined,
                    size: 48, color: AppColors.primary),
                Positioned(
                  bottom: 18,
                  right: 16,
                  child: Container(
                    width: 22,
                    height: 22,
                    decoration: const BoxDecoration(
                      color: AppColors.orange,
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child: Text(
                        '!',
                        style: TextStyle(
                          color: AppColors.white,
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}

class _SuccessView extends StatelessWidget {
  final String message;
  const _SuccessView({required this.message});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 40),
        Container(
          width: 96,
          height: 96,
          decoration: const BoxDecoration(
            color: Color(0xFFE8F5E9),
            shape: BoxShape.circle,
          ),
          child: const Icon(Icons.check_circle_outline,
              size: 56, color: AppColors.green),
        ),
        const SizedBox(height: 16),
        Text(
          message,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: AppColors.green,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Redirecting...',
          style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
        ),
      ],
    );
  }
}

class _CountdownRing extends StatelessWidget {
  final int secondsLeft;
  final int total;

  const _CountdownRing({required this.secondsLeft, required this.total});

  @override
  Widget build(BuildContext context) {
    final progress = secondsLeft / total;
    final color = secondsLeft > 20
        ? AppColors.primary
        : secondsLeft > 10
            ? AppColors.orange
            : AppColors.red;

    return SizedBox(
      width: 64,
      height: 64,
      child: Stack(
        fit: StackFit.expand,
        children: [
          CircularProgressIndicator(
            value: progress,
            strokeWidth: 4,
            backgroundColor: AppColors.divider,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
          Center(
            child: Text(
              '$secondsLeft',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: color,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
