import React, { useState, useEffect } from 'react';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [editBody, setEditBody] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = () => {
		if (!title.trim() && !body.trim()) return;

		const newNote = {
			id: Date.now(),
			title: title.trim(),
			body: body.trim(),
			createdAt: new Date().toLocaleString(),
		};

		const updatedNotes = [newNote, ...notes];
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		setTitle('');
		setBody('');
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const startEditing = (note) => {
		setEditingId(note.id);
		setEditTitle(note.title);
		setEditBody(note.body);
	};

	const cancelEditing = () => {
		setEditingId(null);
		setEditTitle('');
		setEditBody('');
	};

	const saveEdit = (id) => {
		const updatedNotes = notes.map((note) =>
			note.id === id
				? { ...note, title: editTitle.trim(), body: editBody.trim() }
				: note
		);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		setEditingId(null);
		setEditTitle('');
		setEditBody('');
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			addNote();
		}
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='notes-form'>
				<input
					className='form-control notes-input'
					type='text'
					placeholder='Note title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<textarea
					className='form-control notes-textarea'
					placeholder='Write your note here...'
					rows='4'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button className='btn-add-note' onClick={addNote}>
					Add Note
				</button>
			</div>

			{notes.length === 0 && (
				<div className='notes-empty'>
					<p>No notes yet. Create your first note above!</p>
				</div>
			)}

			<div className='notes-grid'>
				{notes.map((note) => (
					<div className='note-card' key={note.id}>
						{editingId === note.id ? (
							<>
								<input
									className='form-control notes-input'
									type='text'
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<textarea
									className='form-control notes-textarea'
									rows='4'
									value={editBody}
									onChange={(e) => setEditBody(e.target.value)}
								/>
								<div className='note-actions'>
									<button className='btn-save-note' onClick={() => saveEdit(note.id)}>
										Save
									</button>
									<button className='btn-cancel-note' onClick={cancelEditing}>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<h3 className='note-title'>{note.title || 'Untitled'}</h3>
								<p className='note-body'>{note.body}</p>
								<span className='note-date'>{note.createdAt}</span>
								<div className='note-actions'>
									<button className='btn-edit-note' onClick={() => startEditing(note)}>
										Edit
									</button>
									<button className='btn-delete-note' onClick={() => deleteNote(note.id)}>
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default NotesPage;
