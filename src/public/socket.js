const socket = io();

export const loadNotes = (callback) => {
    socket.on('server:loadnotes', callback);
    socket.emit('client:getnotes');
};

export const saveNote = (dni, description) => {
    socket.emit('client:newnote', { dni, description });
};

export const onNewNote = (callback) => {
    socket.on('server:newnote', callback);
};

export const deleteNote = id => {
    socket.emit('client:deletenote', id);
};

export const getNoteById = id => {
    socket.emit('client:getnote', id);
};

export const onSelected = (callback) => {
    socket.on('server:selectednote', callback);
};

export const updateNote = (id, dni, description) => {
    socket.emit('client:updatenote', { _id: id, dni, description });
};
