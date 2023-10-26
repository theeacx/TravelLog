document.addEventListener("DOMContentLoaded", function () {
  const cancelBtn = document.getElementById("cancel_btn");
  cancelBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  const signUpBtn = document.getElementById("sign_up_btn");
  signUpBtn.addEventListener("click", function () {
    const pass = document.getElementById("floatingPasswordRepeat").value;
    const password = document.getElementById("floatingPassword").value;
    const username = document.getElementById("floatingInputUsername").value;
    const email = document.getElementById("floatingInputEmail").value;

    if (pass !== password) {
      alert("Passwords don't match!");
    } else if (username === "" || password === "" || email === "") {
      alert("Please fill in all the fields!");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address!");
    } else if (username.length < 3 || password.length < 3 || email.length < 3) {
      alert("Please enter at least 3 characters!");
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = "second-page.html";
      localStorage.setItem("user", JSON.stringify(username));
    }

  });
});
