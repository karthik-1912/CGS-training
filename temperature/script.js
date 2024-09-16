
function convertTemperature() {
    const degree = parseFloat(document.getElementById("degree").value);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    let result;

    if (from === "celsius") {
        if (to === "fahrenheit") {
            result = (degree * 9 / 5) + 32;
        } else if (to === "kelvin") {
            result = degree + 273.15;
        } else {
            result = degree;
        }
    } else if (from === "fahrenheit") {
        if (to === "celsius") {
            result = (degree - 32) * 5 / 9;
        } else if (to === "kelvin") {
            result = (degree - 32) * 5 / 9 + 273.15;
        } else {
            result = degree;
        }
    } else if (from === "kelvin") {
        if (to === "celsius") {
            result = degree - 273.15;
        } else if (to === "fahrenheit") {
            result = (degree - 273.15) * 9 / 5 + 32;
        } else {
            result = degree;
        }
    }

    
    document.getElementById("result-value").textContent = result.toFixed(2);
    document.getElementById("result-unit").textContent = `°${to.toUpperCase()}`;

    
    const resultCard = document.getElementById("result-card");
    if (result > 25) {
        resultCard.classList.add("high");
        resultCard.classList.remove("low");
    } else {
        resultCard.classList.remove("high");
        resultCard.classList.add("low");
    }
}