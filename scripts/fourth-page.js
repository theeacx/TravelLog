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
    console.log(destinationImage);
    console.log("-------------------" + destinationTitle);

    const titleElement = document.getElementById("destination-title");
    const headingElement = document.getElementById("destination-heading");
    const descriptionElement = document.getElementById(
      "destination-description"
    );
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
    
}
