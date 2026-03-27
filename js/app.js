const modal = document.getElementById("dealModal");
        const closeBtn = document.querySelector(".close-btn");
        const dealButtons = document.querySelectorAll(".deal-hero-btn");

        dealButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                modal.style.display = "flex";
            });
        });

        closeBtn.onclick = () => { modal.style.display = "none"; }
        window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }


        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Change slide every 5 seconds
        setInterval(showNextSlide, 5000);

        const texts = [
            { heading: "Deals You Can’t Resist", sub: "Grab Today’s Top Picks Before They’re Gone!" },
            { heading: "ڈیلز جو آپ نظر انداز نہیں کر سکتے", sub: "آج کی بہترین پیشکشیں ابھی حاصل کریں!" }
        ];

        const typedHeading = document.querySelector(".typed-text");
        const typedSubtext = document.querySelector(".typed-subtext");

        let textIndex = 0;
        let charIndex = 0;
        let subCharIndex = 0;
        let typingDelay = 70;
        let pauseDelay = 2000;

        function typeHeading() {
            const current = texts[textIndex];

            if (charIndex < current.heading.length) {
                typedHeading.textContent += current.heading.charAt(charIndex);
                charIndex++;
                setTimeout(typeHeading, typingDelay);
            } else if (subCharIndex < current.sub.length) {
                // Start typing subtitle after heading
                typedSubtext.textContent += current.sub.charAt(subCharIndex);
                subCharIndex++;
                setTimeout(typeHeading, typingDelay);
            } else {
                // Pause, then remove text
                setTimeout(eraseText, pauseDelay);
            }
        }

        function eraseText() {
            const current = texts[textIndex];

            if (subCharIndex > 0) {
                typedSubtext.textContent = current.sub.substring(0, subCharIndex - 1);
                subCharIndex--;
                setTimeout(eraseText, typingDelay / 2);
            } else if (charIndex > 0) {
                typedHeading.textContent = current.heading.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseText, typingDelay / 2);
            } else {
                // Move to next text
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeHeading, typingDelay);
            }
        }

        // Start typing effect
        document.addEventListener("DOMContentLoaded", typeHeading);

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async function (position) {

                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    try {
                        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`);
                        const data = await response.json();

                        if (data.results && data.results.length > 0) {
                            const results = data.results[0].address_components;

                            let city = "";
                            let area = "";

                            results.forEach(comp => {
                                if (comp.types.includes("locality")) {
                                    city = comp.long_name;
                                }
                                if (comp.types.includes("sublocality") || comp.types.includes("neighborhood")) {
                                    area = comp.long_name;
                                }
                            });

                            if (city) {
                                document.getElementById("city").value = city;
                                loadNearbyDeals(city);
                            }
                            if (area) {
                                const areaSelect = document.getElementById("area");
                                let optionExists = Array.from(areaSelect.options).some(opt => opt.text === area || opt.text.includes(area));
                                if (optionExists) areaSelect.value = area;
                                else {
                                    areaSelect.add(new Option(area, area, true, true));
                                }
                            }
                            alert(`Location detected: ${area ? area + ', ' : ''}${city}`);
                        } else {
                            alert("Could not detect address from coordinates.");
                        }
                    } catch (error) {
                        console.error("Geocoding failed:", error);
                        alert("Location service completely failed.");
                    }

                }, function () {
                    alert("Location access denied.");
                });
            } else {
                alert("Location not supported");
            }
        }

        const boxes = document.querySelectorAll(".cat-box");

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                boxes.forEach(b => b.classList.remove("active"));
                box.classList.add("active");

                // Store selected value
                const selectedCategory = box.getAttribute("data-value");
                console.log("Selected Category:", selectedCategory);
            });
        });

        // Urdu Typing Detection
        document.getElementById("searchInput").addEventListener("input", function (e) {
            const value = e.target.value;
            const isUrdu = /[\u0600-\u06FF]/.test(value);
            if (isUrdu) {
                console.log("Urdu typing detected");
            } else {
                console.log("English typing detected");
            }
        });

        // Voice Search
        function startVoice() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert("Voice recognition not supported in this browser.");
                return;
            }
            const recognition = new SpeechRecognition();
            recognition.lang = "ur-PK"; // Urdu + works for English too
            recognition.start();

            recognition.onresult = function (event) {
                const text = event.results[0][0].transcript;
                alert("You said: " + text);
                document.getElementById("searchInput").value = text;
                console.log("Voice Input:", text);
            };
        }

        // Nearby Deals logic
        window.products = [
            { name: "Honda Civic 2015", price: "2,500,000", area: "DHA", city: "Karachi", image: "images/product1.jpg" },
            { name: "iPhone 13 Pro", price: "280,000", area: "Gulshan", city: "Karachi", image: "images/product2.jpg" },
            { name: "Dell XPS 13", price: "180,000", area: "Saddar", city: "Karachi", image: "images/product3.jpg" },
            { name: "Toyota Corolla", price: "3,000,000", area: "DHA", city: "Lahore", image: "images/product1.jpg" }
        ];

        function quickSearch(term) {
            document.getElementById("searchInput").value = term;
        }

        function loadNearbyDeals(userCity) {
            const allProducts = window.products || [];

            const filtered = allProducts.filter(p =>
                p.city && p.city.toLowerCase().includes(userCity.toLowerCase())
            );

            const container = document.getElementById("nearbyDeals");
            container.innerHTML = "";

            if (filtered.length === 0) {
                container.innerHTML = "<p style='text-align:center; width:100%; grid-column:1/-1; color: rgba(255,255,255,0.7);'>No deals found near you right now.</p>";
                return;
            }

            filtered.forEach(p => {
                container.innerHTML += `
            <div class="product-card">
                <img src="${p.image}" />
                <h3>${p.name}</h3>
                <p class="price">PKR ${p.price}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${p.area}, ${p.city}</p>
                <div class="buttons">
                    <button class="compare-btn">Compare</button>
                    <a href="https://wa.me/923330360487" class="whatsapp-btn">WhatsApp</a>
                </div>
            </div>
        `;
            });
        }
    