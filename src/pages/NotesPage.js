import React, { useState, useEffect } from 'react';
import '../NotesPage.css';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState('');
	const [noteTitle, setNoteTitle] = useState('');

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
		if (currentNote.trim() || noteTitle.trim()) {
			const newNote = {
				id: Date.now(),
				title: noteTitle.trim() || 'Untitled Note',
				content: currentNote.trim(),
				timestamp: new Date().toLocaleString()
			};
			setNotes([newNote, ...notes]);
			setCurrentNote('');
			setNoteTitle('');
		}
	};

	const deleteNote = (id) => {
		setNotes(notes.filter(note => note.id !== id));
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			addNote();
		}
	};

	return (
		<div className="notes-page">
			<div className="notes-container">
				<h1 className="notes-heading">My Notes</h1>
				
				<div className="note-input-section">
					<input
						type="text"
						className="note-title-input"
						placeholder="Note Title"
						value={noteTitle}
						onChange={(e) => setNoteTitle(e.target.value)}
					/>
					<textarea
						className="note-textarea"
						placeholder="Write your note here... (Ctrl+Enter to save)"
						value={currentNote}
						onChange={(e) => setCurrentNote(e.target.value)}
						onKeyPress={handleKeyPress}
						rows="6"
					/>
					<button className="add-note-btn" onClick={addNote}>
						Add Note
					</button>
				</div>

				<div className="notes-list">
					<h2 className="notes-list-heading">
						{notes.length === 0 ? 'No notes yet' : `${notes.length} Note${notes.length > 1 ? 's' : ''}`}
					</h2>
					{notes.map(note => (
						<div key={note.id} className="note-card">
							<div className="note-header">
								<h3 className="note-title">{note.title}</h3>
								<button 
									className="delete-note-btn" 
									onClick={() => deleteNote(note.id)}
									title="Delete note"
								>
									×
								</button>
							</div>
							<p className="note-content">{note.content}</p>
							<p className="note-timestamp">{note.timestamp}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NotesPage;
