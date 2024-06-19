import React from 'react';
import notesStore from '../stores/notesStore';

function CreateForm({ closeModal }) {
    const store = notesStore();

    if (store.updateForm._id) return null; // Return null to render nothing if update form is active

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await store.createNote(); // Await the createNote function call
        closeModal(); // Close the modal after note creation
    };

    return (
        <div className="mt-5">
            <h2>Create Note</h2>
            <form className="flex flex-col gap-5 w-1/2" onSubmit={handleSubmit}>
                <input
                    className="border border-black"
                    onChange={(e) => store.updateCreateFormField(e)}
                    value={store.createForm.title}
                    name="title"
                    placeholder="Enter title"
                />
                <textarea
                    className="border border-black"
                    onChange={(e) => store.updateCreateFormField(e)}
                    value={store.createForm.body}
                    name="body"
                    placeholder="Enter body"
                />
                <button type="submit" className="border border-black">
                    Create note
                </button>
            </form>
        </div>
    );
}

export default CreateForm;
