import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const notesStore = create((set) => ({
notes: null,
createForm: {
    title: '',
    body: '',
},

updateForm: {
    _id: null,
    title: '',
    body: '',
},


fetchNotes: async () => {
    try {
        // Fetch notes
        const res = await axios.get("/notes");
        // Set to state
        set({ notes: res.data.notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle error gracefully, e.g., show an error message to the user
    }
},


updateCreateFormField: (e) => {
    const {name, value} = e.target;

    set((state) => {
        return {
            createForm: {
                ...state.createForm,
                [name] : value,
            }
        }
    })
  },

  createNote: async (e) => {
    // Prevent default form submission
    if (e) e.preventDefault();

    try {
        const { createForm } = notesStore.getState();

        // Use toast.promise for async actions
        const promise = toast.promise(
            axios.post("/notes", createForm),
            {
                loading: 'Creating note...', // Loading message
                success: <b>Note created successfully!</b>, // Success message
                error: <b>There was an issue while creating note.</b>, // Error message
               
            },
        );

        // Wait for the request to complete
        const res = await promise;

        // Update state after successful creation
        set((state) => ({
            notes: [...state.notes, res.data.note],
            createForm: {
                title: '',
                body: ''
            },
            updateForm: {
                _id: null,
                title: '',
                body: ''
            }
        }));
    } catch (error) {
        console.error(error);
        // Error toast will be handled by toast.promise
    }
},



deleteNote: async (_id) => {
    try {
        // Use toast.promise for async actions
        const promise = toast.promise(
            axios.delete(`/notes/${_id}`),
            {
                loading: 'Deleting note...', // Loading message
                success: <b>Note deleted successfully!</b>, // Success message
                error: <b>There was an issue while deleting note.</b>, // Error message
            }
        );

        // Wait for the request to complete
        await promise;

        // Update state after successful deletion
        const { notes } = notesStore.getState();
        const newNotes = [...notes].filter((note) => note._id !== _id);
        set({ notes: newNotes });
    } catch (error) {
        console.error(error);
        // Error toast will be handled by toast.promise
    }
},

handleUpdateFieldChange: (e) => {
    const {value, name} = e.target;

    set(state => {
        return {
            updateForm:{
                ...state.updateForm,
                [name] : value
            }
        }
    })
  },

toggleUpdate: ({title, body, _id}) => {  
    // Set state on the update form
    set({
        updateForm: {
            title,
            body,
            _id
        }
    })
  },

  updateNote: async () => {
    const { updateForm } = notesStore.getState();

    // Ensure updateForm._id is defined before proceeding
    if (!updateForm._id) {
        console.error('Cannot update note: _id is not defined');
        return;
    }

    try {
        // Use toast.promise for async actions
        const promise = toast.promise(
            axios.put(`/notes/${updateForm._id}`, {
                title: updateForm.title,
                body: updateForm.body,
            }),
            {
                loading: 'Updating note...', // Loading message
                success: <b>Note updated successfully!</b>, // Success message
                error: <b>There was an issue while updating note.</b>, // Error message
            }
        );

        // Wait for the request to complete
        const res = await promise;

        // Update state after successful update
        set((state) => ({
            notes: state.notes.map((note) =>
                note._id === updateForm._id ? res.data.note : note
            ),
            updateForm: {
                _id: null,
                title: '',
                body: '',
            },
        }));
    } catch (error) {
        console.error('Error updating note:', error);
        // Error toast will be handled by toast.promise
    }
},
}))

export default notesStore 