const socket = io();
let roomId = '';

function joinRoom() {
  roomId = document.getElementById('roomInput').value.trim();
  if (!roomId) return alert('Masukkan kode room!');

  socket.emit('join', roomId);
  document.getElementById('chat').style.display = 'block';
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value;
  if (!message) return;

  addMessage('Saya: ' + message);
  socket.emit('message', message);
  input.value = '';
}

socket.on('message', (msg) => {
  addMessage('Pengguna: ' + msg);
});

function addMessage(msg) {
  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.textContent = msg;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
