/* eslint-disable */
// import axios from "axios";
// import { showAlert, hideAlert } from "./alert";

const loginAjax = async (email, password, captcha) => {
    const res = await axios({
    method: "POST",
    url: "/login",
    data: {
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
    } else if (res.data.status === "not-verified") {
        showAlert("error", "Account not verified. Verify to continue!");
        document.querySelector(".btn-submit").disabled = false;
        grecaptcha.reset();
    } else if (res.data.status === "logged-in") {
        hideAlert();
        window.setTimeout(() => {
            location.assign('/homepage');
        }, 500);
    } else if(res.data.status === 'invalid-creds') {
        showAlert("error", "Invalid Credentials!");
        document.querySelector(".btn-submit").disabled = false;
        grecaptcha.reset();
    }
};

var onSubmit = (token) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginAjax(email, password, token);
}


const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector(".btn-submit").disabled = true;
    grecaptcha.execute();
});
