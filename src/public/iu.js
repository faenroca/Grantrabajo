import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const notesList = document.querySelector('#notes');
const dni = document.querySelector('#dni');
const description = document.querySelector('#description');

let savedId = "";

const noteUI = note => {
    const div = document.createElement('div');
    div.innerHTML =
    `<div class="card card-body rounded-0">
     <div class="d-flex justify-content-between">
         <h1>${note.dni}</h1>
         <div>
             <button class="delete" data-id="${note._id}">Eliminar</button>
             <button class="update" data-id="${note._id}">Actualizar</button>
         </div>
     </div>
     <p>${note.description}</p>
    </div>`;
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', () => deleteNote(btnDelete.dataset.id));
    btnUpdate.addEventListener('click', () => getNoteById(btnUpdate.dataset.id));

    return div;
};

export const renderNotes = notes => {
    notesList.innerHTML = "";
    notes.forEach(note => notesList.append(noteUI(note)));
};

export const onHandleSubmit = (e) => {
    e.preventDefault();
    if (savedId) {
        updateNote(savedId, dni.value, description.value);
    } else {
        saveNote(dni.value, description.value);
    }
    savedId = '';
    dni.value = '';
    description.value = '';
};

export const appendNote = note => {
    notesList.append(noteUI(note));
};

export const fillForm = (note) => { 
    dni.value = note.dni;
    description.value = note.description;
    savedId = note._id;
};
