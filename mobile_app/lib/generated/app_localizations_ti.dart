// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Tigrinya (`ti`).
class AppLocalizationsTi extends AppLocalizations {
  AppLocalizationsTi([String locale = 'ti']) : super(locale);

  @override
  String get emailAddress => 'ኣድራሻ ኢሜይል';

  @override
  String get password => 'ሕቡእ ቃል';

  @override
  String get forgotPassword => 'ሕቡእ ቃልካ ረሲዕካ?';

  @override
  String get logIn => 'እቶ';

  @override
  String get or => 'ወይ';

  @override
  String get selectLanguage => 'ቋንቋ ምረጽ';

  @override
  String get chooseLanguage => 'ዝደሊኻዮ ቋንቋ ምረጽ';

  @override
  String get termsPrefix => 'ብምእታውካ፣ ';

  @override
  String get termsOfUse => 'ውዕሎ ምጥቃም';

  @override
  String get and => ' ን ';

  @override
  String get privacyPolicy => 'ፖሊሲ ምስጢርነት';

  @override
  String get noAccount => 'ሕሳብ የብልካን? ';

  @override
  String get signUp => 'ተመዝገብ';

  @override
  String get enterEmail => 'ኢሜይል ኣእቱ';

  @override
  String get enterPassword => 'ሕቡእ ቃል ኣእቱ';

  @override
  String get createAccount => 'ሕሳብ ፍጠር';

  @override
  String get registerSubtitle => 'CIRP ተጸምበር ማሕበረሰብና ምሕሳን ሓግዝ።';

  @override
  String get fullName => 'ምሉእ ስም';

  @override
  String get phoneNumber => 'ቁጽሪ ስልኪ';

  @override
  String get confirmPassword => 'ሕቡእ ቃል ኣረጋግጽ';

  @override
  String get enterName => 'ስም ኣእቱ';

  @override
  String get minChars => 'ዝወሓደ 6 ምልክታት';

  @override
  String get passwordsMismatch => 'ሕቡእ ቃላት ኣይሰማምዑን';

  @override
  String get agreeTerms => 'ምስ ';

  @override
  String get agreePlease => 'በጃካ ውዕሎ ምጥቃምን ፖሊሲ ምስጢርነትን ተቀበል';

  @override
  String get alreadyHaveAccount => 'ሕሳብ ኣለካ? ';

  @override
  String get greeting => 'ሰላም, ሰላም!';

  @override
  String get homeSubtitle => 'ማሕበረሰብና ሓቢርና ንምሓስን።';

  @override
  String get reportProblem => 'ጸገም ሓብር';

  @override
  String get reportProblemSub => 'ጸገማት ትካል ናብ ዞብካ ሓብር';

  @override
  String get myReports => 'ጸብጻባተይ';

  @override
  String get myReportsSub => 'ዝቐረቡ ጸብጻባትካ ርኤ ከምኡ ትከታተሎም';

  @override
  String get notifications => 'ምልክታት';

  @override
  String get notificationsSub => 'ዝተሓደሱ ጠቓሚ ነገራትን ልኡኽቲን ርኤ';

  @override
  String get profile => 'ፕሮፋይል';

  @override
  String get profileSub => 'ፕሮፋይልካን ቅንብራትን ኣካይድ';

  @override
  String get recentReports => 'ናይ ቀረባ ጸብጻባት';

  @override
  String get viewAll => 'ኩሉ ርኤ';

  @override
  String get navHome => 'ቤት';

  @override
  String get navMap => 'ካርታ';

  @override
  String get navReports => 'ጸብጻባት';

  @override
  String get navProfile => 'ፕሮፋይል';

  @override
  String get editProfile => 'ፕሮፋይል ኣርትዕ';

  @override
  String get language => 'ቋንቋ';

  @override
  String get helpSupport => 'ሓገዝ & ደገፍ';

  @override
  String get aboutCirp => 'ብዛዕባ CIRP';

  @override
  String get logout => 'ውጻእ';

  @override
  String get logoutConfirm => 'ክትወጽእ ትደሊ ዲኻ?';

  @override
  String get cancel => 'ሰርዝ';

  @override
  String get aboutText =>
      'CIRP (መድረኽ ምሕባር ትካል ማሕበረሰብ) ዜጋታት ጸገማት ትካል ማሕበረሰቦም ከምዝሕብሩን ከምዝከታተሉን ይሕግዝ። ሓቢርና ዝሓሸ ከተማ ክንሃንጽ ንኽእል።';

  @override
  String get ok => 'እሺ';

  @override
  String get verifyEmail => 'ኢሜይልካ ኣረጋግጽ';

  @override
  String otpSentTo(String email) {
    return 'ናብ $email\n6-ዲጂት ኮድ ሰዲድና';
  }

  @override
  String get enterOtp => '6-ዲጂት ኮድ ኣእቱ';

  @override
  String get verifyCode => 'ኮድ ኣረጋግጽ';

  @override
  String get didntReceive => 'ኮድ ኣይበጻሕካን?';

  @override
  String get resendCode => 'ኮድ ደጊምካ ስደድ';

  @override
  String resendIn(String seconds) {
    return 'ኣብ $seconds ሰከንድ ይልኣኽ';
  }

  @override
  String get invalidOtp => 'ዘይቅኑዕ ኮድ። በጃካ ደጊምካ ፈትን።';

  @override
  String get otpExpired => 'ኮድ ኣኽቲሙ። ሓድሽ ሕተት።';

  @override
  String get otpSuccess => 'ኢሜይል ብዓወት ተረጋጊጹ!';

  @override
  String get changeEmail => 'ኢሜይል ቀይር';

  @override
  String get reportProblemTitle => 'ጸገም ሓብር';

  @override
  String get stepLocation => 'ቦታ';

  @override
  String get stepDetails => 'ዝርዝር';

  @override
  String get stepPhoto => 'ስእሊ';

  @override
  String get stepReview => 'ገምጋም';

  @override
  String get next => 'ቀጺሉ';

  @override
  String get submit => 'ኣእቱ';

  @override
  String get reportSubmitted => 'ጸብጻብ ቀሪቡ!';

  @override
  String get reportSubmittedMsg => 'ጸብጻብካ ብዓወት ቀሪቡ። ብዛዕባ ምዕባለኡ ክነፍልጠካ ኢና።';

  @override
  String get done => 'ተወዲኡ';

  @override
  String get categoryAI => 'ክፍሊ (AI ጠቐምቲ)';

  @override
  String get description => 'መግለጺ';

  @override
  String get descriptionHint => 'ጸገሙ ብዝርዝር ግለጽ...';

  @override
  String get change => 'ቀይር';

  @override
  String get changeLocation => 'ቦታ ቀይር';

  @override
  String get addPhoto => 'ስእሊ ወስኽ';

  @override
  String get camera => 'ካሜራ';

  @override
  String get gallery => 'ጋለሪ';

  @override
  String get photoInstruction => 'ጸገሙ ብግልጺ ክርአ ምርግጋጽ';

  @override
  String get reviewYourReport => 'ጸብጻብካ ገምግሞ';

  @override
  String get photoAttached => 'ስእሊ ተጸጊዑ';

  @override
  String get noPhotoAttached => 'ምንም ስእሊ ኣይተጸጎዐን';

  @override
  String get myReportsTitle => 'ጸብጻባተይ';

  @override
  String get tabAll => 'ኩሉ';

  @override
  String get tabInProgress => 'ኣብ ሂደት';

  @override
  String get tabResolved => 'ተፈቲሑ';

  @override
  String get tabRejected => 'ተነጺጉ';

  @override
  String noTabReports(String tab) {
    return 'ምንም $tab ጸብጻባት የለን';
  }

  @override
  String get reportDetails => 'ዝርዝር ጸብጻብ';

  @override
  String get progressTimeline => 'ምዕባሌ ሰዓታዊ መስመር';

  @override
  String get contactOfficer => 'ወኪል ተወከስ';

  @override
  String get statusSubmitted => 'ቀሪቡ';

  @override
  String get statusUnderReview => 'ኣብ ገምጋም';

  @override
  String get statusAssigned => 'ናብ ተቋራጺ ተዋሂቡ';

  @override
  String get statusInProgress => 'ኣብ ሂደት';

  @override
  String get statusCompleted => 'ተወዲኡ';

  @override
  String get statusConfirmed => 'ተረጋጊጹ';

  @override
  String get notificationsTitle => 'ምልክታት';

  @override
  String get markAllRead => 'ኩሉ ከም ዝተነብበ ምልክት ግበር';

  @override
  String get mapTitle => 'ካርታ';

  @override
  String get searchLocation => 'ቦታ ድለ';

  @override
  String get catRoadDamage => 'ጉድኣት መንገዲ';

  @override
  String get catWaterLeakage => 'ምፍሳስ ማይ';

  @override
  String get catGarbage => 'ጓሓፍ';

  @override
  String get catStreetlight => 'መብራት ጎደና';

  @override
  String get catDrainage => 'ጎዶቦ ማይ';

  @override
  String get catOther => 'ካልእ';
}
