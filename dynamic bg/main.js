let currentStep = 1;

    function nextStep(step) {
      
      let currentInput = document.querySelector(`#step${step} input`);
      if (currentInput.value.trim() === "") {
        alert("Please fill in this field before proceeding.");
        return;
      }

      
      currentStep++;
      let nextStepElement = document.getElementById('step' + currentStep);
      if (nextStepElement) {
        nextStepElement.classList.add('active');
      }

      
      currentInput.disabled = true;
      document.querySelector(`#step${step} .btn-next`).style.display = 'none'; 

      
      if (step === 3) {
        document.getElementById('submitButton').style.display = 'block';
      }
    }

    function submitForm() {
      let name = document.getElementById('name').value;
      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;

      
      document.getElementById('resultName').innerText = name;
      document.getElementById('resultUsername').innerText = username;
      document.getElementById('resultEmail').innerText = email;
      document.getElementById('resultPassword').innerText = password;

      
      document.getElementById('registerForm').style.display = 'none';
      document.getElementById('result').style.display = 'block';
    }
    
