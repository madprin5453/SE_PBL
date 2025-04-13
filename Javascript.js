function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("form-title").innerText = "Signup";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("form-title").innerText = "Login";
}

// Handle login and redirect on match
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // prevent actual form submission for now

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Dummy credentials for demonstration
  const dummyEmail = "user@example.com";
  const dummyPassword = "123456";

  if (email === dummyEmail && password === dummyPassword) {
    window.location.href = "Dashboard.html"; // redirect on match
  } else {
    alert("Invalid email or password. Please try again.");
  }
});