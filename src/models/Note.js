import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
    dni: {
        type: String,
        required: true,
        match: /^[0-9]{8}$/, 
        unique: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Note', noteSchema);
