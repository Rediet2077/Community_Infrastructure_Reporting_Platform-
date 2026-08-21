// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Amharic (`am`).
class AppLocalizationsAm extends AppLocalizations {
  AppLocalizationsAm([String locale = 'am']) : super(locale);

  @override
  String get emailAddress => 'ኢሜይል አድራሻ';

  @override
  String get password => 'የምስጢር ቃል';

  @override
  String get forgotPassword => 'የምስጢር ቃልዎን ረሱ?';

  @override
  String get logIn => 'ግባ';

  @override
  String get or => 'ወይም';

  @override
  String get selectLanguage => 'ቋንቋ ይምረጡ';

  @override
  String get chooseLanguage => 'የሚፈልጉትን ቋንቋ ይምረጡ';

  @override
  String get termsPrefix => 'በመግባቱ፣ ከ';

  @override
  String get termsOfUse => 'የአጠቃቀም ውሎች';

  @override
  String get and => ' እና ';

  @override
  String get privacyPolicy => 'የግልነት ፖሊሲ';

  @override
  String get noAccount => 'መለያ የለዎትም? ';

  @override
  String get signUp => 'ተመዝገቡ';

  @override
  String get enterEmail => 'ኢሜይል ያስገቡ';

  @override
  String get enterPassword => 'የምስጢር ቃል ያስገቡ';

  @override
  String get createAccount => 'መለያ ፍጠሩ';

  @override
  String get registerSubtitle => 'CIRP ይቀላቀሉ እና ማህበረሰባችንን ለማሻሻል ይርዱ።';

  @override
  String get fullName => 'ሙሉ ስም';

  @override
  String get phoneNumber => 'ስልክ ቁጥር';

  @override
  String get confirmPassword => 'የምስጢር ቃሉን ያረጋግጡ';

  @override
  String get enterName => 'ስም ያስገቡ';

  @override
  String get minChars => 'ቢያንስ 6 ቁምፊዎች';

  @override
  String get passwordsMismatch => 'የምስጢር ቃሎቹ አይዛመዱም';

  @override
  String get agreeTerms => 'ከ';

  @override
  String get agreePlease => 'እባክዎ የአጠቃቀም ውሎቹን እና የግልነት ፖሊሲን ይስማሙ';

  @override
  String get alreadyHaveAccount => 'መለያ አሎት? ';

  @override
  String get greeting => 'ሰላም, ሰላም!';

  @override
  String get homeSubtitle => 'ማህበረሰባችንን አብረን እናሻሽለው።';

  @override
  String get reportProblem => 'ችግር ሪፖርት ያድርጉ';

  @override
  String get reportProblemSub => 'በአካባቢዎ ያሉ የመሰረተ ልማት ችግሮችን ሪፖርት ያድርጉ';

  @override
  String get myReports => 'የኔ ሪፖርቶች';

  @override
  String get myReportsSub => 'የቀረቡ ሪፖርቶችዎን ይመልከቱ እና ይከታተሉ';

  @override
  String get notifications => 'ማሳወቂያዎች';

  @override
  String get notificationsSub => 'አስፈላጊ ዝማኔዎችን እና መልዕክቶችን ይመልከቱ';

  @override
  String get profile => 'መገለጫ';

  @override
  String get profileSub => 'የእርስዎን መገለጫ እና ቅንብሮች ያስተዳድሩ';

  @override
  String get recentReports => 'የቅርብ ጊዜ ሪፖርቶች';

  @override
  String get viewAll => 'ሁሉንም ይመልከቱ';

  @override
  String get navHome => 'ዋና';

  @override
  String get navMap => 'ካርታ';

  @override
  String get navReports => 'ሪፖርቶች';

  @override
  String get navProfile => 'መገለጫ';

  @override
  String get editProfile => 'መገለጫ ያርትዑ';

  @override
  String get language => 'ቋንቋ';

  @override
  String get helpSupport => 'እርዳታ እና ድጋፍ';

  @override
  String get aboutCirp => 'ስለ CIRP';

  @override
  String get logout => 'ውጣ';

  @override
  String get logoutConfirm => 'እርግጠኛ ነዎት መውጣት ይፈልጋሉ?';

  @override
  String get cancel => 'ሰርዝ';

  @override
  String get aboutText =>
      'CIRP (የማህበረሰብ መሰረተ ልማት ሪፖርት ማድረጊያ መድረክ) ዜጎች የማህበረሰቡን የመሰረተ ልማት ችግሮችን ሪፖርት እንዲያደርጉ እና እንዲከታተሉ ያግዛል። አብረን የተሻለ ከተማ መገንባት እንችላለን።';

  @override
  String get ok => 'እሺ';

  @override
  String get verifyEmail => 'ኢሜይልዎን ያረጋግጡ';

  @override
  String otpSentTo(String email) {
    return 'ወደ $email\n6-ዲጂት ኮድ ልከናል';
  }

  @override
  String get enterOtp => 'የ6-ዲጂት ኮድ ያስገቡ';

  @override
  String get verifyCode => 'ኮዱን ያረጋግጡ';

  @override
  String get didntReceive => 'ኮዱን አልተቀበሉም?';

  @override
  String get resendCode => 'ኮዱን እንደገና ላክ';

  @override
  String resendIn(String seconds) {
    return 'በ$seconds ሰከንድ ውስጥ ይላካል';
  }

  @override
  String get invalidOtp => 'ልክ ያልሆነ ኮድ። እባክዎ እንደገና ይሞክሩ።';

  @override
  String get otpExpired => 'ኮዱ ጊዜው አልፏል። አዲስ ይጠይቁ።';

  @override
  String get otpSuccess => 'ኢሜይል በተሳካ ሁኔታ ተረጋግጧል!';

  @override
  String get changeEmail => 'ኢሜይል ቀይር';

  @override
  String get reportProblemTitle => 'ችግር ሪፖርት ያድርጉ';

  @override
  String get stepLocation => 'አካባቢ';

  @override
  String get stepDetails => 'ዝርዝሮች';

  @override
  String get stepPhoto => 'ፎቶ';

  @override
  String get stepReview => 'ክለሳ';

  @override
  String get next => 'ቀጥል';

  @override
  String get submit => 'አስገባ';

  @override
  String get reportSubmitted => 'ሪፖርት ቀርቧል!';

  @override
  String get reportSubmittedMsg => 'ሪፖርትዎ በተሳካ ሁኔታ ቀርቧል። ስለ ሂደቱ እናሳውቅዎታለን።';

  @override
  String get done => 'ተጠናቋል';

  @override
  String get categoryAI => 'ምድብ (AI ሀሳብ)';

  @override
  String get description => 'መግለጫ';

  @override
  String get descriptionHint => 'ችግሩን በዝርዝር ይግለጹ...';

  @override
  String get change => 'ቀይር';

  @override
  String get changeLocation => 'አካባቢ ቀይር';

  @override
  String get addPhoto => 'ፎቶ አክል';

  @override
  String get camera => 'ካሜራ';

  @override
  String get gallery => 'ጋለሪ';

  @override
  String get photoInstruction => 'ችግሩ ግልጽ ሆኖ መታየቱን ያረጋግጡ';

  @override
  String get reviewYourReport => 'ሪፖርትዎን ይገምግሙ';

  @override
  String get photoAttached => 'ፎቶ ተያይዟል';

  @override
  String get noPhotoAttached => 'ምንም ፎቶ አልተያያዘም';

  @override
  String get myReportsTitle => 'የኔ ሪፖርቶች';

  @override
  String get tabAll => 'ሁሉም';

  @override
  String get tabInProgress => 'በሂደት ላይ';

  @override
  String get tabResolved => 'ተፈቷል';

  @override
  String get tabRejected => 'ተቀቧል';

  @override
  String noTabReports(String tab) {
    return 'ምንም $tab ሪፖርቶች የሉም';
  }

  @override
  String get reportDetails => 'የሪፖርት ዝርዝሮች';

  @override
  String get progressTimeline => 'የሂደት ጊዜ መስመር';

  @override
  String get contactOfficer => 'ኦፊሰር ያናግሩ';

  @override
  String get statusSubmitted => 'ቀርቧል';

  @override
  String get statusUnderReview => 'በግምገማ ላይ';

  @override
  String get statusAssigned => 'ለተቋራጭ ተሰጥቷል';

  @override
  String get statusInProgress => 'በሂደት ላይ';

  @override
  String get statusCompleted => 'ተጠናቋል';

  @override
  String get statusConfirmed => 'ተረጋግጧል';

  @override
  String get notificationsTitle => 'ማሳወቂያዎች';

  @override
  String get markAllRead => 'ሁሉንም እንደተነበቡ ምልክት አድርግ';

  @override
  String get mapTitle => 'ካርታ';

  @override
  String get searchLocation => 'አካባቢ ፈልጉ';

  @override
  String get catRoadDamage => 'የመንገድ ጉዳት';

  @override
  String get catWaterLeakage => 'የውሃ ፍሳሽ';

  @override
  String get catGarbage => 'ቆሻሻ';

  @override
  String get catStreetlight => 'የጎዳና መብራት';

  @override
  String get catDrainage => 'ፍሳሽ';

  @override
  String get catOther => 'ሌላ';
}
