document.addEventListener('DOMContentLoaded', function() {

  fetch('/json_files/Users.json')
    .then(response => response.json())
    .then(data => {

      const loginButton = document.getElementById('login_btn');
      loginButton.addEventListener('click', function() {

        const username = document.getElementById('floatingInputUsername').value;
        const password = document.getElementById('floatingPassword').value;
        const email = document.getElementById('floatingInputEmail').value;
        authentification(data, username, password, email);
        
      });
    })
    .catch(error => {
      console.error('Error loading user data:', error);
    });

  function authentification(userData, username, password, email) {
    const user = userData.users.find(user => user.username === username && user.password === password && user.email === email);
    if (user) {
      window.location.href = 'second-page.html';
      localStorage.setItem('user', JSON.stringify(username));

    } else {
      alert('Invalid username or password');
    }
  }

});
