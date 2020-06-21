/* eslint-disable*/
setInterval (async() => {
    await axios({
        method: "GET",
        url: "/leaderboard",
    });
}, 5*60*1000);

document.getElementById("submission").addEventListener('click', () => {
    window.location.replace('/submissions');
});
