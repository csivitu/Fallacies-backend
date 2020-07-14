/* eslint-disable*/

// import axios from "axios";

const submissionAjax = async (answer) => {
    const res = await axios({
    method: "POST",
    url: "/submissions",
    data: {
        answer
    },
    });

    if(res.data.status === "all-question-complete" || res.data.status === "completed") {
        const el = document.querySelector('.alert');
        if(el) el.parentElement.removeChild(el);
        document.querySelector('.form__group-end').style.display = "none";
        document.querySelector(".message").innerHTML="Congratulations!!! You have completed all the questions";
    } else if(res.data.status === "wrong-answer") {
        const el = document.querySelector('.alert');
        if(el) el.parentElement.removeChild(el);
        const markup1 = `<h3 class='alert alert--error'>Ping Pong, you are wrong!!</h3>`;
        document.querySelector(".form__group-msg").insertAdjacentHTML("beforeend", markup1);
        setTimeout(() => {
            if(document.querySelector('.alert')) document.querySelector('.alert').parentElement.removeChild(document.querySelector('.alert'), 2000);
        }, 2000)
    } else {
        const el = document.querySelector('.alert');
        if(el) el.parentElement.removeChild(el);
        const markup2 = `<h3 class='alert alert--success'>You are Correct!!</h3>`;
        document.querySelector(".form__group-msg").insertAdjacentHTML("beforeend", markup2);
        document.querySelector(".message").innerHTML=`Clue: <a class="insta-link" href="https://www.instagram.com/${res.data.status}/">@${res.data.status}</a>`
        window.setTimeout(() => {
            if(document.querySelector('.alert')) document.querySelector('.alert').parentElement.removeChild(document.querySelector('.alert'));
            document.getElementById('answer').value="";
        }, 2000);
    }
}


document.getElementById("game-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    submissionAjax(document.getElementById('answer').value);
});

document.getElementById("leaderboard").addEventListener('click', () => {
    window.location.replace('/leaderboard');
});