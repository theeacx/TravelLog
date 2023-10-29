window.onload=function(){
    let canvas=document.getElementById('destination-photo');
    let context =canvas.getContext('2d');

   
    let canvasWidth=canvas.width;
    let canvasHeight=canvas.height;

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
