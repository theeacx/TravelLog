window.onload=function(){




  const backBtn = document.getElementById("goBackToDest");
  backBtn.addEventListener("click", function () {
    window.location.href = "second-page.html";
    localStorage.removeItem("clickedDest");
  });

  const clickedDestination = localStorage.getItem("clickedDest");
  console.log(clickedDestination);

if (clickedDestination) {
  const destinations= localStorage.getItem("newDestinations");
  console.log(destinations )
  // go through the destinations array and find the destination which has the same name as the clicked destination
  const diaryData = JSON.parse(destinations).find((dest) => dest.destination === clickedDestination);
  
  //console.log(diaryData);

  const titleElement = document.getElementById('destination-title');
  const headingElement = document.getElementById('destination-heading');
  const descriptionElement = document.getElementById('destination-description');
  const myReviewElement = document.getElementById('review-heading');
  const personalReviewElement = document.getElementById('personal-review');
  const otherReviews = document.getElementById('other-reviews-input');
  const topAttractionsElement = document.getElementById("destination-top-attractions");

   titleElement.textContent = diaryData.destination;
   headingElement.textContent = `About ${diaryData.destination}`;
   myReviewElement.textContent = `My review of ${diaryData.destination}`;
   descriptionElement.textContent = diaryData.description;
   personalReviewElement.textContent = diaryData.review;
   otherReviews.innerHTML = `<p>RoxanaPetrescu: Loved it here, would return any time! </p> TheaLixcandru: I had a great time! Would recommend! </p> LoredanaGroza: LOVELY time here, amazing people and food! </p> `;
   topAttractionsElement.innerHTML = `<p>${diaryData.destination}'s top attractions are:</p><ul>`;



    const topAttractions = diaryData.topAttractions.split(",");
    topAttractions.forEach(attraction => {
        topAttractionsElement.innerHTML += `<li>${attraction}</li>`;
    });
  

    const destinationImage = diaryData.photo;

   
    let canvas=document.getElementById('destination-photo');
    let context =canvas.getContext('2d');

   
    let canvasWidth=canvas.width;
    let canvasHeight=canvas.height;
    let img=new Image();
    if(destinationImage){
      img.src=destinationImage;

      img.onload=function(){
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(img,0,0,canvas.width,canvas.height);
      }

      img.onerror = function () {
          console.error("Failed to load the image.");
      };

      function createMap() {
        if ("geolocation" in navigator) {
    
            const locatiosn = JSON.parse(localStorage.getItem("newDestinations"));
            const destination = locatiosn.find((dest) => dest.destination == clickedDestination);
            const latitude = destination.latitude;
            const longitude = destination.longitude;    
            // now we have the coordinates of the destination
            // we can create the map
            const mymap = L.map("map").setView([latitude, longitude], 13);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            }).addTo(mymap);
    
            const marker = L.marker([latitude, longitude]).addTo(mymap);
        }
    
        else {
            alert("Geolocation not available");
        }
    }
    
    createMap();
    


  }


}



    let canvas=document.getElementById('destination-photo');
    let context =canvas.getContext('2d');

   
    let canvasWidth=canvas.width;
    let canvasHeight=canvas.height;
    const user = localStorage.getItem("user");

    let img=new Image();
  
  
    const urlParams = new URLSearchParams(window.location.search);
  

fetch("/json_files/Reviews.json")
.then((response) => response.json())
.then((data) => {
  const destinationTitle = urlParams.get("title");
  const user1 = localStorage.getItem("user");
  const user = user1.substring(1, user1.length - 1);

  console.log(data);
  console.log(destinationTitle);
  console.log(user);
  
  if (destinationTitle && user) {
    const destinationReview = data.destinationReviews.find((review) =>
      review.destination === destinationTitle
    );

    if (destinationReview) {
      const userReview = destinationReview.reviews.find(
        (review) => review.username === user
      );

      if (userReview) {
        const personalReviewElement = document.getElementById("personal-review");
        personalReviewElement.textContent = userReview.comment;
        console.log(userReview);
      } else {
        console.log("User's review not found for the destination.");
      }

    } else {
      console.log("Destination not found.");
    }


    const allReviewsElement = document.getElementById("other-reviews-input"); 
    //scz thea am schimbat asta ca aveai si clasa cu acelasi nume si creieru meu a fct scurt <3

    destinationReview.reviews.forEach((review) => {
      if (review.username !== user) {
        // const reviewItem = document.createElement("div");
        // reviewItem.innerHTML = `<p><strong>${review.username}:</strong> ${review.comment}</p>`;
        // allReviewsElement.appendChild(reviewItem);
        //allReviewsElement.textContent += `${review.username}: ${review.comment}\n`;
        const reviewItem = document.createElement("p");
        reviewItem.innerHTML = `<strong>${review.username}:</strong> ${review.comment}`;
        allReviewsElement.appendChild(reviewItem);
        
        //sa fie scrollable: 
        allReviewsElement.style.overflow = "auto";
        allReviewsElement.style.height = "200px";

      }
    });
  } else {
    console.log("Destination title or user not found.");
  }


  const title = urlParams.get("title");
  if(title=="Paris"){
    const mymap = L.map("map").setView([48.8566, 2.3522], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([48.8566, 2.3522]).addTo(mymap);
  }
  if(title=="Barcelona"){
    const mymap = L.map("map").setView([41.3851, 2.1734], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([41.3851, 2.1734]).addTo(mymap);
  }
  if(title=="Madrid"){
    const mymap = L.map("map").setView([40.4168, 3.7038], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([40.4168, 3.7038]).addTo(mymap);
  }
  if(title=="Copenhagen"){
    const mymap = L.map("map").setView([55.6761, 12.5683], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([55.6761, 12.5683]).addTo(mymap);
  }
  if(title=="Amsterdam"){
    const mymap = L.map("map").setView([52.3667, 4.8945], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([52.3667, 4.8945]).addTo(mymap);
  }
  if(title=="Rome"){
    const mymap = L.map("map").setView([41.9028, 12.4964], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(mymap);
    const marker = L.marker([41.9028, 12.4964]).addTo(mymap);
  }


});



// ...


    const destinationTitle = urlParams.get("title");
    const destinationDescription = urlParams.get("description");
    const destinationImage = urlParams.get("photo");
    const destinationTopAttractions = JSON.parse(urlParams.get("topAttractions"));
    //console.log(destinationImage);
    console.log("-------------------" + destinationTitle);

    const titleElement = document.getElementById("destination-title");
    const headingElement = document.getElementById("destination-heading");
    const descriptionElement = document.getElementById(
      "destination-description"
    );
    const topAttractionsElement = document.getElementById("destination-top-attractions");
    const myReviewElement = document.getElementById("review-heading");
    if(destinationImage){
        img.src=destinationImage;
        console.log(img.src);

        //context.drawImage(url,x,y,width,height)
        img.onload=function(){
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(img,0,0,canvas.width,canvas.height);
        }

        img.onerror = function () {
            console.error("Failed to load the image.");
        };
    }
    if (destinationTitle) {
      titleElement.textContent = destinationTitle;
      headingElement.textContent = `About ${destinationTitle}`;
      myReviewElement.textContent = `My review of ${destinationTitle}`;
    }

    if (destinationDescription) {
      descriptionElement.textContent = destinationDescription;
    }
    if(destinationTopAttractions){
        //topAttractionsElement.textContent=destinationTopAttractions;
        topAttractionsElement.innerHTML = `<p>${destinationTitle}'s top attractions are:</p><ul>`;
        destinationTopAttractions.forEach(attraction => {
            topAttractionsElement.innerHTML += `<li>${attraction}</li>`;
        });
        topAttractionsElement.innerHTML += '</ul>';
    }
    
   
    
}
