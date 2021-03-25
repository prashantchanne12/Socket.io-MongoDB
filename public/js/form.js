const form = document.getElementById('join-form');
const errorMsg = document.getElementById('err');

// Get error message
const { error, username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

if (error) {
    errorMsg.innerText = `*${error}`;
}

if (username) {
    form.username.value = username;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value.toLowerCase();
    const password = form.password.value;
    // const room = form.room.value.toLowerCase();

    // await addUserInDB(username, password, room);
    await addUserInDB(username, password);

});

async function addUserInDB(username, password) {

    try {

        const res = await axios.post('/api/users', { username, password });

        if (res.data.err) {
            window.location.replace(`http://localhost:3000?error=${res.data.err}`);
        } else {
            window.location.replace(`http://localhost:3000/room.html?username=${res.data.username}`);
            // window.location.replace(`http://localhost:3000/chat.html?username=${username}&room=${room}`);
        }

    } catch (err) {
        console.error(err);
    }

}