const changePasswordForm = document.querySelector("#change-password-form");
const registeredAccountsBody = document.querySelector("#registered-accounts-body");

// Retrieve the users array from local storage or create a new one
let users = JSON.parse(localStorage.getItem("users")) || [];

// Get the user's profile picture from local storage
let userProfilePic = localStorage.getItem('userProfilePic');

// Display the profile picture on the page
let profilePicElement = document.getElementById('profile-pic');
if (userProfilePic) {
  profilePicElement.setAttribute('src', userProfilePic);
} else {
  profilePicElement.setAttribute('src', 'default-profile-pic.png');
}



// Add event listener to file input for selecting profile picture
const profilePicInput = document.getElementById('profile-pic-input');
profilePicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function (e) {
    const imageDataURL = e.target.result;
    profilePicElement.setAttribute('src', imageDataURL);
    localStorage.setItem('userProfilePic', imageDataURL);
  };
  
  reader.readAsDataURL(file);
});









// Display registered accounts on the page
const uniqueUserPasswordArray = [];

users.forEach((user) => {
  const userPassword = `${user.username}-${user.password}`;

  if (!uniqueUserPasswordArray.includes(userPassword)) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.username}</td><td>${user.password}</td><td>${user.isAdmin ? "Yes" : "No"}</td><td><button class="delete-btn" data-username="${user.username}">Delete</button></td>`;
    registeredAccountsBody.appendChild(row);
    uniqueUserPasswordArray.push(userPassword);
  }
});



// Handle change password form submission
changePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const username = event.target.elements.username.value;
  const currentPassword = event.target.elements["current-password"].value;
  const newPassword = event.target.elements["new-password"].value;
  const user = users.find((user) => user.username === username);
  
  if (user && user.password === currentPassword) {
    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password changed successfully!");
    event.target.reset();
  } else {
    alert("Invalid username or password.");
  }
});

registeredAccountsBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const username = event.target.getAttribute("data-username");
    users = users.filter(user => user.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
    alert(`User ${username} deleted successfully.`);
    
  }});





// Retrieve the logout button element
const logoutButton = document.querySelector("#logout-button");

// Add click event listener to the logout button
logoutButton.addEventListener("click", () => {
  // Perform logout actions here
  // For example, clear any stored user data and redirect to the login page
  localStorage.removeItem("users");
  localStorage.removeItem("userProfilePic");
  window.location.href = "mini.html";
});

