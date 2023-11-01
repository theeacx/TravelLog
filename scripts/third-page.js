window.onload = function () {

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

}