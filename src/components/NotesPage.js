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
		if (!title.trim() || !body.trim()) return;

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
		if (!editTitle.trim() || !editBody.trim()) return;

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
					className='form-control mb-2 notes-input'
					type='text'
					placeholder='Note title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className='form-control mb-2 notes-input'
					rows='4'
					placeholder='Write your note...'
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<button
					className='btn btn-light'
					onClick={addNote}
					disabled={!title.trim() || !body.trim()}
				>
					Add Note
				</button>
			</div>

			{notes.length === 0 && (
				<p className='text-muted mt-4'>No notes yet. Add your first note above.</p>
			)}

			<div className='row'>
				{notes.map((note) => (
					<div className='col-md-4 col-sm-6 mb-4' key={note.id}>
						<div className='note-card'>
							{editingId === note.id ? (
								<>
									<input
										className='form-control mb-2 notes-input'
										type='text'
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
									/>
									<textarea
										className='form-control mb-2 notes-input'
										rows='3'
										value={editBody}
										onChange={(e) => setEditBody(e.target.value)}
									/>
									<div className='d-flex'>
										<button
											className='btn btn-sm btn-light mr-2'
											onClick={() => saveEdit(note.id)}
											disabled={!editTitle.trim() || !editBody.trim()}
										>
											Save
										</button>
										<button
											className='btn btn-sm btn-outline-light'
											onClick={cancelEditing}
										>
											Cancel
										</button>
									</div>
								</>
							) : (
								<>
									<h5 className='note-card-title'>{note.title}</h5>
									<p className='note-card-body'>{note.body}</p>
									<small className='text-muted d-block mb-2'>
										{note.createdAt}
									</small>
									<div className='d-flex'>
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
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotesPage;
