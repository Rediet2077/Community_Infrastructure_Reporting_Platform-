# description_generator.py
# Generates a suggested report description based on category and language.
# Owner: AI Developer 1

DESCRIPTIONS = {
    "road_damage": {
        "en": "Road surface damage has been identified in this area. This may include potholes, cracks, or other hazards that require maintenance.",
        "am": "በዚህ አካባቢ የመንገድ ጉዳት ተለይቷል። ይህ ጉድጓዶችን፣ ስንጥቆችን ወይም ጥገና የሚያስፈልጋቸው ሌሎች አደጋዎችን ሊያካትት ይችላል።",
        "or": "Miidhaan karaa naannoo kana keessatti argameera. Kunis holqa, jalqaba, ykn kanneen biroo of keessaa qabaachuu danda'a.",
        "ti": "ጉድኣት ናይ ጎደና ኣብዚ ከባቢ ተረኺቡ። እዚ ጕድጓዳት፡ ስንጥቕ ወይ ካልእ ሓደጋታት ክሕዝ ይኽእል።",
    },
    "water_leakage": {
        "en": "Water leakage or pipe damage has been detected. This may cause flooding or water waste and requires urgent attention.",
        "am": "የውሃ ፍሳሽ ወይም የቧንቧ ጉዳት ተለይቷል። ይህ ጎርፍ ወይም የውሃ ብክነት ሊያስከትል ስለሚችል አስቸኳይ ትኩረት ይፈልጋል።",
        "or": "Bishaan dhangala'uu ykn miidhaan tuubii argameera. Kun lolaa ykn baduun bishaan fidu waan danda'uuf xiyyeeffannoo hatattamaa barbaada.",
        "ti": "ፍሳሽ ማይ ወይ ጉድኣት ቱቦ ተረኺቡ። እዚ ጎርፊ ወይ ምባኽናን ማይ ከስዕብ ስለ ዝኽእል ህፁጽ ኣቃልቦ የድሊ።",
    },
    "garbage": {
        "en": "Garbage accumulation has been reported in this area. Waste collection service is needed to maintain cleanliness.",
        "am": "በዚህ አካባቢ ቆሻሻ መከማቸት ሪፖርት ተደርጓል። ንጽህናን ለመጠበቅ የቆሻሻ መሰብሰብ አገልግሎት ያስፈልጋል።",
        "or": "Suphaan naannoo kana keessatti akka kuufame gabaafameera. Tajaajila sassaabbii suphaa dhiqannaa eeguuf barbaachisa.",
        "ti": "ምቑፃር ጓሓፍ ኣብዚ ከባቢ ተሓቢሩ። ናይ ምእካብ ጓሓፍ ኣገልግሎት ንምሕላው ጽሬት የድሊ።",
    },
    "drainage": {
        "en": "A drainage problem has been identified. Blocked or damaged drainage may cause flooding during rainfall.",
        "am": "የፍሳሽ ቱቦ ችግር ተለይቷል። የተዘጋ ወይም የተበላሸ ፍሳሽ ቱቦ በዝናብ ጊዜ ጎርፍ ሊያስከትል ይችላል።",
        "or": "Rakkoon qulqullinaa bishaanii argameera. Fincaan cufame ykn miidhamee roobaan yeroo roobdu lola fidu danda'a.",
        "ti": "ጸገም ፍሳሽ ተለሊዩ። ዝዓጸወ ወይ ዝተበላሸወ ፍሳሽ ኣብ ግዜ ዝናብ ጎርፊ ከስዕብ ይኽእል።",
    },
    "streetlight_failure": {
        "en": "A streetlight is not functioning in this area. This reduces visibility and may pose a safety risk at night.",
        "am": "በዚህ አካባቢ የጎዳና መብራት አይሰራም። ይህ ታይነትን ይቀንሳል እና በሌሊት ደህንነት ላይ ስጋት ሊፈጥር ይችላል።",
        "or": "Ibsaan karaa naannoo kana keessatti hin hojjenne. Kun mul'annaa hir'isa yeroo halkanii baayyee balaa ta'uu danda'a.",
        "ti": "ናይ ጎደና መብራት ኣብዚ ከባቢ ኣይሰርሕን። እዚ ርኢነት ይቅንሶ ኣብ ለይቲ ከኣ ሓደጋ ክፈጥር ይኽእል።",
    },
    "public_facility": {
        "en": "Damage to a public facility has been reported. Repair or replacement may be required to maintain public safety.",
        "am": "የህዝብ ንብረት ጉዳት ሪፖርት ተደርጓል። የህዝብ ደህንነትን ለመጠበቅ ጥገና ወይም ምትክ ሊያስፈልግ ይችላል።",
        "or": "Miidhaan meeshaa ummataa gabaafameera. Ijaarsa deebi'ee ykn jijjiirra eeggumsa ummataa eeguuf barbaachisu danda'a.",
        "ti": "ጉድኣት ናይ ህዝባዊ ትካል ተሓቢሩ። ጽጌና ወይ ምቕያር ንምሕላው ድሕንነት ህዝቢ ኣድላዪ ክኸውን ይኽእል።",
    },
    "other": {
        "en": "An infrastructure issue has been identified in this area. Please review and take appropriate action.",
        "am": "በዚህ አካባቢ የመሠረተ ልማት ችግር ተለይቷል። እባክዎ ይፈትሹ እና ተገቢ እርምጃ ይውሰዱ።",
        "or": "Rakkoon inifraastirakcharii naannoo kana keessatti argameera. Maaloo ilaalaa tarkaanfii sirrii fudhaa.",
        "ti": "ጸገም ናይ ሰረታዊ ልምዓት ኣብዚ ከባቢ ተለሊዩ። በጃኹም ፍተሹ ቅኑዕ ስጉምቲ ውሰዱ።",
    },
}


def generate_description(category: str, language: str = "en") -> str:
    """
    Generates a suggested report description.

    Args:
        category: infrastructure category slug
        language: "en" / "am" / "or" / "ti"

    Returns:
        str: suggested description in the requested language
    """
    lang = language if language in ("en", "am", "or", "ti") else "en"
    cat  = category if category in DESCRIPTIONS else "other"
    return DESCRIPTIONS[cat][lang]


if __name__ == "__main__":
    print("Testing description generator...\n")

    for cat in ["road_damage", "water_leakage", "garbage"]:
        for lang in ["en", "am"]:
            desc = generate_description(cat, lang)
            print(f"  {cat} [{lang}]:")
            print(f"  {desc[:80]}...")
            print()
