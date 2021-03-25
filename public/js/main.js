const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveRoom = document.querySelector('.leave-room-btn');


// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

leaveRoom.addEventListener('click', e => {
    e.preventDefault();

    window.location.replace(`http://localhost:3000/room.html?username=${username}`);

});

// We have access to the IO because of script added in chat.html
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('fetchChats', async ({ room }) => {
    await outputPrevMessages(room);
})

// Listening for the message
socket.on('message', message => {

    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = chatForm.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    chatForm.msg.value = '';
    chatForm.msg.focus();
});

// Output message to the DOM
function outputMessage(msg) {

    const div = document.createElement('div');
    div.classList.add('message')

    div.innerHTML = `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
       ${msg.text}
    </p>
    `;

    chatMessages.appendChild(div);
}

async function outputPrevMessages(name) {

    try {
        const msgs = await axios.get(`http://localhost:3000/api/chats?room=${name}`,
        );

        // const messages = [];

        for (const msg of msgs.data) {

            const div = document.createElement('div');
            div.classList.add('message')

            div.innerHTML = `
                <p class="meta">${msg.sender} <span>${moment(msg.time).format('h:mm a')}</span></p>
                <p class="text">
                ${msg.message}
                </p>`;

            chatMessages.appendChild(div);

        }

        // const chats = msgs.data.map(msg => `
        // <div class="message">
        //     <p class="meta">${msg.sender} <span>${moment(msg.time).format('h:mm a')}</span></p>
        //     <p class="text">
        //     ${msg.message}
        //     </p>
        // </div>` )

        // chatMessages.innerHTML = chats.join('');

        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (e) {
        console.log(e);
    }

}

// Add room name to document
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {

    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;

}

