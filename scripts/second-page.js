document.addEventListener("DOMContentLoaded", function () {
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

    //---------INCA E WIP <3
    const destinationList = document.getElementById("destinationList");
    const newDest = document.createElement("li");
    newDest.className = "destination-item";
    const anchor = document.createElement("a");
    anchor.href = `fourth-page.html?title=${encodeURIComponent(localStorage.getItem("destination"))}&description=${encodeURIComponent(localStorage.getItem("review"))}&photo=${encodeURIComponent('fructe.png')}&topAttractions=${encodeURIComponent(JSON.stringify('Nada'))}`;
    anchor.className = "custom-link";
    anchor.target = "_self";
    anchor.textContent = localStorage.getItem("destination");
    newDest.appendChild(anchor);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.id = "delete_btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      newDest.remove();
    });

    newDest.appendChild(delBtn);

    destinationList.appendChild(newDest);




});
