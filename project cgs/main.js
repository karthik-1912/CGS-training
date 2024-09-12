document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const firstName = document.getElementById('validationDefault01').value;
    const lastName = document.getElementById('validationDefault02').value;
    const username = document.getElementById('validationDefaultUsername').value;
    const email = document.getElementById('inputEmail4').value;
    const password = document.getElementById('inputPassword4').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address1 = document.getElementById('inputAddress').value;
    const address2 = document.getElementById('inputAddress2').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('inputState').value;
    const zip = document.getElementById('inputZip').value;
    const rememberMe = document.getElementById('gridCheck').checked ? "Yes" : "No";

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('passwordError').style.display = 'block';
        return; // Stop form submission
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    const output = `
      <h3>Registration Details</h3>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Address 1:</strong> ${address1}</p>
      <p><strong>Address 2:</strong> ${address2}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Zip:</strong> ${zip}</p>
      <p><strong>Remember Me:</strong> ${rememberMe}</p>
    `;

    document.getElementById('formOutput').innerHTML = output;
});
