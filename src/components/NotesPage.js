import React, { useState, useEffect } from 'react';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveNotesToLocalStorage = (updatedNotes) => {
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
	};

	const addNote = (e) => {
		e.preventDefault();
		if (!title.trim() || !body.trim()) return;

		const newNote = {
			id: Date.now(),
			title: title.trim(),
			body: body.trim(),
			createdAt: new Date().toLocaleString(),
		};

		const updatedNotes = [newNote, ...notes];
		setNotes(updatedNotes);
		saveNotesToLocalStorage(updatedNotes);
		setTitle('');
		setBody('');
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		saveNotesToLocalStorage(updatedNotes);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row mb-4'>
				<div className='col-12 col-md-8 col-lg-6'>
					<form onSubmit={addNote} className='note-form'>
						<div className='form-group mb-3'>
							<input
								type='text'
								className='form-control note-input'
								placeholder='Note title...'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className='form-group mb-3'>
							<textarea
								className='form-control note-input'
								placeholder='Write your note...'
								rows='4'
								value={body}
								onChange={(e) => setBody(e.target.value)}
							/>
						</div>
						<button type='submit' className='btn btn-light'>
							Add Note
						</button>
					</form>
				</div>
			</div>

			<div className='row'>
				{notes.length === 0 && (
					<div className='col'>
						<p className='text-muted'>No notes yet. Add your first note above.</p>
					</div>
				)}
				{notes.map((note) => (
					<div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={note.id}>
						<div className='note-card'>
							<div className='note-card-header'>
								<h5 className='note-card-title'>{note.title}</h5>
								<button
									className='btn btn-sm note-delete-btn'
									onClick={() => deleteNote(note.id)}
								>
									✕
								</button>
							</div>
							<p className='note-card-body'>{note.body}</p>
							<small className='note-card-date'>{note.createdAt}</small>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotesPage;
