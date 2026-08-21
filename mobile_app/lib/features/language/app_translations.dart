class AppTranslations {
  final String languageCode;

  const AppTranslations(this.languageCode);


  String get emailAddress => _t(en: 'Email address', am: 'ኢሜይል አድራሻ', or: 'Teessoo imeelii', ti: 'ኣድራሻ ኢሜይል');
  String get password => _t(en: 'Password', am: 'የምስጢር ቃል', or: 'Jecha darbii', ti: 'ሕቡእ ቃል');
  String get forgotPassword => _t(en: 'Forgot password?', am: 'የምስጢር ቃልዎን ረሱ?', or: 'Jecha darbii irraanfattee?', ti: 'ሕቡእ ቃልካ ረሲዕካ?');
  String get logIn => _t(en: 'Log In', am: 'ግባ', or: 'Seeni', ti: 'እቶ');
  String get or => _t(en: 'or', am: 'ወይም', or: 'ykn', ti: 'ወይ');
  String get selectLanguage => _t(en: 'Select Language', am: 'ቋንቋ ይምረጡ', or: 'Afaan filadhu', ti: 'ቋንቋ ምረጽ');
  String get chooseLanguage => _t(en: 'Choose your preferred language', am: 'የሚፈልጉትን ቋንቋ ይምረጡ', or: 'Afaan barbaaddu filadhu', ti: 'ዝደሊኻዮ ቋንቋ ምረጽ');
  String get termsPrefix => _t(en: 'By logging in, you agree to our ', am: 'በመግባቱ፣ ከ', or: 'Seenuudhaan, ', ti: 'ብምእታውካ፣ ');
  String get termsOfUse => _t(en: 'Terms of Use', am: 'የአጠቃቀም ውሎች', or: 'Shartoota Fayyadamaa', ti: 'ውዕሎ ምጥቃም');
  String get and => _t(en: ' and ', am: ' እና ', or: ' fi ', ti: ' ን ');
  String get privacyPolicy => _t(en: 'Privacy Policy', am: 'የግልነት ፖሊሲ', or: 'Imaammata Dhuunfaa', ti: 'ፖሊሲ ምስጢርነት');
  String get termsAgreeSuffix => _t(en: '', am: ' ተስማምቷል', or: ' walii galteerra', ti: '');
  String get noAccount => _t(en: "Don't have an account? ", am: 'መለያ የለዎትም? ', or: 'Herreegaa hin qabdu? ', ti: 'ሕሳብ የብልካን? ');
  String get signUp => _t(en: 'Sign Up', am: 'ተመዝገቡ', or: 'Galmeessi', ti: 'ተመዝገብ');
  String get enterEmail => _t(en: 'Enter email', am: 'ኢሜይል ያስገቡ', or: 'Teessoo imeelii galchi', ti: 'ኢሜይል ኣእቱ');
  String get enterPassword => _t(en: 'Enter password', am: 'የምስጢር ቃል ያስገቡ', or: 'Jecha darbii galchi', ti: 'ሕቡእ ቃል ኣእቱ');

  String get createAccount => _t(en: 'Create Account', am: 'መለያ ፍጠሩ', or: 'Herreega Uumi', ti: 'ሕሳብ ፍጠር');
  String get registerSubtitle => _t(en: 'Join CIRP and help make our\ncommunity better.', am: 'CIRP ይቀላቀሉ እና ማህበረሰባችንን\nለማሻሻል ይርዱ።', or: 'CIRP irratti makamu fi hawaasa\nkeenya foyyeessuuf gargaari.', ti: 'CIRP ተጸምበር ማሕበረሰብና\nምሕሳን ሓግዝ።');
  String get fullName => _t(en: 'Full name', am: 'ሙሉ ስም', or: 'Maqaa guutuu', ti: 'ምሉእ ስም');
  String get phoneNumber => _t(en: 'Phone number', am: 'ስልክ ቁጥር', or: 'Lakkoofsa bilbilaa', ti: 'ቁጽሪ ስልኪ');
  String get confirmPassword => _t(en: 'Confirm password', am: 'የምስጢር ቃሉን ያረጋግጡ', or: 'Jecha darbii mirkaneessi', ti: 'ሕቡእ ቃል ኣረጋግጽ');
  String get enterName => _t(en: 'Enter name', am: 'ስም ያስገቡ', or: 'Maqaa galchi', ti: 'ስም ኣእቱ');
  String get minChars => _t(en: 'Min 6 characters', am: 'ቢያንስ 6 ቁምፊዎች', or: 'Xiqqaate qubee 6', ti: 'ዝወሓደ 6 ምልክታት');
  String get passwordsMismatch => _t(en: "Passwords don't match", am: 'የምስጢር ቃሎቹ አይዛመዱም', or: "Jecha darbii wal hin simatu", ti: 'ሕቡእ ቃላት ኣይሰማምዑን');
  String get agreeTerms => _t(en: 'I agree to the ', am: 'ከ', or: 'Walii gala ', ti: 'ምስ ');
  String get agreePlease => _t(en: 'Please agree to Terms of Use and Privacy Policy', am: 'እባክዎ የአጠቃቀም ውሎቹን እና የግልነት ፖሊሲን ይስማሙ', or: 'Maaloo Shartoota Fayyadamaa fi Imaammata Dhuunfaa walii gali', ti: 'በጃካ ውዕሎ ምጥቃምን ፖሊሲ ምስጢርነትን ተቀበል');
  String get alreadyHaveAccount => _t(en: 'Already have an account? ', am: 'መለያ አሎት? ', or: 'Herreega qabda? ', ti: 'ሕሳብ ኣለካ? ');

  String get greeting => _t(en: 'Hello, Selam! ', am: 'ሰላም, ሰላም! ', or: 'Akkam, Selam! ', ti: 'ሰላም, ሰላም! ');
  String get homeSubtitle => _t(en: "Let's make our community\nbetter together.", am: 'ማህበረሰባችንን\nአብረን እናሻሽለው።', or: 'Hawaasa keenya\nwaliin foyyeessina.', ti: 'ማሕበረሰብና\nሓቢርና ንምሓስን።');
  String get reportProblem => _t(en: 'Report\nProblem', am: 'ችግር\nሪፖርት ያድርጉ', or: 'Rakkoo\nGabaasi', ti: 'ጸገም\nሓብር');
  String get reportProblemSub => _t(en: 'Report infrastructure\nproblems in your area', am: 'በአካባቢዎ ያሉ የመሰረተ ልማት\nችግሮችን ሪፖርት ያድርጉ', or: 'Rakkoolee misooma bu\'uuraa\naanaa keessatti gabaasi', ti: 'ጸገማት ትካል\nናብ ዞብካ ሓብር');
  String get myReports => _t(en: 'My Reports', am: 'የኔ ሪፖርቶች', or: 'Gabaasawwan Koo', ti: 'ጸብጻባተይ');
  String get myReportsSub => _t(en: 'View and track your\nsubmitted reports', am: 'የቀረቡ ሪፖርቶችዎን ይመልከቱ\nእና ይከታተሉ', or: 'Gabaasawwan dhiyaatan\nilaali fi hordofi', ti: 'ዝቐረቡ ጸብጻባትካ ርኤ\nከምኡ ትከታተሎም');
  String get notifications => _t(en: 'Notifications', am: 'ማሳወቂያዎች', or: 'Beeksisawwan', ti: 'ምልክታት');
  String get notificationsSub => _t(en: 'View important updates\nand messages', am: 'አስፈላጊ ዝማኔዎችን እና\nመልዕክቶችን ይመልከቱ', or: 'Haaromsa barbaachisaa fi\ndhaambasa ilaali', ti: 'ዝተሓደሱ ጠቓሚ ነገራትን\nልኡኽቲን ርኤ');
  String get profile => _t(en: 'Profile', am: 'መገለጫ', or: 'Profaayilii', ti: 'ፕሮፋይል');
  String get profileSub => _t(en: 'Manage your profile\nand settings', am: 'የእርስዎን መገለጫ እና ቅንብሮች\nያስተዳድሩ', or: 'Profaayilii kee fi\nqindaa\'ina bulchi', ti: 'ፕሮፋይልካን ቅንብራትን ኣካይድ');
  String get recentReports => _t(en: 'Recent Reports', am: 'የቅርብ ጊዜ ሪፖርቶች', or: 'Gabaasawwan Dhiyoo', ti: 'ናይ ቀረባ ጸብጻባት');
  String get viewAll => _t(en: 'View All', am: 'ሁሉንም ይመልከቱ', or: 'Hunda Ilaali', ti: 'ኩሉ ርኤ');

  String get navHome => _t(en: 'Home', am: 'ዋና', or: 'Mana', ti: 'ቤት');
  String get navMap => _t(en: 'Map', am: 'ካርታ', or: 'Kaartaa', ti: 'ካርታ');
  String get navReports => _t(en: 'Reports', am: 'ሪፖርቶች', or: 'Gabaasawwan', ti: 'ጸብጻባት');
  String get navProfile => _t(en: 'Profile', am: 'መገለጫ', or: 'Profaayilii', ti: 'ፕሮፋይል');

  String get editProfile => _t(en: 'Edit Profile', am: 'መገለጫ ያርትዑ', or: 'Profaayilii Gulaali', ti: 'ፕሮፋይል ኣርትዕ');
  String get language => _t(en: 'Language', am: 'ቋንቋ', or: 'Afaan', ti: 'ቋንቋ');
  String get helpSupport => _t(en: 'Help & Support', am: 'እርዳታ እና ድጋፍ', or: 'Gargaarsa & Deeggarsa', ti: 'ሓገዝ & ደገፍ');
  String get aboutCirp => _t(en: 'About CIRP', am: 'ስለ CIRP', or: 'CIRP Waa\'ee', ti: 'ብዛዕባ CIRP');
  String get logout => _t(en: 'Logout', am: 'ውጣ', or: 'Ba\'i', ti: 'ውጻእ');
  String get logoutConfirm => _t(en: 'Are you sure you want to log out?', am: 'እርግጠኛ ነዎት መውጣት ይፈልጋሉ?', or: 'Ba\'uuf mirkaneessitaa?', ti: 'ክትወጽእ ትደሊ ዲኻ?');
  String get cancel => _t(en: 'Cancel', am: 'ሰርዝ', or: 'Haqi', ti: 'ሰርዝ');
  String get aboutText => _t(
    en: 'CIRP (Community Infrastructure Reporting Platform) helps citizens report and track infrastructure problems in their community. Together we can build a better city.',
    am: 'CIRP (የማህበረሰብ መሰረተ ልማት ሪፖርት ማድረጊያ መድረክ) ዜጎች የማህበረሰቡን የመሰረተ ልማት ችግሮችን ሪፖርት እንዲያደርጉ እና እንዲከታተሉ ያግዛል። አብረን የተሻለ ከተማ መገንባት እንችላለን።',
    or: 'CIRP (Dhaabbata Gabaasa Misooma Bu\'uuraa Hawaasaa) lammiileen rakkoolee misooma hawaasaa gabaasuu fi hordofuuf gargaara. Waliin magaalaa gaarii ijaaruuf dandeenya.',
    ti: 'CIRP (መድረኽ ምሕባር ትካል ማሕበረሰብ) ዜጋታት ጸገማት ትካል ማሕበረሰቦም ከምዝሕብሩን ከምዝከታተሉን ይሕግዝ። ሓቢርና ዝሓሸ ከተማ ክንሃንጽ ንኽእል።',
  );
  String get ok => _t(en: 'OK', am: 'እሺ', or: 'Tole', ti: 'እሺ');

  String get verifyEmail => _t(en: 'Verify Your Email', am: 'ኢሜይልዎን ያረጋግጡ', or: 'Imeelii Kee Mirkaneessi', ti: 'ኢሜይልካ ኣረጋግጽ');
  String otpSentTo(String email) => _t(
        en: 'We sent a 6-digit code to\n$email',
        am: 'ወደ $email\n6-ዲጂት ኮድ ልከናል',
        or: 'Koodii lakkoofsa 6 gara\n$email ergine',
        ti: 'ናብ $email\n6-ዲጂት ኮድ ሰዲድና',
      );
  String get enterOtp => _t(en: 'Enter the 6-digit code', am: 'የ6-ዲጂት ኮድ ያስገቡ', or: 'Koodii lakkoofsa 6 galchi', ti: '6-ዲጂት ኮድ ኣእቱ');
  String get verifyCode => _t(en: 'Verify Code', am: 'ኮዱን ያረጋግጡ', or: 'Koodi Mirkaneessi', ti: 'ኮድ ኣረጋግጽ');
  String get didntReceive => _t(en: "Didn't receive the code?", am: 'ኮዱን አልተቀበሉም?', or: 'Koodii hin arganne?', ti: 'ኮድ ኣይበጻሕካን?');
  String get resendCode => _t(en: 'Resend Code', am: 'ኮዱን እንደገና ላክ', or: 'Koodi Irra Ergii', ti: 'ኮድ ደጊምካ ስደድ');
  String resendIn(String seconds) => _t(
        en: 'Resend in ${seconds}s',
        am: 'በ$seconds ሰከንድ ውስጥ ይላካል',
        or: 'Sekoondii ${seconds}tti irra ergama',
        ti: 'ኣብ $seconds ሰከንድ ይልኣኽ',
      );
  String get invalidOtp => _t(en: 'Invalid code. Please try again.', am: 'ልክ ያልሆነ ኮድ። እባክዎ እንደገና ይሞክሩ።', or: 'Koodii dogoggoraa. Maaloo irra yaali.', ti: 'ዘይቅኑዕ ኮድ። በጃካ ደጊምካ ፈትን።');
  String get otpExpired => _t(en: 'Code expired. Please request a new one.', am: 'ኮዱ ጊዜው አልፏል። አዲስ ይጠይቁ።', or: 'Koodiin darbeera. Haaraa gaafadhu.', ti: 'ኮድ ኣኽቲሙ። ሓድሽ ሕተት።');
  String get otpSuccess => _t(en: 'Email verified successfully!', am: 'ኢሜይል በተሳካ ሁኔታ ተረጋግጧል!', or: 'Imeeliin milkaa\'inaan mirkanaawe!', ti: 'ኢሜይል ብዓወት ተረጋጊጹ!');
  String get changeEmail => _t(en: 'Change email', am: 'ኢሜይል ቀይር', or: 'Imeelii jijjiiri', ti: 'ኢሜይል ቀይር');

  String get reportProblemTitle => _t(en: 'Report Problem', am: 'ችግር ሪፖርት ያድርጉ', or: 'Rakkoo Gabaasi', ti: 'ጸገም ሓብር');
  String get stepLocation => _t(en: 'Location', am: 'አካባቢ', or: 'Iddoo', ti: 'ቦታ');
  String get stepDetails => _t(en: 'Details', am: 'ዝርዝሮች', or: 'Ibsa', ti: 'ዝርዝር');
  String get stepPhoto => _t(en: 'Photo', am: 'ፎቶ', or: 'Suuraa', ti: 'ስእሊ');
  String get stepReview => _t(en: 'Review', am: 'ክለሳ', or: 'Ilaalcha', ti: 'ገምጋም');
  String get next => _t(en: 'Next', am: 'ቀጥል', or: 'Itti aanaa', ti: 'ቀጺሉ');
  String get submit => _t(en: 'Submit', am: 'አስገባ', or: 'Galchi', ti: 'ኣእቱ');
  String get reportSubmitted => _t(en: 'Report Submitted!', am: 'ሪፖርት ቀርቧል!', or: 'Gabaasni dhiyaate!', ti: 'ጸብጻብ ቀሪቡ!');
  String get reportSubmittedMsg => _t(en: "Your report has been submitted successfully. We'll notify you about its progress.", am: 'ሪፖርትዎ በተሳካ ሁኔታ ቀርቧል። ስለ ሂደቱ እናሳውቅዎታለን።', or: 'Gabaasni kee milkaa\'inaan dhiyaate. Adeemsa isaa isinitti beeksifna.', ti: 'ጸብጻብካ ብዓወት ቀሪቡ። ብዛዕባ ምዕባለኡ ክነፍልጠካ ኢና።');
  String get done => _t(en: 'Done', am: 'ተጠናቋል', or: 'Xumurame', ti: 'ተወዲኡ');
  String get categoryAI => _t(en: 'Category (AI Suggestion)', am: 'ምድብ (AI ሀሳብ)', or: 'Gosa (AI Yaada)', ti: 'ክፍሊ (AI ጠቐምቲ)');
  String get description => _t(en: 'Description', am: 'መግለጫ', or: 'Ibsa', ti: 'መግለጺ');
  String get descriptionHint => _t(en: 'Describe the problem in detail...', am: 'ችግሩን በዝርዝር ይግለጹ...', or: 'Rakkoo bal\'inaan ibsi...', ti: 'ጸገሙ ብዝርዝር ግለጽ...');
  String get change => _t(en: 'Change', am: 'ቀይር', or: 'Jijjiiri', ti: 'ቀይር');
  String get changeLocation => _t(en: 'Change Location', am: 'አካባቢ ቀይር', or: 'Iddoo Jijjiiri', ti: 'ቦታ ቀይር');
  String get addPhoto => _t(en: 'Add Photo', am: 'ፎቶ አክል', or: 'Suuraa Dabali', ti: 'ስእሊ ወስኽ');
  String get camera => _t(en: 'Camera', am: 'ካሜራ', or: 'Kaameraa', ti: 'ካሜራ');
  String get gallery => _t(en: 'Gallery', am: 'ጋለሪ', or: 'Gaaleerii', ti: 'ጋለሪ');
  String get photoInstruction => _t(en: 'Make sure the problem is\nclearly visible', am: 'ችግሩ ግልጽ\nሆኖ መታየቱን ያረጋግጡ', or: 'Rakkoon ifatti\nargamuutti mirkaneessi', ti: 'ጸገሙ ብግልጺ\nክርአ ምርግጋጽ');
  String get reviewYourReport => _t(en: 'Review Your Report', am: 'ሪፖርትዎን ይገምግሙ', or: 'Gabaasa Kee Ilaaili', ti: 'ጸብጻብካ ገምግሞ');
  String get photoAttached => _t(en: 'Photo attached', am: 'ፎቶ ተያይዟል', or: 'Suuraan maxxanfame', ti: 'ስእሊ ተጸጊዑ');
  String get noPhotoAttached => _t(en: 'No photo attached', am: 'ምንም ፎቶ አልተያያዘም', or: 'Suuraan maxxanfamee hin jiru', ti: 'ምንም ስእሊ ኣይተጸጎዐን');

  String get myReportsTitle => _t(en: 'My Reports', am: 'የኔ ሪፖርቶች', or: 'Gabaasawwan Koo', ti: 'ጸብጻባተይ');
  String get tabAll => _t(en: 'All', am: 'ሁሉም', or: 'Hunda', ti: 'ኩሉ');
  String get tabInProgress => _t(en: 'In Progress', am: 'በሂደት ላይ', or: 'Adeemaa jira', ti: 'ኣብ ሂደት');
  String get tabResolved => _t(en: 'Resolved', am: 'ተፈቷል', or: 'Furameera', ti: 'ተፈቲሑ');
  String get tabRejected => _t(en: 'Rejected', am: 'ተቀቧል', or: 'Dideera', ti: 'ተነጺጉ');
  String noTabReports(String tab) => _t(en: 'No $tab reports', am: 'ምንም $tab ሪፖርቶች የሉም', or: 'Gabaasa $tab hin jiru', ti: 'ምንም $tab ጸብጻባት የለን');

  String get reportDetails => _t(en: 'Report Details', am: 'የሪፖርት ዝርዝሮች', or: 'Ibsa Gabaasaa', ti: 'ዝርዝር ጸብጻብ');
  String get progressTimeline => _t(en: 'Progress Timeline', am: 'የሂደት ጊዜ መስመር', or: 'Tartiiba Adeemaa', ti: 'ምዕባሌ ሰዓታዊ መስመር');
  String get contactOfficer => _t(en: 'Contact Officer', am: 'ኦፊሰር ያናግሩ', or: 'Ofiisara Qunnamaa', ti: 'ወኪል ተወከስ');
  String get statusSubmitted => _t(en: 'Submitted', am: 'ቀርቧል', or: 'Dhiyaate', ti: 'ቀሪቡ');
  String get statusUnderReview => _t(en: 'Under Review', am: 'በግምገማ ላይ', or: 'Ilaalamaa jira', ti: 'ኣብ ገምጋም');
  String get statusAssigned => _t(en: 'Assigned to Contractor', am: 'ለተቋራጭ ተሰጥቷል', or: 'Waadaan kenname', ti: 'ናብ ተቋራጺ ተዋሂቡ');
  String get statusInProgress => _t(en: 'In Progress', am: 'በሂደት ላይ', or: 'Adeemaa jira', ti: 'ኣብ ሂደት');
  String get statusCompleted => _t(en: 'Completed', am: 'ተጠናቋል', or: 'Xumurame', ti: 'ተወዲኡ');
  String get statusConfirmed => _t(en: 'Confirmed', am: 'ተረጋግጧል', or: 'Mirkanaaye', ti: 'ተረጋጊጹ');

  String get notificationsTitle => _t(en: 'Notifications', am: 'ማሳወቂያዎች', or: 'Beeksisawwan', ti: 'ምልክታት');
  String get markAllRead => _t(en: 'Mark all as read', am: 'ሁሉንም እንደተነበቡ ምልክት አድርግ', or: 'Hunda dubbifame godhi', ti: 'ኩሉ ከም ዝተነብበ ምልክት ግበር');

  String get mapTitle => _t(en: 'Map', am: 'ካርታ', or: 'Kaartaa', ti: 'ካርታ');
  String get searchLocation => _t(en: 'Search location', am: 'አካባቢ ፈልጉ', or: 'Iddoo Barbaadi', ti: 'ቦታ ድለ');

  String get catRoadDamage => _t(en: 'Road Damage', am: 'የመንገድ ጉዳት', or: 'Miidhaa Karaa', ti: 'ጉድኣት መንገዲ');
  String get catWaterLeakage => _t(en: 'Water Leakage', am: 'የውሃ ፍሳሽ', or: 'Yaabbii Bishaan', ti: 'ምፍሳስ ማይ');
  String get catGarbage => _t(en: 'Garbage', am: 'ቆሻሻ', or: 'Kosii', ti: 'ጓሓፍ');
  String get catStreetlight => _t(en: 'Streetlight', am: 'የጎዳና መብራት', or: 'Ifa Karaa', ti: 'መብራት ጎደና');
  String get catDrainage => _t(en: 'Drainage', am: 'ፍሳሽ', or: 'Qulqullina Bishaani', ti: 'ጎዶቦ ማይ');
  String get catOther => _t(en: 'Other', am: 'ሌላ', or: 'Kan biroo', ti: 'ካልእ');

  String get langEnglish => 'English';
  String get langAmharic => 'አማርኛ';
  String get langOromo => 'Afaan Oromo';
  String get langTigrinya => 'ትግርኛ';

  String _t({
    required String en,
    required String am,
    required String or,
    required String ti,
  }) {
    switch (languageCode) {
      case 'am':
        return am;
      case 'or':
        return or;
      case 'ti':
        return ti;
      default:
        return en;
    }
  }

  String currentLanguageName() {
    switch (languageCode) {
      case 'am':
        return 'አማርኛ';
      case 'or':
        return 'Afaan Oromo';
      case 'ti':
        return 'ትግርኛ';
      default:
        return 'English';
    }
  }

  List<Map<String, String>> get languageOptions => [
        {'code': 'en', 'name': 'English', 'icon': 'EN'},
        {'code': 'am', 'name': 'Amharic', 'icon': 'AM'},
        {'code': 'or', 'name': 'Afaan Oromo', 'icon': 'OR'},
        {'code': 'ti', 'name': 'Tigrinya', 'icon': 'TI'},
      ];

  List<String> get categories => [
        catRoadDamage,
        catWaterLeakage,
        catGarbage,
        catStreetlight,
        catDrainage,
        catOther,
      ];
}
