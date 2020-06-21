/*eslint-disable*/

const logoutAjax = async () => {
    const res = await axios({
        method: "POST",
        url: "/logout"
    })

    if(res.data.status === 'logged-out') {
        window.setTimeout(() => {
            location.assign('/login');
        }, 1000);
    }
};