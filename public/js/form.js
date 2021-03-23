const form = document.getElementById('join-form');
const errorMsg = document.getElementById('err');

// Get error message
const { error } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

if (error) {
    errorMsg.innerText = `*${error}`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value.toLowerCase();
    const room = form.room.value.toLowerCase();

    await addUserInDB(username, room);

});

async function addUserInDB(username, room) {

    try {

        const res = await axios.post('/api/users', { username });

        if (res.data.err) {
            window.location.replace(`http://localhost:3000?error=${res.data.err}`);
        } else {
            window.location.replace(`http://localhost:3000/chat.html?username=${username}&room=${room}`);
        }

    } catch (err) {
        console.error(err);
    }

}