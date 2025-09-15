document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-form-submit");
  const loginErrorMsg = document.getElementById("login-error-msg");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "nsskmitofficial@gmail.com" && password === "nsskmitnithin03") {
      alert("You have successfully logged in.");
      // Store login state in local storage
      localStorage.setItem("loggedIn", "true");
      // Redirect to the protected page
      window.location.href = "events.html"; // Change this to your protected page's URL
    } else {
      loginErrorMsg.style.opacity = 1;
    }
  });
});
