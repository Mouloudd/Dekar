const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

// Retrieve users array from local storage or create a new one
let users = JSON.parse(localStorage.getItem("users")) || [];

// Create admin account
const admin = {
  username: "admin",
  password: "admin123",
  isAdmin: true,
};
users.push(admin);

// Save updated users array in local storage
localStorage.setItem("users", JSON.stringify(users));

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.elements["login-username"].value;
  const password = loginForm.elements["login-password"].value;

  // Find the user in the users array
  const user = users.find((user) => user.username === username);

  if (user && user.password === password) {
    if (user.isAdmin) {
      alert("Welcome back, admin!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "admin.html";
    } else {
      alert(`Welcome back, ${username}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "user.html";
      // Redirect to user dashboard page or perform other actions
    }
  } else {
    alert("Invalid username or password.");
  }

  loginForm.reset();
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = signupForm.elements["signup-username"].value;
  const password = signupForm.elements["signup-password"].value;

  // Check if the user already exists in the users array
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    alert("Username already exists. Please choose a different username.");
    return;
  }

  const user = {
    username: username,
    password: password,
    isAdmin: false,
  };

  // Add the new user to the users array
  users.push(user);

  // Save updated users array in local storage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful. Please log in.");
  signupForm.reset();
  
  // Refresh the page to prevent adding the user to the array when logging in
  location.reload();
});
