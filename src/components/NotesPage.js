import React, { useState, useEffect } from 'react';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (notesArray) => {
		localStorage.setItem('notes', JSON.stringify(notesArray));
	};

	const handleAddNote = () => {
		if (!currentNote.title.trim() && !currentNote.content.trim()) {
			return;
		}

		if (editingId !== null) {
			// Update existing note
			const updatedNotes = notes.map(note =>
				note.id === editingId
					? { ...note, title: currentNote.title, content: currentNote.content, updatedAt: new Date().toISOString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			// Add new note
			const newNote = {
				id: Date.now(),
				title: currentNote.title,
				content: currentNote.content,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			const updatedNotes = [newNote, ...notes];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setCurrentNote({ title: '', content: '' });
	};

	const handleEditNote = (note) => {
		setCurrentNote({ title: note.title, content: note.content });
		setEditingId(note.id);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		if (editingId === id) {
			setCurrentNote({ title: '', content: '' });
			setEditingId(null);
		}
	};

	const handleCancelEdit = () => {
		setCurrentNote({ title: '', content: '' });
		setEditingId(null);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<div className='notes-page'>
			<div className='note-editor'>
				<h2>{editingId !== null ? 'Edit Note' : 'Create New Note'}</h2>
				<input
					type='text'
					className='note-title-input'
					placeholder='Note Title'
					value={currentNote.title}
					onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
				/>
				<textarea
					className='note-content-input'
					placeholder='Write your note here...'
					value={currentNote.content}
					onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
					rows='6'
				/>
				<div className='note-editor-buttons'>
					<button className='btn btn-primary' onClick={handleAddNote}>
						{editingId !== null ? 'Update Note' : 'Add Note'}
					</button>
					{editingId !== null && (
						<button className='btn btn-secondary' onClick={handleCancelEdit}>
							Cancel
						</button>
					)}
				</div>
			</div>

			<div className='notes-list'>
				<h2>My Notes ({notes.length})</h2>
				{notes.length === 0 ? (
					<div className='no-notes'>
						<p>No notes yet. Create your first note above!</p>
					</div>
				) : (
					<div className='notes-grid'>
						{notes.map(note => (
							<div key={note.id} className='note-card'>
								<div className='note-card-header'>
									<h3>{note.title || 'Untitled Note'}</h3>
									<div className='note-card-actions'>
										<button
											className='btn-icon edit-btn'
											onClick={() => handleEditNote(note)}
											title='Edit'
										>
											✏️
										</button>
										<button
											className='btn-icon delete-btn'
											onClick={() => handleDeleteNote(note.id)}
											title='Delete'
										>
											🗑️
										</button>
									</div>
								</div>
								<div className='note-card-content'>
									<p>{note.content}</p>
								</div>
								<div className='note-card-footer'>
									<small>Updated: {formatDate(note.updatedAt)}</small>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default NotesPage;
