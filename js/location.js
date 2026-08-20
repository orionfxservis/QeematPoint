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
                console.log("location.js: fetching from Nominatim");
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                );
                const data = await response.json();
                console.log("location.js: Nominatim response:", data);
                
                const city = data.address.city || data.address.town || data.address.village || data.address.state || "Your Location";
                currentLocationEl.textContent = city;
                localStorage.setItem("stopbuy_location", city);

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
        }
    );
}
