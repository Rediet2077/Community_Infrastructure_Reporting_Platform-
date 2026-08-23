import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_am.dart';
import 'app_localizations_en.dart';
import 'app_localizations_or.dart';
import 'app_localizations_ti.dart';

// ignore_for_file: type=lint

abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  static const List<Locale> supportedLocales = <Locale>[
    Locale('am'),
    Locale('en'),
    Locale('or'),
    Locale('ti')
  ];

  String get emailAddress;
  String get password;
  String get forgotPassword;
  String get logIn;
  String get or;
  String get selectLanguage;
  String get chooseLanguage;
  String get termsPrefix;
  String get termsOfUse;
  String get and;
  String get privacyPolicy;
  String get noAccount;
  String get signUp;
  String get enterEmail;
  String get enterPassword;
  String get createAccount;
  String get registerSubtitle;
  String get fullName;
  String get phoneNumber;
  String get confirmPassword;
  String get enterName;
  String get minChars;
  String get passwordsMismatch;
  String get agreeTerms;
  String get agreePlease;
  String get alreadyHaveAccount;
  String get greeting;
  String get homeSubtitle;
  String get reportProblem;
  String get reportProblemSub;
  String get myReports;
  String get myReportsSub;
  String get notifications;
  String get notificationsSub;
  String get profile;
  String get profileSub;
  String get recentReports;
  String get viewAll;
  String get navHome;
  String get navMap;
  String get navReports;
  String get navProfile;
  String get editProfile;
  String get language;
  String get helpSupport;
  String get aboutCirp;
  String get logout;
  String get logoutConfirm;
  String get cancel;
  String get aboutText;
  String get ok;
  String get verifyEmail;
  String otpSentTo(String email);
  String get enterOtp;
  String get verifyCode;
  String get didntReceive;
  String get resendCode;
  String resendIn(String seconds);
  String get invalidOtp;
  String get otpExpired;
  String get otpSuccess;
  String get changeEmail;
  String get reportProblemTitle;
  String get stepLocation;
  String get stepDetails;
  String get stepPhoto;
  String get stepReview;
  String get next;
  String get submit;
  String get reportSubmitted;
  String get reportSubmittedMsg;
  String get done;
  String get categoryAI;
  String get description;
  String get descriptionHint;
  String get change;
  String get changeLocation;
  String get addPhoto;
  String get camera;
  String get gallery;
  String get photoInstruction;
  String get reviewYourReport;
  String get photoAttached;
  String get noPhotoAttached;
  String get myReportsTitle;
  String get tabAll;
  String get tabInProgress;
  String get tabResolved;
  String get tabRejected;
  String noTabReports(String tab);
  String get reportDetails;
  String get progressTimeline;
  String get contactOfficer;
  String get statusSubmitted;
  String get statusUnderReview;
  String get statusAssigned;
  String get statusInProgress;
  String get statusCompleted;
  String get statusConfirmed;
  String get notificationsTitle;
  String get markAllRead;
  String get mapTitle;
  String get searchLocation;
  String get catRoadDamage;
  String get catWaterLeakage;
  String get catGarbage;
  String get catStreetlight;
  String get catDrainage;
  String get catOther;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['am', 'en', 'or', 'ti'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  switch (locale.languageCode) {
    case 'am':
      return AppLocalizationsAm();
    case 'en':
      return AppLocalizationsEn();
    case 'or':
      return AppLocalizationsOr();
    case 'ti':
      return AppLocalizationsTi();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
