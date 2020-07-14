/* eslint-disable */

const hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};

//type is 'success' or 'error'
const showAlert = (type, msg, time = 5) => {
    hideAlert();
    const markup = `<p class='alert alert--${type}'>${msg}</p>`;
    document.querySelector(".containerlev2").insertAdjacentHTML("beforeend", markup);
};
