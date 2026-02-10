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

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='notes-form mb-4'>
				<input
					className='form-control mb-2'
					type='text'
					placeholder='Note title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className='form-control mb-2'
					rows='4'
					placeholder='Write your note here...'
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<button className='btn btn-light' onClick={addNote}>
					Add Note
				</button>
			</div>

			{notes.length === 0 && (
				<p className='text-muted'>No notes yet. Add one above!</p>
			)}

			<div className='row'>
				{notes.map((note) => (
					<div className='col-md-4 col-sm-6 mb-4' key={note.id}>
						{editingId === note.id ? (
							<div className='note-card p-3'>
								<input
									className='form-control mb-2'
									type='text'
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
								<textarea
									className='form-control mb-2'
									rows='4'
									value={editBody}
									onChange={(e) => setEditBody(e.target.value)}
								/>
								<button
									className='btn btn-sm btn-success mr-2'
									onClick={() => saveEdit(note.id)}
								>
									Save
								</button>
								<button
									className='btn btn-sm btn-secondary'
									onClick={cancelEditing}
								>
									Cancel
								</button>
							</div>
						) : (
							<div className='note-card p-3'>
								<h5 className='note-title'>{note.title || 'Untitled'}</h5>
								<p className='note-body'>{note.body}</p>
								<small className='note-date'>{note.createdAt}</small>
								<div className='mt-2'>
									<button
										className='btn btn-sm btn-outline-light mr-2'
										onClick={() => startEditing(note)}
									>
										Edit
									</button>
									<button
										className='btn btn-sm btn-outline-danger'
										onClick={() => deleteNote(note.id)}
									>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default NotesPage;
