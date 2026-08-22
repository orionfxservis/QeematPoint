// =========================
// LOCATION DETECTION SCRIPT
// =========================

const currentLocationEl = document.getElementById("current-location");
console.log("location.js loaded, currentLocationEl:", currentLocationEl);

// Show Location Modal (Optional)
function showLocationModal() {
    detectUserLocation(true);
}

// Auto detect immediately since script is at the bottom of the body
console.log("location.js: calling detectUserLocation directly");
detectUserLocation(false);

// Main Detect Function
function detectUserLocation(showAlert = false) {
    console.log("location.js: detectUserLocation called");
    if (!currentLocationEl) {
        console.log("location.js: currentLocationEl is null! Aborting.");
        return;
    }

    // Check Browser Support
    if (!navigator.geolocation) {
        console.log("location.js: geolocation not supported");
        currentLocationEl.textContent = "Location Unsupported";
        return;
    }

    currentLocationEl.textContent = "Detecting...";
    console.log("location.js: Requesting getCurrentPosition");

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            console.log("location.js: position received");
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                // Save coordinates for distance calculations
                localStorage.setItem("stopbuy_latitude", lat);
                localStorage.setItem("stopbuy_longitude", lon);

                // Reverse Geocoding API
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
                );
                const data = await response.json();

                // Extract more precise location (area/neighborhood + city)
                const addr = data.address || {};
                const area = addr.suburb || addr.neighbourhood || addr.residential || addr.city_district || addr.road;
                const city = addr.city || addr.town || addr.village || addr.state;
                
                let displayLocation = "Your Location";
                if (area && city && area !== city) {
                    displayLocation = `${area}, ${city}`;
                } else if (city) {
                    displayLocation = city;
                } else if (area) {
                    displayLocation = area;
                }
                
                currentLocationEl.textContent = displayLocation;
                localStorage.setItem("stopbuy_location", displayLocation);

                if (showAlert) {
                    alert("Location updated to: " + city);
                }
            } catch (error) {
                console.error("location.js error:", error);
                currentLocationEl.textContent = "Karachi";
            } finally {
                if (typeof renderFoodList === 'function') {
                    renderFoodList();
                }
            }
        },
        (error) => {
            console.log("location.js position error:", error);
            const savedLocation = localStorage.getItem("stopbuy_location");
            if (savedLocation) {
                currentLocationEl.textContent = savedLocation;
            } else {
                currentLocationEl.textContent = "Karachi";
            }
            if (showAlert) {
                alert("Could not detect precise location. Defaulting to saved location or Karachi.");
            }
            if (typeof renderFoodList === 'function') {
                renderFoodList();
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}
