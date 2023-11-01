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

    //go back button
    const backButton2= document.getElementById("goBack");
    backButton2.addEventListener("click", function(){
        window.location.href = "second-page.html";
    });

});
filePh.addEventListener("change", function(){
    const fr=new FileReader();
    fr.readAsDataURL(filePh.files[0]);
    fr.addEventListener("load", function(){
        const img=new Image();
        img.src=fr.result;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    });


});
}