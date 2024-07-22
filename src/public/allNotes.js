
const socket = io();

const notesContainer = document.getElementById('notes');

const renderNotes = (notes) => {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'col-md-4';
        noteElement.dataset.id = note._id;
        noteElement.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${note.dni}</h5>
                    <!-- <p class="card-text">${note.description}</p> -->
                </div>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
};


socket.on('server:loadnotes', renderNotes);


socket.emit('client:getnotes');

document.getElementById('backToLogin').addEventListener('click', () => {
    window.location.href = 'login.html';
});
