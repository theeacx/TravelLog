window.onload = function () {

    //----geolocation api 


  let latitude = null;
let longitude = null;
    

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
                    

                   latitude = event.latlng.lat;
                    longitude = event.latlng.lng;
                    
                   
                    loc.on("click", function () {
                        map.removeLayer(loc);
                        const index = locations.indexOf(loc);
                        locations.splice(index, 1);

                        latitude = null;
                        longitude = null;

    

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


    //COD DE VERIFICAT----------------------------------------------
    const desti = document.getElementById("exampleFormControlInput1");
    const description=document.getElementById("exampleFormControlTextarea2");
    const review = document.getElementById("exampleFormControlTextarea3");
    const attr=document.getElementById("exampleFormControlTextarea4");

    


    const addButton = document.getElementById("add_btn");

    //COD DE VERIFICAT----------------------------------------------
    addButton.addEventListener("click", function () {
        const name = desti.value;
        const rev = review.value;
        const des=description.value;
        const topAttractions=attr.value;

        console.log(topAttractions);

        if (name && rev && des && topAttractions) {
            localStorage.setItem("destination", name);
            localStorage.setItem("review", rev);
            localStorage.setItem("description", des);
            localStorage.setItem("topAttractions", topAttractions);
            localStorage.setItem("latitude", latitude); 
            localStorage.setItem("longitude", longitude);
            alert("Destination added to your diary! :)");
        } else {
            alert("Please fill in both fields before adding to your diary!");
        }

        // console.log(localStorage.getItem("destination"));
        // console.log(localStorage.getItem("review"));
        // console.log(localStorage.getItem("description"));
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

