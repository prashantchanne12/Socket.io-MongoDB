const form = document.getElementById('signup');
const errorMsg = document.getElementById('err');

// Get error message
const { error } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

if (error) {
    errorMsg.innerText = `*${error}`;
}

signup.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    await singnup(username, password);

});

async function singnup(username, password) {

    const data = { username, password }

    try {

        const res = await axios.post('/api/users/signup', data);

        if (res.data.err) {
            window.location.replace(`http://localhost:3000/signup.html?error=${res.data.err}`);
        } else {
            window.location.replace(`http://localhost:3000?username=${res.data.username}`);
        }

    } catch (e) {
        console.log(e);
    }

}