const changePasswordForm = document.querySelector("#change-password-form");

let users = JSON.parse(localStorage.getItem("users")) || [];

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
	window.location.href = "mini.html";
  } else {
    alert("Invalid username or password.");
  }
});




let userProfilePic1 = localStorage.getItem('userProfilePic1');

// Display the profile picture on the page
let profilePicElement = document.getElementById('profile-pic');
if (userProfilePic1) {
  profilePicElement.setAttribute('src', userProfilePic1);
} else {
  profilePicElement.setAttribute('src', 'default-profile-pic.png');
}



// Add event listener to file input for selecting profile picture
const profilePicInput = document.getElementById('profile-pic-');
profilePicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function (e) {
    const imageDataURL = e.target.result;
    profilePicElement.setAttribute('src', imageDataURL);
    localStorage.setItem('userProfilePic1', imageDataURL);
  };
  
  reader.readAsDataURL(file);
});