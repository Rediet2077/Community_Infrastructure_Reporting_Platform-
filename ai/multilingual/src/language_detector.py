# language_detector.py
# Detects the language of a report text.
# Supports: English, Amharic, Afaan Oromo, Tigrinya
# Owner: AI Developer 1

import re

# ── Language character patterns ────────────────────────────
# Amharic and Tigrinya use Ethiopic script (Unicode range)
ETHIOPIC_PATTERN = re.compile(r'[\u1200-\u137F]')

# Common Afaan Oromo words (Latin script)
OROMO_KEYWORDS = {
    "riqicha", "bishaani", "karaa", "ibsaa", "suphaa",
    "gabaasa", "magaalaa", "baay", "mana", "daandii",
    "gootara", "dallaa", "lafa", "ganda", "naannoo"
}

# Common Amharic words (Ethiopic script indicators)
AMHARIC_KEYWORDS = {
    "መንገድ", "ውሃ", "ቆሻሻ", "መብራት", "ጉድጓድ",
    "ጎዳና", "ፍሳሽ", "ህንፃ", "ቦታ", "ሪፖርት",
    "ጥገና", "ችግር", "አደጋ", "ትልቅ", "ትንሽ"
}

# Common Tigrinya words (Ethiopic script indicators)
TIGRINYA_KEYWORDS = {
    "መንገዲ", "ማይ", "ጓሓፍ", "መብራት", "ጉድጓድ",
    "ጸገም", "ቦታ", "ሪፖርት", "ዓቢ", "ንኡስ",
    "ጽርግያ", "ቦቦ", "ምጥቃም", "ሓደጋ"
}


def detect_language(text: str) -> str:
    """
    Detects the language of the given text.

    Returns:
        "en" — English
        "am" — Amharic
        "or" — Afaan Oromo
        "ti" — Tigrinya
        "unknown" — cannot determine

    Examples:
        "Large pothole near the school" → "en"
        "ትልቅ ጉድጓድ በመንገዱ ላይ"           → "am"
        "Daandii irratti riqicha guddaa"  → "or"
        "ጉድጓድ ዓቢ ኣብ መንገዲ"               → "ti"
    """
    if not text or not text.strip():
        return "unknown"

    text_lower = text.lower().strip()

    # Check for Ethiopic script
    ethiopic_chars = ETHIOPIC_PATTERN.findall(text)
    if ethiopic_chars:
        # Distinguish Amharic vs Tigrinya by keywords
        words = set(text.split())
        amharic_hits  = len(words & AMHARIC_KEYWORDS)
        tigrinya_hits = len(words & TIGRINYA_KEYWORDS)

        if tigrinya_hits > amharic_hits:
            return "ti"
        return "am"  # default Ethiopic = Amharic

    # Check for Afaan Oromo keywords (Latin script)
    words_lower = set(text_lower.split())
    oromo_hits  = len(words_lower & OROMO_KEYWORDS)
    if oromo_hits >= 1:
        return "or"

    # Default to English
    return "en"


def get_language_name(code: str) -> str:
    """Returns the full name of a language code."""
    names = {
        "en": "English",
        "am": "Amharic",
        "or": "Afaan Oromo",
        "ti": "Tigrinya",
        "unknown": "Unknown",
    }
    return names.get(code, "Unknown")


if __name__ == "__main__":
    print("Testing language detector...\n")

    samples = [
        ("Large pothole near DBU gate causing accidents",   "en"),
        ("ትልቅ ጉድጓድ በቡና ሰርቪስ አካባቢ ያለ",                    "am"),
        ("Daandii irratti riqicha guddaa argame",           "or"),
        ("ጉድጓድ ዓቢ ኣብ መንገዲ ቦሌ ተረኺቡ",                       "ti"),
        ("",                                                "unknown"),
    ]

    for text, expected in samples:
        detected = detect_language(text)
        name     = get_language_name(detected)
        status   = "OK" if detected == expected else f"WRONG (expected {expected})"
        print(f"  Text    : {text[:45]}")
        print(f"  Detected: {detected} ({name})  {status}")
        print()
