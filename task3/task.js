function fetchRandomUser() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            document.getElementById('profileImage').src = user.picture.large;
            const fullName = `${user.name.first} ${user.name.last}`;
            document.getElementById('userName').textContent = fullName;
            const title = `${user.location.city}, ${user.location.country}`;
            document.getElementById('userTitle').textContent = title;
            document.getElementById('email').value = user.email;
            const dob = new Date(user.dob.date).toISOString().split('T')[0];
            document.getElementById('dob').value = dob;
            document.getElementById('gender').value = user.gender;
            document.getElementById('contact').value = user.phone;
            const address = `${user.location.street.number} ${user.location.street.name}, 
                             ${user.location.city}, 
                             ${user.location.state}, 
                             ${user.location.country}, 
                             ${user.location.postcode}`;
            document.getElementById('address').value = address;
        })
        .catch(error => console.error('Error fetching user:', error));
}

window.onload = function() {
    fetchRandomUser();
    document.getElementById('newBtn').addEventListener('click', fetchRandomUser);
};