# location_similarity.py
# Compares two GPS locations and returns similarity score.
# Owner: AI Developer 1
#
# Simple idea:
#   If two reports are submitted 50 meters apart → very likely same problem
#   If two reports are 5km apart → probably different problems
#
# Uses Haversine formula to calculate real distance in meters
# between two GPS coordinates.

import math


def haversine_distance(lat1: float, lon1: float,
                       lat2: float, lon2: float) -> float:
    """
    Calculates the real distance in meters between two GPS points.

    Uses Haversine formula — works on a sphere (Earth).

    Args:
        lat1, lon1: GPS of report A (latitude, longitude)
        lat2, lon2: GPS of report B (latitude, longitude)

    Returns:
        float: distance in meters
    """
    R = 6371000  # Earth radius in meters

    # Convert degrees to radians
    lat1_r = math.radians(lat1)
    lat2_r = math.radians(lat2)
    d_lat  = math.radians(lat2 - lat1)
    d_lon  = math.radians(lon2 - lon1)

    # Haversine formula
    a = (math.sin(d_lat / 2) ** 2 +
         math.cos(lat1_r) * math.cos(lat2_r) *
         math.sin(d_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c  # distance in meters


def compute_location_similarity(lat1: float, lon1: float,
                                lat2: float, lon2: float,
                                max_distance_m: float = 100.0) -> float:
    """
    Converts distance between two GPS points into a similarity score.

    Score range: 0.0 to 1.0
      1.0 = same location (0 meters apart)
      0.0 = far away (more than max_distance_m apart)

    Default: reports within 100 meters are considered nearby.
    Reports further than 100 meters score 0.

    Example:
      Report A: lat=9.0192, lon=38.7525  (near DBU gate)
      Report B: lat=9.0194, lon=38.7527  (50 meters away)
      Result: 0.75  (close — likely same problem)

    Args:
        lat1, lon1: GPS coordinates of report A
        lat2, lon2: GPS coordinates of report B
        max_distance_m: distance in meters beyond which score is 0

    Returns:
        float: similarity score between 0.0 and 1.0
    """
    # Handle missing coordinates
    if None in (lat1, lon1, lat2, lon2):
        return 0.0

    distance = haversine_distance(lat1, lon1, lat2, lon2)

    if distance >= max_distance_m:
        return 0.0

    # Linear decay: 0m → 1.0,  100m → 0.0
    score = 1.0 - (distance / max_distance_m)
    return round(max(0.0, min(1.0, score)), 4)


if __name__ == "__main__":
    print("Testing location similarity...\n")

    cases = [
        (9.0192, 38.7525, 9.0192, 38.7525, "Same point → should be 1.0"),
        (9.0192, 38.7525, 9.0194, 38.7527, "~30m apart → should be HIGH"),
        (9.0192, 38.7525, 9.0200, 38.7535, "~120m apart → should be 0.0"),
        (9.0192, 38.7525, 9.0500, 38.8000, "Far away → should be 0.0"),
    ]

    for lat1, lon1, lat2, lon2, description in cases:
        dist  = haversine_distance(lat1, lon1, lat2, lon2)
        score = compute_location_similarity(lat1, lon1, lat2, lon2)
        print(f"  Distance: {dist:.1f}m")
        print(f"  Score   : {score:.2f}  ({description})")
        print()
