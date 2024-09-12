let profiles = [];

fetch('profiles.json')  
    .then(response => response.json())
    .then(data => {
        profiles = data.profiles;
    });


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const errorMessage = document.getElementById('errorMessage');

    const user = profiles.find(profile => profile.email === email && profile.password === password && profile.role === role);

    if (user) {
    
        window.location.href = `Dashboard.html?userId=${user.id}`;
    } else {
        errorMessage.innerText = "Incorrect credentials or role.";
        errorMessage.style.display = 'block';
    }
});
