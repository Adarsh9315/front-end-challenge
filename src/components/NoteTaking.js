import React, { useState, useEffect } from 'react';

const NoteTaking = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('notes', JSON.stringify(items));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        if (editingId) {
            const updatedNotes = notes.map(note =>
                note.id === editingId
                    ? { ...note, title, content, updatedAt: new Date().toISOString() }
                    : note
            );
            setNotes(updatedNotes);
            saveToLocalStorage(updatedNotes);
            setEditingId(null);
        } else {
            const newNote = {
                id: Date.now(),
                title,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const newNotes = [newNote, ...notes];
            setNotes(newNotes);
            saveToLocalStorage(newNotes);
        }

        setTitle('');
        setContent('');
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingId(note.id);
    };

    const handleDelete = (id) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
        saveToLocalStorage(filteredNotes);
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setEditingId(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="note-taking-container">
            <h2 className="notes-heading">
                {editingId ? 'Edit Note' : 'Create a New Note'}
            </h2>
            
            <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control note-input"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control note-textarea"
                        placeholder="Write your note here..."
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="note-form-buttons">
                    <button type="submit" className="btn btn-primary note-btn">
                        {editingId ? 'Update Note' : 'Add Note'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-secondary note-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 className="notes-heading mt-4">Your Notes ({notes.length})</h2>
            
            <div className="notes-list">
                {notes.length === 0 ? (
                    <p className="no-notes">No notes yet. Create your first note above!</p>
                ) : (
                    notes.map(note => (
                        <div key={note.id} className="note-card">
                            <div className="note-card-header">
                                <h3 className="note-title">{note.title}</h3>
                                <div className="note-actions">
                                    <button
                                        className="btn btn-sm btn-outline-light note-action-btn"
                                        onClick={() => handleEdit(note)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger note-action-btn"
                                        onClick={() => handleDelete(note.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="note-content">{note.content}</p>
                            <div className="note-meta">
                                <small>Created: {formatDate(note.createdAt)}</small>
                                {note.createdAt !== note.updatedAt && (
                                    <small> | Updated: {formatDate(note.updatedAt)}</small>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NoteTaking;
