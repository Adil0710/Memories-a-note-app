// UpdateForm.js
import React from 'react';
import notesStore from '../stores/notesStore';

function UpdateForm() {
    const store = notesStore();

    if (!store.updateForm._id) return null;

    const handleUpdate = (e) => {
        e.preventDefault(); // Ensure e is defined before accessing preventDefault
        store.updateNote(); // Call updateNote method from store
    };

    return (
        <div className="mt-5">
            <h2>Update Note</h2>
            <form className="flex flex-col gap-5 w-1/2" onSubmit={handleUpdate}>
                <input
                    className="border border-black"
                    onChange={store.handleUpdateFieldChange}
                    value={store.updateForm.title}
                    name="title"
                />
                <textarea
                    className="border border-black"
                    onChange={store.handleUpdateFieldChange}
                    value={store.updateForm.body}
                    name="body"
                />
                <button type="submit" className="border border-black">
                    Update note
                </button>
            </form>
        </div>
    );
}

export default UpdateForm;
