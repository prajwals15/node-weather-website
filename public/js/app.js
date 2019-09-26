const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");


//On Submit event of the weather form
weatherForm.addEventListener("submit", (event) => {
    //Avoid page refresh
    event.preventDefault();

    const location = searchElement.value;
    //console.log(location);

    // Perform input validation later
    // Using dynamix port provided by Heroku
    const url = "/weather?address=" + location;

    msg1.textContent = "Loading ...";
    msg2.textContent = "";
    //Fetch Api from js
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    });

});