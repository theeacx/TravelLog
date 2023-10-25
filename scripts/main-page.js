document.addEventListener('DOMContentLoaded', function() {
    
    const loginButton = document.getElementById('login_btn');
  
    loginButton.addEventListener('click', function() {
      window.location.href = 'second-page.html';
    });
  });