const chatForm = document.getElementById('chat-form');

// We have access to the IO because of script added in chat.html
const socket = io();

// Listening for the message
socket.on('message', message => {
    console.log(message);

    outputMessage(message);
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = chatForm.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);
});

// Output message to the DOM
function outputMessage(msg) {

    const div = document.createElement('div');
    div.classList.add('message')

    div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${msg}
    </p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}