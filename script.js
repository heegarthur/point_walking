
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(generateLocation, showError);
    } else {
        alert("Browser not supported");
    }
}

function generateLocation(position) {
    const myLat = position.coords.latitude;
    const myLon = position.coords.longitude;

    const R = 6371;
    const min_km = 2;
    const max_km = 3;

    const distance = Math.random() * (max_km - min_km) + min_km;
    const bearing = Math.random() * 2 * Math.PI;

    const lat1 = myLat * Math.PI / 180;
    const lon1 = myLon * Math.PI / 180;

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / R) +
        Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing));
    const lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat1),
        Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2));

    const newLat = lat2 * 180 / Math.PI;
    const newLon = lon2 * 180 / Math.PI;

    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${newLat},${newLon}`;
    window.open(url, '_blank');

    document.getElementById("output").innerHTML = `Your location:<br>Lat: ${myLat.toFixed(5)}, Lon: ${myLon.toFixed(5)}<br><br>
                                                   Chosen point:<br>Lat: ${newLat.toFixed(5)}, Lon: ${newLon.toFixed(5)}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Location disabled.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Locatie unavailable.");
            break;
        case error.TIMEOUT:
            alert("Locatie disabled.");
            break;
        default:
            alert("Unknown error by getting location.");
            break;
    }
}
