import random
import math
import webbrowser

def random_point(lat, lon, min_km=0.1, max_km=15):
    R = 6371
    distance = random.uniform(min_km, max_km)
    bearing = random.uniform(0, 2 * math.pi)

    lat1 = math.radians(lat)
    lon1 = math.radians(lon)

    lat2 = math.asin(
        math.sin(lat1) * math.cos(distance / R) +
        math.cos(lat1) * math.sin(distance / R) * math.cos(bearing)
    )

    lon2 = lon1 + math.atan2(
        math.sin(bearing) * math.sin(distance / R) * math.cos(lat1),
        math.cos(distance / R) - math.sin(lat1) * math.sin(lat2)
    )

    return math.degrees(lat2), math.degrees(lon2)

my_lat = 52.34653
my_lon = 4.92364

new_lat, new_lon = random_point(my_lat, my_lon)

url = f"https://www.google.com/maps/@?api=1&map_action=pano&viewpoint={new_lat},{new_lon}"

webbrowser.open(url)
print("Expeditiepunt:", new_lat, new_lon)
