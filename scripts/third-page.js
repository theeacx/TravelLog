window.onload = function () {

document.addEventListener("click", function () {

    //go back button
    const backButton= document.getElementById("add_btn");
    backButton.addEventListener("click", function(){
        window.location.href = "second-page.html";
    });

});

}