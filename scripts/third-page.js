window.onload = function () {

    const filePh=document.getElementById("file-photo");
    const canvas=document.getElementById("canvas");
    const context=canvas.getContext("2d");

document.addEventListener("click", function () {

    //add button
    const backButton= document.getElementById("add_btn");
    backButton.addEventListener("click", function(){
        window.location.href = "second-page.html";
    });

    //----geolocation api 

  function createMap(){
    if("geolocation"in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
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
    const backButton2= document.getElementById("goBack");
    backButton2.addEventListener("click", function(){
        window.location.href = "second-page.html";
    });

});
// filePh.addEventListener("change", function(){
//     const fr=new FileReader();
//     fr.readAsDataURL(filePh.files[0]);
//     fr.addEventListener("load", function(){
//         localStorage.setItem("photo", fr.result);
//         const img=new Image();
//         img.src=fr.result;
//         context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     });


// });
}