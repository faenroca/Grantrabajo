import { loadNotes, onNewNote, onSelected } from "./socket.js";
import { onHandleSubmit, renderNotes, appendNote, fillForm } from "./iu.js";

const noteForm = document.querySelector('#noteForm');

noteForm.addEventListener('submit', onHandleSubmit);

loadNotes(renderNotes);
onNewNote(appendNote);
onSelected(fillForm);
