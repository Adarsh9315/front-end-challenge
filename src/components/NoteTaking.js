import React, { useState, useEffect } from 'react';
import './NoteTaking.css';

const NoteTaking = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedNote, setSelectedNote] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load notes from localStorage on mount
	useEffect(() => {
		// Simulate loading delay
		setTimeout(() => {
			const savedNotes = JSON.parse(localStorage.getItem('notes'));
			if (savedNotes) {
				setNotes(savedNotes);
			}
			setIsLoading(false);
		}, 800);
	}, []);

	// Save notes to localStorage whenever they change
	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = (e) => {
		e.preventDefault();
		if (title.trim() === '' && content.trim() === '') return;

		const newNote = {
			id: Date.now(),
			title: title.trim() || 'Untitled Note',
			content: content,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		const newNotes = [newNote, ...notes];
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
		setTitle('');
		setContent('');
		setSelectedNote(null);
	};

	const updateNote = (e) => {
		e.preventDefault();
		if (!selectedNote) return;
		if (title.trim() === '' && content.trim() === '') return;

		const updatedNotes = notes.map(note =>
			note.id === selectedNote.id
				? {
					...note,
					title: title.trim() || 'Untitled Note',
					content: content,
					updatedAt: new Date().toISOString()
				}
				: note
		);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		setTitle('');
		setContent('');
		setSelectedNote(null);
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		if (selectedNote && selectedNote.id === id) {
			setSelectedNote(null);
			setTitle('');
			setContent('');
		}
	};

	const selectNote = (note) => {
		setSelectedNote(note);
		setTitle(note.title);
		setContent(note.content);
	};

	const cancelEdit = () => {
		setSelectedNote(null);
		setTitle('');
		setContent('');
	};

	const getFilteredNotes = () => {
		if (searchQuery.trim() === '') return notes;
		
		const query = searchQuery.toLowerCase();
		return notes.filter(note =>
			note.title.toLowerCase().includes(query) ||
			note.content.toLowerCase().includes(query)
		);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInMs = now - date;
		const diffInMins = Math.floor(diffInMs / 60000);
		const diffInHours = Math.floor(diffInMs / 3600000);
		const diffInDays = Math.floor(diffInMs / 86400000);

		if (diffInMins < 1) return 'Just now';
		if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
		if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
		if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
		
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	};

	const filteredNotes = getFilteredNotes();

	if (isLoading) {
		return (
			<div className="notes-app-container">
				<div className="notes-app">
					<div className="loader-container">
						<div className="loader"></div>
						<p className="loader-text">Loading your notes...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="notes-app-container">
			<div className="notes-app">
				<div className="notes-sidebar">
					<div className="notes-sidebar-header">
						<h1 className="notes-title">📝 Notes</h1>
						<div className="notes-search">
							<input
								type="text"
								className="search-input"
								placeholder="Search notes..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="notes-count">
							{filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
						</div>
					</div>

					<div className="notes-list">
						{filteredNotes.length === 0 ? (
							<div className="empty-state">
								{searchQuery ? 'No notes found' : 'No notes yet. Create one!'}
							</div>
						) : (
							filteredNotes.map(note => (
								<div
									key={note.id}
									className={`note-item ${selectedNote && selectedNote.id === note.id ? 'selected' : ''}`}
									onClick={() => selectNote(note)}
								>
									<div className="note-item-header">
										<h3 className="note-item-title">{note.title}</h3>
										<button
											className="note-delete-btn"
											onClick={(e) => {
												e.stopPropagation();
												deleteNote(note.id);
											}}
											title="Delete note"
										>
											🗑️
										</button>
									</div>
									<p className="note-item-preview">
										{note.content.substring(0, 100)}
										{note.content.length > 100 ? '...' : ''}
									</p>
									<div className="note-item-date">
										{formatDate(note.updatedAt)}
									</div>
								</div>
							))
						)}
					</div>
				</div>

				<div className="notes-editor">
					<form onSubmit={selectedNote ? updateNote : addNote} className="note-form">
						<div className="note-form-header">
							<h2 className="editor-title">
								{selectedNote ? 'Edit Note' : 'New Note'}
							</h2>
							{selectedNote && (
								<button
									type="button"
									className="cancel-btn"
									onClick={cancelEdit}
								>
									Cancel
								</button>
							)}
						</div>

						<input
							type="text"
							className="note-title-input"
							placeholder="Note title..."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<textarea
							className="note-content-input"
							placeholder="Start writing your note..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={15}
						/>

						<div className="note-form-footer">
							<button
								type="submit"
								className="save-note-btn"
								disabled={title.trim() === '' && content.trim() === ''}
							>
								{selectedNote ? '💾 Update Note' : '➕ Add Note'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NoteTaking;
