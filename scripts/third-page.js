document.addEventListener("DOMContentLoaded", function () {

    //go back button
    const backButton= document.getElementById("goBack");
    backButton.addEventListener("click", function(){
        window.location.href = "second-page.html";
    });

});