document.addEventListener('DOMContentLoaded', function() {

  fetch('/json_files/Users.json')
    .then(response => response.json())
    .then(data => {

      const signUpButton = document.getElementById('sign_up_btn');
      signUpButton.addEventListener('click', function() {
        window.location.href = 'sign-up.html';
      });

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
      alert('Invalid username or password! :(');
    }
  }

  //---------------audio api

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const audioSource = audioContext.createBufferSource();

  const playButton = document.querySelector("#play_btn");
  const pauseButton = document.querySelector("#pause_btn");

  let music = false;

  function loadAudioFile() {
    fetch('/media/pianoBackground.mp3')
      .then(response => response.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer))
      .then(data => {
        audioSource.buffer = data;
        audioSource.connect(audioContext.destination);
      })
      .catch(error => console.error("Audio error!", error));
  }

  loadAudioFile();

  playButton.addEventListener("click", function() {
    if (!music) {
      audioSource.start(0);
      music = true;
    }
  });


  pauseButton.addEventListener("click", function() {
    if (music) {
      audioSource.stop(0);
      music = false;
    }
  });

});
