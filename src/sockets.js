import Note from './models/Note';

export default (io) => {
    io.on('connection', (socket) => {
        const emitNotes = async () => {
            const notes = await Note.find();
            io.emit('server:loadnotes', notes);
        };

        emitNotes();

        socket.on('client:getnotes', async () => {
            emitNotes();
        });

        socket.on('client:newnote', async (data) => {
            try {
                const newNote = new Note(data);
                await newNote.save();
                emitNotes();
            } catch (error) {
                console.error('Error creating new note:', error);
            }
        });

        socket.on('client:deletenote', async (id) => {
            await Note.findByIdAndDelete(id);
            emitNotes();
        });

        socket.on('client:getnote', async (id) => {
            const note = await Note.findById(id);
            socket.emit('server:selectednote', note);
        });

        socket.on('client:updatenote', async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                dni: updatedNote.dni,
                description: updatedNote.description,
            });
            emitNotes();
        });
    });
};
