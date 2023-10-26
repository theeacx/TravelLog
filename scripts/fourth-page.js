window.onload=function(){
    let canvas=document.getElementById('photo');
    let context =canvas.getContext('2d');

   
    let canvasWidth=canvas.width;
    let canvasHeight=canvas.height;

    const fruitImage=new Image();
    fruitImage.src="/media/fructe.png";

    //context.drawImage(url,x,y,width,height)
    fruitImage.onload=function(){
    context.drawImage(fruitImage,0,0,canvas.width,canvas.height);
    }

    fruitImage.onerror = function () {
        console.error("Failed to load the image.");
    };
}
