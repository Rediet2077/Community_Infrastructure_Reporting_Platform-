import 'dart:math';
import 'package:mailer/mailer.dart';
import 'package:mailer/smtp_server.dart';

class EmailService {
  static const String _senderEmail = 'cirp.noreply@gmail.com';
  static const String _senderPassword = 'YOUR_APP_PASSWORD_HERE';

  static String generateOtp() {
    final random = Random.secure();
    return List.generate(6, (_) => random.nextInt(10)).join();
  }

  static Future<EmailSendResult> sendOtp({
    required String toEmail,
    required String otp,
  }) async {
    final smtpServer = gmail(_senderEmail, _senderPassword);

    final message = Message()
      ..from = Address(_senderEmail, 'CIRP App')
      ..recipients.add(toEmail)
      ..subject = 'Your CIRP Verification Code'
      ..html = '''
<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f4f6f4; border-radius: 12px;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #1B5E20; font-size: 28px; letter-spacing: 4px; margin: 0;">CIRP</h1>
    <p style="color: #6B7280; font-size: 12px; margin: 4px 0 0;">COMMUNITY INFRASTRUCTURE REPORTING PLATFORM</p>
  </div>
  <div style="background: #ffffff; border-radius: 12px; padding: 28px; text-align: center;">
    <h2 style="color: #1A2E1A; font-size: 20px; margin: 0 0 8px;">Email Verification</h2>
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px;">Use the code below to verify your email address. The code expires in 10 minutes.</p>
    <div style="background: #f4f6f4; border: 2px dashed #1B5E20; border-radius: 12px; padding: 20px; margin: 0 auto 24px; display: inline-block;">
      <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #1B5E20;">$otp</span>
    </div>
    <p style="color: #9CA3AF; font-size: 12px; margin: 0;">If you did not request this code, you can safely ignore this email.</p>
  </div>
  <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 20px;">CIRP &mdash; Community Infrastructure Reporting Platform</p>
</div>
''';

    try {
      final sendReport = await send(message, smtpServer);
      return EmailSendResult(
        success: true,
        message: 'OTP sent to $toEmail (${sendReport.mail.subject})',
      );
    } on MailerException catch (e) {
      return EmailSendResult(
        success: false,
        message: e.problems.map((p) => p.msg).join(', '),
      );
    } catch (e) {
      return EmailSendResult(
        success: false,
        message: e.toString(),
      );
    }
  }
}

class EmailSendResult {
  final bool success;
  final String message;

  const EmailSendResult({required this.success, required this.message});
}
