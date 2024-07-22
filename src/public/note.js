
const socket = io();

document.getElementById('noteForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const dni = document.getElementById('dni').value;
    const description = document.getElementById('noteDescription').value;

    if (!/^\d{8}$/.test(dni)) {
        alert('DNI debe contener exactamente 8 números.');
        return;
    }

    socket.emit('client:newnote', { dni, description });
    alert('Completado');
    document.getElementById('noteForm').reset();
});
