# title_generator.py
# Generates a suggested report title based on category and confidence.
# Owner: AI Developer 1
#
# Simple idea:
#   category = "road_damage", confidence = 0.94
#   → title = "Road Damage Detected"
#
#   category = "water_leakage", confidence = 0.45
#   → title = "Possible Water Leakage Issue"
#   (lower confidence = "Possible" prefix)

# Template titles per category — in all 4 languages
TITLES = {
    "road_damage": {
        "en": "Road Damage Detected",
        "am": "የመንገድ ጉዳት ተገኝቷል",
        "or": "Miidhaa Karaa Argame",
        "ti": "ጉድኣት መንገዲ ተረኺቡ",
    },
    "water_leakage": {
        "en": "Water Leakage Detected",
        "am": "የውሃ ፍሳሽ ተገኝቷል",
        "or": "Bishaan Dhangala'aa Argame",
        "ti": "ፍሳሽ ማይ ተረኺቡ",
    },
    "garbage": {
        "en": "Garbage Problem Reported",
        "am": "የቆሻሻ ችግር ሪፖርት ተደርጓል",
        "or": "Rakkoo Suphaa Gabaafame",
        "ti": "ጸገም ጓሓፍ ተሓቢሩ",
    },
    "drainage": {
        "en": "Drainage Issue Detected",
        "am": "የፍሳሽ ቱቦ ችግር ተገኝቷል",
        "or": "Rakkoo Qulqullina Bishaan Argame",
        "ti": "ጸገም ፍሳሽ ተረኺቡ",
    },
    "streetlight_failure": {
        "en": "Streetlight Failure Detected",
        "am": "የጎዳና መብራት ብልሽት ተገኝቷል",
        "or": "Ibsaa Karaa Baduu Argame",
        "ti": "ምብርሻ መብራት ጎደና ተረኺቡ",
    },
    "public_facility": {
        "en": "Public Facility Damage Reported",
        "am": "የህዝብ ንብረት ጉዳት ሪፖርት ተደርጓል",
        "or": "Miidhaa Meeshaa Ummataa Gabaafame",
        "ti": "ጉድኣት ናይ ህዝቢ ትካል ተሓቢሩ",
    },
    "other": {
        "en": "Infrastructure Issue Detected",
        "am": "የመሠረተ ልማት ችግር ተገኝቷል",
        "or": "Rakkoo Inifraastirakcharii Argame",
        "ti": "ጸገም መሰረተ ልምዓት ተረኺቡ",
    },
}

# Prefix for low confidence
LOW_CONFIDENCE_PREFIX = {
    "en": "Possible",
    "am": "ሊሆን የሚችል",
    "or": "Maluu",
    "ti": "ዝምስል",
}

CONFIDENCE_THRESHOLD = 0.60


def generate_title(category: str, confidence: float, language: str = "en") -> str:
    """
    Generates a suggested report title.

    Args:
        category:   predicted category e.g. "road_damage"
        confidence: model confidence 0.0–1.0
        language:   language code "en"/"am"/"or"/"ti"

    Returns:
        str: suggested title in the requested language

    Examples:
        generate_title("road_damage", 0.94, "en") → "Road Damage Detected"
        generate_title("road_damage", 0.40, "en") → "Possible Road Damage Detected"
        generate_title("road_damage", 0.94, "am") → "የመንገድ ጉዳት ተገኝቷል"
    """
    lang = language if language in ("en", "am", "or", "ti") else "en"
    cat  = category if category in TITLES else "other"

    base_title = TITLES[cat][lang]

    # Add "Possible" prefix for low confidence
    if confidence < CONFIDENCE_THRESHOLD:
        prefix = LOW_CONFIDENCE_PREFIX[lang]
        return f"{prefix} {base_title}"

    return base_title


if __name__ == "__main__":
    print("Testing title generator...\n")

    cases = [
        ("road_damage",         0.94, "en"),
        ("road_damage",         0.40, "en"),
        ("water_leakage",       0.85, "am"),
        ("garbage",             0.72, "or"),
        ("streetlight_failure", 0.55, "ti"),
    ]

    for cat, conf, lang in cases:
        title = generate_title(cat, conf, lang)
        print(f"  Category: {cat}  Confidence: {conf}  Lang: {lang}")
        print(f"  Title   : {title}")
        print()
