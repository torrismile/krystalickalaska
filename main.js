
function sentMessage(message) {
    debugger;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("Sending message: ", message);


    var raw = JSON.stringify(message);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log("Sending request: ", requestOptions);

    fetch("https://wqnrz0t84h.execute-api.eu-central-1.amazonaws.com/default/krystal_mailer", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function submitReservation(reservationDataStr) {
    console.log("Submiting reservation");
    const baseUrl = "http://52.59.194.36:3000/";
    const endpoint = "reservations";
    let url = baseUrl + endpoint;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: reservationDataStr
    }).then(() => {
        console.log("Submit succeeded")
    }).catch((err) => {
        console.log("Submit failed")
    })
    // POST - poslu serveru json
}

async function getReservations() {
    console.log("Getting reservation");
    const baseUrl = "http://52.59.194.36:3000/";
    const endpoint = "reservations";
    let url = baseUrl + endpoint;
    let response = await fetch(url, {
        method: "GET"
    });
    let json = await response.json();
    // GET vrati json
    return json;
}

function convertJson() {
    let formElement = document.getElementById('formJson');
    let formData = new FormData(formElement);
    debugger;

    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    console.log("Form converted to object:", object);
    return object;
}

function showMessage(username) {
    let newMassege = document.querySelector("#snackbar")
    newMassege.innerHTML = `Děkujeme, ${username}`;
    newMassege.classList.add('show');

    let btn = document.querySelector('.btn');
    btn.style.display = 'none';
}

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'section-reservation__form--form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'section-reservation__form--form-control success';
}

//Check email is valid
function checkEmail(input) {
    let isError = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        isError = true;
        showError(input, 'Email není platný');
    }
    return isError;
}

//Check required fields
function checkRequired(inputArr) {
    let isError = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isError = true;
        } else {
            showSuccess(input);
        }
    });
    return isError;
}

//Check input length
function checkLengthLetter(input, min, max) {
    let isError = true;
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} musí mít alespon ${min} písmen`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} musí mít menší ${max} písmen`);
    } else {
        isError = false;
        showSuccess(input);
    }
    return isError;
}

function checkLengthNumber(input, min, max) {
    let isError = true;
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} musí mít alespon ${min} čisel`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} musí mít menší ${max} čisel`);
    } else {
        isError = false;
        showSuccess(input);
    }
    return isError;
}
//Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function setReservationSubmit() {
    document.getElementById('jmeno').addEventListener('focusout', (event) => {
        checkLengthLetter(event.target, 3, 25);
    });
    document.getElementById('email').addEventListener('focusout', (event) => {
        checkEmail(event.target);
    });;
    document.getElementById('telefon').addEventListener('focusout', (event) => {
        checkLengthNumber(event.target, 9, 16);
    });;

    //Event listener
    document.querySelector("#reservation-submit").addEventListener('click', function (e) {
        e.preventDefault();
        let username = document.querySelector('#jmeno');
        let telephone = document.querySelector('#telefon');
        let email = document.querySelector('#email');

        let formError = checkRequired([username, telephone]);

        let userNameError = checkLengthLetter(username, 3, 25);
        let telephoneError = checkLengthNumber(telephone, 9, 16);
        let emailError = checkEmail(email);
        let formJson = convertJson();
        // formJson["image_url"] = window.localStorage.getItem("image_url");
        if (!(formError || userNameError || telephoneError || emailError)) {
            sentMessage(formJson);
            showMessage(username.value);
        }
    });
}

const images = document.querySelectorAll('.owl-carousel img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modalImg');
const modalTxt = document.querySelector('.modalTxt');
const close = document.querySelector('.close');
const nextBtnCurrent = document.querySelector('#nextBtnCurrent');
const prevBtnCurrent = document.querySelector('#prevBtnCurrent');
const nextBtnReserved = document.querySelector('#nextBtnReserved');
const prevBtnReserved = document.querySelector('#prevBtnReserved');
let index = 0;

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        index = parseInt(image.alt);
        modalImg.src = image.src;
        modalTxt.innerHTML = "Pokud se vám líbí, napište mi";
        modal.classList.add('appear');

        close.addEventListener('click', () => {
            modal.classList.remove('appear');
        })

        nextBtnCurrent.addEventListener('click', () => {
            index = index + 1;
            images.forEach((image) => {
                if(parseInt(image.alt) === index){
                    modalImg.src = image.src;
                }
            })
        })

        prevBtnCurrent.addEventListener('click', () => {
            index = index - 1;
            images.forEach((image) => {
                if(parseInt(image.alt) === index){
                    modalImg.src = image.src;
                }
            })
        })

        nextBtnReserved.addEventListener('click', () => {
            index = index + 1;
            images.forEach((image) => {
                if(parseInt(image.alt) === index){
                    modalImg.src = image.src;
                }
            })
        })

        prevBtnReserved.addEventListener('click', () => {
            index = index - 1;
            images.forEach((image) => {
                if(parseInt(image.alt) === index){
                    modalImg.src = image.src;
                }
            })
        })
    });
});