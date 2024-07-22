import { Router } from 'express';
import Note from '../models/Note';

const router = Router();


router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/notes', async (req, res) => {
    const { dni, description } = req.body;
    if (!dni || !/^\d{8}$/.test(dni)) {
        return res.status(400).json({ message: 'DNI debe contener exactamente 8 números.' });
    }
    try {
        const newNote = new Note({ dni, description });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: 'Error creating note' });
    }
});

export default router;
