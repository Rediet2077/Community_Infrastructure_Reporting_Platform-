// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get emailAddress => 'Email address';

  @override
  String get password => 'Password';

  @override
  String get forgotPassword => 'Forgot password?';

  @override
  String get logIn => 'Log In';

  @override
  String get or => 'or';

  @override
  String get selectLanguage => 'Select Language';

  @override
  String get chooseLanguage => 'Choose your preferred language';

  @override
  String get termsPrefix => 'By logging in, you agree to our ';

  @override
  String get termsOfUse => 'Terms of Use';

  @override
  String get and => ' and ';

  @override
  String get privacyPolicy => 'Privacy Policy';

  @override
  String get noAccount => 'Don\'t have an account? ';

  @override
  String get signUp => 'Sign Up';

  @override
  String get enterEmail => 'Enter email';

  @override
  String get enterPassword => 'Enter password';

  @override
  String get createAccount => 'Create Account';

  @override
  String get registerSubtitle =>
      'Join CIRP and help make our community better.';

  @override
  String get fullName => 'Full name';

  @override
  String get phoneNumber => 'Phone number';

  @override
  String get confirmPassword => 'Confirm password';

  @override
  String get enterName => 'Enter name';

  @override
  String get minChars => 'Min 6 characters';

  @override
  String get passwordsMismatch => 'Passwords don\'t match';

  @override
  String get agreeTerms => 'I agree to the ';

  @override
  String get agreePlease => 'Please agree to Terms of Use and Privacy Policy';

  @override
  String get alreadyHaveAccount => 'Already have an account? ';

  @override
  String get greeting => 'Hello, Selam!';

  @override
  String get homeSubtitle => 'Let\'s make our community better together.';

  @override
  String get reportProblem => 'Report Problem';

  @override
  String get reportProblemSub => 'Report infrastructure problems in your area';

  @override
  String get myReports => 'My Reports';

  @override
  String get myReportsSub => 'View and track your submitted reports';

  @override
  String get notifications => 'Notifications';

  @override
  String get notificationsSub => 'View important updates and messages';

  @override
  String get profile => 'Profile';

  @override
  String get profileSub => 'Manage your profile and settings';

  @override
  String get recentReports => 'Recent Reports';

  @override
  String get viewAll => 'View All';

  @override
  String get navHome => 'Home';

  @override
  String get navMap => 'Map';

  @override
  String get navReports => 'Reports';

  @override
  String get navProfile => 'Profile';

  @override
  String get editProfile => 'Edit Profile';

  @override
  String get language => 'Language';

  @override
  String get helpSupport => 'Help & Support';

  @override
  String get aboutCirp => 'About CIRP';

  @override
  String get logout => 'Logout';

  @override
  String get logoutConfirm => 'Are you sure you want to log out?';

  @override
  String get cancel => 'Cancel';

  @override
  String get aboutText =>
      'CIRP (Community Infrastructure Reporting Platform) helps citizens report and track infrastructure problems in their community. Together we can build a better city.';

  @override
  String get ok => 'OK';

  @override
  String get verifyEmail => 'Verify Your Email';

  @override
  String otpSentTo(String email) {
    return 'We sent a 6-digit code to\n$email';
  }

  @override
  String get enterOtp => 'Enter the 6-digit code';

  @override
  String get verifyCode => 'Verify Code';

  @override
  String get didntReceive => 'Didn\'t receive the code?';

  @override
  String get resendCode => 'Resend Code';

  @override
  String resendIn(String seconds) {
    return 'Resend in ${seconds}s';
  }

  @override
  String get invalidOtp => 'Invalid code. Please try again.';

  @override
  String get otpExpired => 'Code expired. Please request a new one.';

  @override
  String get otpSuccess => 'Email verified successfully!';

  @override
  String get changeEmail => 'Change email';

  @override
  String get reportProblemTitle => 'Report Problem';

  @override
  String get stepLocation => 'Location';

  @override
  String get stepDetails => 'Details';

  @override
  String get stepPhoto => 'Photo';

  @override
  String get stepReview => 'Review';

  @override
  String get next => 'Next';

  @override
  String get submit => 'Submit';

  @override
  String get reportSubmitted => 'Report Submitted!';

  @override
  String get reportSubmittedMsg =>
      'Your report has been submitted successfully. We\'ll notify you about its progress.';

  @override
  String get done => 'Done';

  @override
  String get categoryAI => 'Category (AI Suggestion)';

  @override
  String get description => 'Description';

  @override
  String get descriptionHint => 'Describe the problem in detail...';

  @override
  String get change => 'Change';

  @override
  String get changeLocation => 'Change Location';

  @override
  String get addPhoto => 'Add Photo';

  @override
  String get camera => 'Camera';

  @override
  String get gallery => 'Gallery';

  @override
  String get photoInstruction => 'Make sure the problem is clearly visible';

  @override
  String get reviewYourReport => 'Review Your Report';

  @override
  String get photoAttached => 'Photo attached';

  @override
  String get noPhotoAttached => 'No photo attached';

  @override
  String get myReportsTitle => 'My Reports';

  @override
  String get tabAll => 'All';

  @override
  String get tabInProgress => 'In Progress';

  @override
  String get tabResolved => 'Resolved';

  @override
  String get tabRejected => 'Rejected';

  @override
  String noTabReports(String tab) {
    return 'No $tab reports';
  }

  @override
  String get reportDetails => 'Report Details';

  @override
  String get progressTimeline => 'Progress Timeline';

  @override
  String get contactOfficer => 'Contact Officer';

  @override
  String get statusSubmitted => 'Submitted';

  @override
  String get statusUnderReview => 'Under Review';

  @override
  String get statusAssigned => 'Assigned to Contractor';

  @override
  String get statusInProgress => 'In Progress';

  @override
  String get statusCompleted => 'Completed';

  @override
  String get statusConfirmed => 'Confirmed';

  @override
  String get notificationsTitle => 'Notifications';

  @override
  String get markAllRead => 'Mark all as read';

  @override
  String get mapTitle => 'Map';

  @override
  String get searchLocation => 'Search location';

  @override
  String get catRoadDamage => 'Road Damage';

  @override
  String get catWaterLeakage => 'Water Leakage';

  @override
  String get catGarbage => 'Garbage';

  @override
  String get catStreetlight => 'Streetlight';

  @override
  String get catDrainage => 'Drainage';

  @override
  String get catOther => 'Other';
}
