import Note from "../models/note.js";

// Fetch all notes for the authenticated user
const fetchNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json({ notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

// Fetch a single note by its ID for the authenticated user
const fetchNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await Note.findOne({ _id: noteId, user: req.user._id });

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.json({ note });
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ error: "Failed to fetch note" });
    }
};

// Create a new note for the authenticated user
const createNote = async (req, res) => {
    const { title, body } = req.body;

    try {
        const note = await Note.create({ title, body, user: req.user._id });
        res.status(201).json({ note });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Failed to create note" });
    }
};

// Update a note by its ID for the authenticated user
const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, body } = req.body;

    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, user: req.user._id },
            { title, body },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.json({ note: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Failed to update note" });
    }
};

// Delete a note by its ID for the authenticated user
const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const result = await Note.deleteOne({ _id: noteId, user: req.user._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.json({ success: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
};

export { fetchNotes, fetchNote, createNote, updateNote, deleteNote };
