/* eslint-disable*/

// import axios from "axios";
// import { showAlert, hideAlert } from "./alert";

const signupAjax = async (username, email, password, captcha) => {
    const res = await axios({
        method: "POST",
        url: "/signup",
        data: {
        username,
        email,
        password,
        captcha
        },
    });

    if (res.data.status === "captcha-not-done") {
        showAlert("error", "Captcha not done!!");
        document.querySelector(".btn-submit").disabled = false;
        grecaptcha.reset();
    } else if (res.data.status === "Failed-captcha-verification") {
        showAlert("error", "Captcha verification failed!! Try again");
        document.querySelector(".btn-submit").disabled = false;
        grecaptcha.reset();
    } else if (res.data.status === "email_exist") {
        showAlert("error", "Email already exists!");
        document.querySelector(".btn-submit").disabled = false;
    } else if (res.data.status === "username_exist") {
        showAlert("error", "Username already taken!");
        document.querySelector(".btn-submit").disabled = false;
    } else if (res.data.status === 'success') {
        showAlert('success', 'Signup Successfull. Verification Mail Sent. Verify to continue');
        window.setTimeout(() => {
            location.assign('/login');
        }, 1500);
    }
};

var onSubmit = (token) => {
    const username = document.getElementById("username").value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signupAjax(username, email, password, token);
}


// const checkEmail = (input) => {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!re.test(String(input.value).toLowerCase())) {
//         showAlert("error", "Enter a valid email");
//     } else return true;
// };

const checkFieldMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showAlert("error", "Passwords do not match");
    } else return true;
};


const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);


const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showAlert("error", `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showAlert("error", `${getFieldName(input)} cannot exceed ${max} characters`);
    } else return true;
};



document.getElementById("signup-form").addEventListener('submit', (e) => {
    e.preventDefault();
    if( checkLength(document.getElementById("username"), 3, 50) &&
        // checkEmail(document.getElementById('email')) &&
        checkLength(document.getElementById('password'), 6, 50) &&
        checkFieldMatch(document.getElementById("c-password"), document.getElementById('password')) )  {
            // document.querySelector(".btn-submit").disabled = true;
            grecaptcha.execute();
    }
})