
const noteModal = new bootstrap.Modal(document.getElementById('noteModal'));

document.getElementById('addNote').addEventListener('click', () => {
    noteModal.show();
});

document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const description = document.getElementById('noteDescription').value;

    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        alert('Completado');
        noteModal.hide();
        document.getElementById('noteForm').reset();
    } else {
        alert('Error al agregar la nota');
    }
});
