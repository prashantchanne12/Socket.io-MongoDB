const joinRoomForm = document.querySelector('.join-room');
const joinBtn = document.querySelector('.join-btn')

const createRoomForm = document.querySelector('.create-room');
const createBtn = document.querySelector('.create-btn');

const errorMsg = document.querySelector('.room-err');

let userName;

// Get error message
const { error, username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

if (error) {
    errorMsg.innerText = `*${error}`;

    setTimeout(() => {
        errorMsg.innerText = ``;
    }, 3000);
}

if (username) {
    userName = username;
}

console.log(userName);

joinBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    joinRoomForm.classList.remove('hidden');
    createRoomForm.classList.add('hidden');

});

createBtn.addEventListener('click', e => {
    e.preventDefault();

    createRoomForm.classList.remove('hidden');
    joinRoomForm.classList.add('hidden');
});

joinRoomForm.addEventListener('submit', e => {
    e.preventDefault();

    const roomName = joinRoomForm.roomname.value;
    joinRoomName(roomName);
});

createRoomForm.addEventListener('submit', e => {
    e.preventDefault();

    const roomName = createRoomForm.newroomname.value;
    createAndJoinRoomName(roomName);
});



async function joinRoomName(roomName) {
    try {

    } catch (e) {
        console.log(error);
    }
}

async function createAndJoinRoomName(roomName) {
    try {
        const res = await axios.post('/api/users/createRoom', { room: roomName });

        if (res.data.err) {
            window.location.replace(`http://localhost:3000/room.html?username=${userName}&error=${res.data.err}`);
        } else {
            window.location.replace(`http://localhost:3000/chat.html?username=${userName}&room=${res.data.name}`);
        }

    } catch (e) {
        console.log(error);
    }
}