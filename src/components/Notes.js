import React, { useState, useEffect } from 'react';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (notesArray) => {
		localStorage.setItem('notes', JSON.stringify(notesArray));
	};

	const handleAddNote = (e) => {
		e.preventDefault();
		if (!noteTitle.trim() && !noteContent.trim()) return;

		if (editingId !== null) {
			// Update existing note
			const updatedNotes = notes.map(note =>
				note.id === editingId
					? { ...note, title: noteTitle, content: noteContent, updatedAt: new Date().toISOString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			// Add new note
			const newNote = {
				id: Date.now(),
				title: noteTitle,
				content: noteContent,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			const updatedNotes = [newNote, ...notes];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setNoteTitle('');
		setNoteContent('');
	};

	const handleEditNote = (note) => {
		setNoteTitle(note.title);
		setNoteContent(note.content);
		setEditingId(note.id);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		if (editingId === id) {
			setEditingId(null);
			setNoteTitle('');
			setNoteContent('');
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setNoteTitle('');
		setNoteContent('');
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<div className="notes-container">
			<div className="notes-header">
				<h1>My Notes</h1>
			</div>

			<div className="note-form-container">
				<form onSubmit={handleAddNote} className="note-form">
					<input
						type="text"
						placeholder="Note Title"
						value={noteTitle}
						onChange={(e) => setNoteTitle(e.target.value)}
						className="note-input note-title-input"
					/>
					<textarea
						placeholder="Note Content"
						value={noteContent}
						onChange={(e) => setNoteContent(e.target.value)}
						className="note-input note-content-input"
						rows="5"
					/>
					<div className="note-form-buttons">
						<button type="submit" className="btn btn-primary">
							{editingId !== null ? 'Update Note' : 'Add Note'}
						</button>
						{editingId !== null && (
							<button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="notes-list">
				{notes.length === 0 ? (
					<div className="no-notes">
						<p>No notes yet. Create your first note above!</p>
					</div>
				) : (
					notes.map(note => (
						<div key={note.id} className="note-card">
							<div className="note-card-header">
								<h3>{note.title || 'Untitled Note'}</h3>
								<div className="note-actions">
									<button
										onClick={() => handleEditNote(note)}
										className="btn-icon btn-edit"
										title="Edit"
									>
										✏️
									</button>
									<button
										onClick={() => handleDeleteNote(note.id)}
										className="btn-icon btn-delete"
										title="Delete"
									>
										🗑️
									</button>
								</div>
							</div>
							<div className="note-card-content">
								<p>{note.content}</p>
							</div>
							<div className="note-card-footer">
								<small>Last updated: {formatDate(note.updatedAt)}</small>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Notes;
