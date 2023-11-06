window.onload=function(){
  const storedDiaryData = localStorage.getItem('userDiaryData');

if (storedDiaryData) {
  const diaryData = JSON.parse(storedDiaryData);
  console.log(diaryData);

  const titleElement = document.getElementById('destination-title');
  const headingElement = document.getElementById('destination-heading');
  const descriptionElement = document.getElementById('destination-description');
  const myReviewElement = document.getElementById('review-heading');
  const personalReviewElement = document.getElementById('personal-review');

  titleElement.textContent = diaryData.name;
  headingElement.textContent = `About ${diaryData.name}`;
  myReviewElement.textContent = `My review of ${diaryData.name}`;
  descriptionElement.textContent = diaryData.des;
  personalReviewElement.textContent = diaryData.rev;
  console.log(diaryData);
}



    let canvas=document.getElementById('destination-photo');
    let context =canvas.getContext('2d');

   
    let canvasWidth=canvas.width;
    let canvasHeight=canvas.height;
    const user = localStorage.getItem("user");
    console.log(user);
    let img=new Image();
  
    // img.src="/media/fructe.png";

    // //context.drawImage(url,x,y,width,height)
    // img.onload=function(){
    // context.drawImage(img,0,0,canvas.width,canvas.height);
    // }

    // img.onerror = function () {
    //     console.error("Failed to load the image.");
    // };
    // JavaScript to update the content and title based on the clicked link
    const urlParams = new URLSearchParams(window.location.search);
    // ...

fetch("/json_files/Reviews.json")
.then((response) => response.json())
.then((data) => {
  const destinationTitle = urlParams.get("title");
  const user1 = localStorage.getItem("user");
  const user = user1.substring(1, user1.length - 1);
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

    // Extract and display all usernames and reviews for the destination
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


});



// ...


    const destinationTitle = urlParams.get("title");
    const destinationDescription = urlParams.get("description");
    const destinationImage = urlParams.get("photo");
    const destinationTopAttractions = JSON.parse(urlParams.get("topAttractions"));
    console.log(destinationImage);
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
