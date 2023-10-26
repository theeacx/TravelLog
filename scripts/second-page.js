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


  fetch("/json_files/Destinations.json")
    .then((response) => response.json())
    .then((data) => {
      const destinationsList = document.getElementById("destinationList");
      const destinations = data.destinations.filter((destinations) =>
        destinations.usernames.find((username) => username === user)
      );
      destinations.forEach((destination) => {
        const destinationListItem = document.createElement("li");

        const anchor = document.createElement("a");
        anchor.href = `fourth-page.html?title=${encodeURIComponent(destination.name)}&description=${encodeURIComponent(destination.description)}`;
        anchor.className = "custom-link";
        anchor.target = "_self";
        anchor.textContent = destination.name;
        
        destinationListItem.appendChild(anchor);

        destinationsList.appendChild(destinationListItem);
        
      });
    })
    .catch((error) => {
      console.error("Error loading user data:", error);
    });

    
});
