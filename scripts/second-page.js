document.addEventListener("DOMContentLoaded", function () {

  //COD DE VERIFICAT----------------------------------------------
  const newDestinations= localStorage.getItem("newDestinations") ? JSON.parse(localStorage.getItem("newDestinations")) : [];
  const newDest= {
    destination: localStorage.getItem("destination"),
    review: localStorage.getItem("review"),
    description: localStorage.getItem("description"),
    topAttractions: localStorage.getItem("topAttractions"),
    photo: localStorage.getItem("recent-image")
  };

  if(!newDestinations.find(item => item.destination === newDest.destination)) {
    newDestinations.push(newDest);
  }

  localStorage.removeItem("destination");
  localStorage.removeItem("review");
  localStorage.removeItem("description");
  localStorage.removeItem("topAttractions");
  localStorage.removeItem("recent-image");
  //COD DE VERIFICAT----------------------------------------------


  const logoutButton = document.getElementById("logout_btn");

  logoutButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  const addButton = document.getElementById("add_btn");
  addButton.addEventListener("click", function () {
    window.location.href = "third-page.html";
  });

  const deleteButton = document.getElementById("delete_btn");

  const user1 = localStorage.getItem("user");
  const user = user1.substring(1, user1.length - 1);

  const welcomeMsg= document.getElementById("welcome_msg");
    welcomeMsg.innerHTML = `Welcome ${user} to your journal!`;

  fetch("/json_files/Destinations.json")
    .then((response) => response.json())
    .then((data) => {
      const destinationsList = document.getElementById("destinationList");
      const destinations = data.destinations.filter((destinations) =>
        destinations.usernames.find((username) => username === user)
      );
      destinations.forEach((destination) => {
        const destinationListItem = document.createElement("li");
        destinationListItem.className = "destination-item";

        const anchor = document.createElement("a");
        anchor.href = `fourth-page.html?title=${encodeURIComponent(destination.name)}&description=${encodeURIComponent(destination.description)}&photo=${encodeURIComponent(destination.photo)}&topAttractions=${encodeURIComponent(JSON.stringify(destination.topAttractions))}`;
        anchor.className = "custom-link";
        anchor.target = "_self";
        anchor.textContent = destination.name;
        
        destinationListItem.appendChild(anchor);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.id = "delete_btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          destinationListItem.remove();
        });
        destinationListItem.appendChild(deleteButton);
        destinationsList.appendChild(destinationListItem);
      });
    })
    .catch((error) => {
      console.error("Error loading user data:", error);
    });

    //COD DE VERIFICAT----------------------------------------------

    if(newDestinations.length>0){
      console.log(newDestinations);

      for (let i = 0; i < newDestinations.length; i++){
        if(newDestinations[i].destination !=null || newDestinations[i].review !=null || newDestinations[i].description !=null){

          const destinationList= document.getElementById("destinationList");
          const newDest= document.createElement("li");
          newDest.className= "destination-item";
          const anchor= document.createElement("a");

          anchor.href= `fourth-page.html?title=${encodeURIComponent(newDestinations[i].destination)}
          &description=${encodeURIComponent(newDestinations[i].description)}
          &photo=${encodeURIComponent('fructe.png')}
          &topAttractions=${encodeURIComponent(newDestinations[i].topAttractions)}`;

          anchor.className= "custom-link";
          anchor.target= "_self";
          anchor.textContent= newDestinations[i].destination;
          newDest.appendChild(anchor);

          const delBtn= document.createElement("button");
          delBtn.className= "delete-btn";
          delBtn.id= "delete_btn";
          delBtn.textContent= "Delete";
          delBtn.addEventListener("click", function(){
            newDest.remove();
            newDestinations.splice(newDestinations.findIndex(item => item.destination === newDestinations[i].destination), 1);
            localStorage.setItem("newDestinations", JSON.stringify(newDestinations));
          });
        newDest.appendChild(delBtn);
        destinationList.appendChild(newDest);
      }


         }
    }
    //COD DE VERIFICAT----------------------------------------------


    // if(localStorage.getItem("review")!=null){
    //   const destinationList = document.getElementById("destinationList");
    //   const newDest = document.createElement("li");
    //   newDest.className = "destination-item";
    //   const anchor = document.createElement("a");
    //   anchor.href = `fourth-page.html?title=${encodeURIComponent(localStorage.getItem("destination"))}&description=${encodeURIComponent(localStorage.getItem("review"))}&photo=${encodeURIComponent('fructe.png')}&topAttractions=${encodeURIComponent(JSON.stringify('Nada'))}`;
    //   anchor.className = "custom-link";
    //   anchor.target = "_self";
    //   anchor.textContent = localStorage.getItem("destination");
    //   newDest.appendChild(anchor);
  
    //   const delBtn = document.createElement("button");
    //   delBtn.className = "delete-btn";
    //   delBtn.id = "delete_btn";
    //   delBtn.textContent = "Delete";
    //   delBtn.addEventListener("click", function () {
    //     newDest.remove();
    //   });
    //   newDest.appendChild(delBtn);
    //   destinationList.appendChild(newDest);
      

    // }
  


});
