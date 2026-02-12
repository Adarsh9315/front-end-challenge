import React, { useState, useEffect } from 'react';

const NoteTaking = () => {
	const [notes, setNotes] = useState([]);
	const [noteText, setNoteText] = useState('');
	const [noteTitle, setNoteTitle] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const savedNotes = localStorage.getItem('notes');
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const addNote = () => {
		if (noteTitle.trim() === '' && noteText.trim() === '') return;

		if (editingId !== null) {
			setNotes(notes.map(note => 
				note.id === editingId 
					? { ...note, title: noteTitle, text: noteText, updatedAt: new Date().toISOString() }
					: note
			));
			setEditingId(null);
		} else {
			const newNote = {
				id: Date.now(),
				title: noteTitle,
				text: noteText,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			setNotes([newNote, ...notes]);
		}

		setNoteTitle('');
		setNoteText('');
	};

	const deleteNote = (id) => {
		setNotes(notes.filter(note => note.id !== id));
	};

	const editNote = (note) => {
		setNoteTitle(note.title);
		setNoteText(note.text);
		setEditingId(note.id);
	};

	const cancelEdit = () => {
		setNoteTitle('');
		setNoteText('');
		setEditingId(null);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const filteredNotes = notes.filter(note => 
		note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		note.text.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="notes-container">
			<div className="notes-header">
				<h1>My Notes</h1>
				<p className="notes-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
			</div>

			<div className="note-editor">
				<input
					type="text"
					className="note-title-input"
					placeholder="Note title..."
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
				/>
				<textarea
					className="note-text-input"
					placeholder="Write your note here..."
					value={noteText}
					onChange={(e) => setNoteText(e.target.value)}
					rows="5"
				/>
				<div className="note-editor-actions">
					<button 
						className="btn btn-primary add-note-btn" 
						onClick={addNote}
					>
						{editingId !== null ? 'Update Note' : 'Add Note'}
					</button>
					{editingId !== null && (
						<button 
							className="btn btn-secondary cancel-edit-btn" 
							onClick={cancelEdit}
						>
							Cancel
						</button>
					)}
				</div>
			</div>

			{notes.length > 0 && (
				<div className="search-container">
					<input
						type="text"
						className="search-input"
						placeholder="Search notes..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<div className="notes-list">
				{filteredNotes.length === 0 && notes.length > 0 && (
					<p className="no-notes">No notes found matching "{searchTerm}"</p>
				)}
				{filteredNotes.length === 0 && notes.length === 0 && (
					<p className="no-notes">No notes yet. Create your first note above!</p>
				)}
				{filteredNotes.map(note => (
					<div key={note.id} className="note-card">
						<div className="note-card-header">
							<h3 className="note-card-title">{note.title || 'Untitled Note'}</h3>
							<div className="note-card-actions">
								<button 
									className="btn-icon edit-btn" 
									onClick={() => editNote(note)}
									title="Edit note"
								>
									✏️
								</button>
								<button 
									className="btn-icon delete-btn" 
									onClick={() => deleteNote(note.id)}
									title="Delete note"
								>
									🗑️
								</button>
							</div>
						</div>
						<p className="note-card-text">{note.text}</p>
						<div className="note-card-footer">
							<span className="note-date">
								{note.createdAt !== note.updatedAt ? 'Updated' : 'Created'}: {formatDate(note.updatedAt)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NoteTaking;
