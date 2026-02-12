import React, { useState, useEffect } from 'react';
import '../NoteTaking.css';

const NoteTaking = () => {
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
	const [editingId, setEditingId] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	// Load notes from localStorage on component mount
	useEffect(() => {
		const savedNotes = localStorage.getItem('notes');
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
	}, []);

	// Save notes to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const handleAddNote = () => {
		if (currentNote.title.trim() === '' && currentNote.content.trim() === '') {
			return;
		}

		if (editingId !== null) {
			// Update existing note
			setNotes(notes.map(note => 
				note.id === editingId 
					? { ...note, title: currentNote.title, content: currentNote.content, updatedAt: new Date().toISOString() }
					: note
			));
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
			setNotes([newNote, ...notes]);
		}

		setCurrentNote({ title: '', content: '' });
	};

	const handleEditNote = (note) => {
		setCurrentNote({ title: note.title, content: note.content });
		setEditingId(note.id);
	};

	const handleDeleteNote = (id) => {
		setNotes(notes.filter(note => note.id !== id));
	};

	const handleCancelEdit = () => {
		setCurrentNote({ title: '', content: '' });
		setEditingId(null);
	};

	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		note.content.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<div className="note-taking-container">
			<div className="note-header">
				<h1>📝 My Notes</h1>
				<p className="note-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
			</div>

			<div className="note-editor">
				<input
					type="text"
					placeholder="Note Title"
					value={currentNote.title}
					onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
					className="note-title-input"
				/>
				<textarea
					placeholder="Write your note here..."
					value={currentNote.content}
					onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
					className="note-content-input"
					rows="6"
				/>
				<div className="note-actions">
					<button onClick={handleAddNote} className="btn-save">
						{editingId !== null ? '💾 Update Note' : '➕ Add Note'}
					</button>
					{editingId !== null && (
						<button onClick={handleCancelEdit} className="btn-cancel">
							❌ Cancel
						</button>
					)}
				</div>
			</div>

			<div className="search-container">
				<input
					type="text"
					placeholder="🔍 Search notes..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
				/>
			</div>

			<div className="notes-list">
				{filteredNotes.length === 0 ? (
					<div className="empty-state">
						{searchTerm ? '🔍 No notes found matching your search.' : '📝 No notes yet. Create your first note above!'}
					</div>
				) : (
					filteredNotes.map(note => (
						<div key={note.id} className="note-card">
							<div className="note-card-header">
								<h3 className="note-card-title">{note.title || 'Untitled Note'}</h3>
								<div className="note-card-actions">
									<button onClick={() => handleEditNote(note)} className="btn-edit">
										✏️ Edit
									</button>
									<button onClick={() => handleDeleteNote(note.id)} className="btn-delete">
										🗑️ Delete
									</button>
								</div>
							</div>
							<p className="note-card-content">{note.content}</p>
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

export default NoteTaking;
