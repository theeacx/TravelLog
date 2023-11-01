window.onload = function () {
    //----geolocation api 

    function createMap() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const map = L.map('map').setView([lat, lon], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
                }).addTo(map);

                const locations = [];
                map.on("dblclick", function (event) {
                    const loc = L.marker(event.latlng).addTo(map);
                    locations.push(loc);

                    loc.on("click", function () {
                        map.removeLayer(loc);
                        const index = locations.indexOf(loc);
                        locations.splice(index, 1);
                    });
                });
            });
        }
        else {
            alert("Geoloc nu mere :(");
        }
    }

    createMap();

    //go back button
    const backButton2 = document.getElementById("goBack");
    backButton2.addEventListener("click", function () {
        window.location.href = "second-page.html";
    });

    const desti = document.getElementById("exampleFormControlInput1");
    const review = document.getElementById("exampleFormControlTextarea1");

    const addButton = document.getElementById("add_btn");

    addButton.addEventListener("click", function () {
        const name = desti.value;
        const reviewText = review.value;

        if (name && reviewText) {
            localStorage.setItem("destination", name);
            localStorage.setItem("review", reviewText);
            alert("Destination added to your diary! :)");
        } else {
            alert("Please fill in both fields before adding to your diary!");
        }

        console.log(localStorage.getItem("destination"));
        console.log(localStorage.getItem("review"));
    });

    const fileInput = document.querySelector("#myFileInput");
    const imageCanvas = document.querySelector("#imageCanvas");
    const ctx = imageCanvas.getContext("2d");

    // Clear the canvas when the page loads
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    fileInput.addEventListener("input", function () {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // Clear the canvas and draw the image on it
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
            };

            localStorage.setItem("recent-image", reader.result);
        });

        if (this.files[0]) {
            reader.readAsDataURL(this.files[0]);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const recentImageDataURL = localStorage.getItem("recent-image");
        if (recentImageDataURL) {
            // Draw the image on the canvas when the page loads
            const img = new Image();
            img.src = recentImageDataURL;
            img.onload = () => {
                ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
            };
        }
    });
}
