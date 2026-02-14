import React, { useState, useEffect } from 'react';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('movie-app-notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (updatedNotes) => {
		localStorage.setItem('movie-app-notes', JSON.stringify(updatedNotes));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim() || !body.trim()) return;

		if (editingId !== null) {
			const updatedNotes = notes.map((note) =>
				note.id === editingId
					? { ...note, title: title.trim(), body: body.trim(), updatedAt: new Date().toLocaleString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			const newNote = {
				id: Date.now(),
				title: title.trim(),
				body: body.trim(),
				createdAt: new Date().toLocaleString(),
				updatedAt: null,
			};
			const updatedNotes = [newNote, ...notes];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setTitle('');
		setBody('');
	};

	const handleEdit = (note) => {
		setEditingId(note.id);
		setTitle(note.title);
		setBody(note.body);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDelete = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		if (editingId === id) {
			setEditingId(null);
			setTitle('');
			setBody('');
		}
	};

	const handleCancel = () => {
		setEditingId(null);
		setTitle('');
		setBody('');
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-md-6 col-lg-4 mb-4'>
					<form onSubmit={handleSubmit} className='notes-form'>
						<h5 className='mb-3'>{editingId !== null ? 'Edit Note' : 'New Note'}</h5>
						<div className='form-group mb-3'>
							<input
								type='text'
								className='form-control notes-input'
								placeholder='Note title...'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className='form-group mb-3'>
							<textarea
								className='form-control notes-input'
								placeholder='Write your note...'
								rows='5'
								value={body}
								onChange={(e) => setBody(e.target.value)}
							/>
						</div>
						<div className='d-flex'>
							<button type='submit' className='btn btn-light mr-2'>
								{editingId !== null ? 'Update' : 'Add Note'}
							</button>
							{editingId !== null && (
								<button type='button' className='btn btn-outline-light' onClick={handleCancel}>
									Cancel
								</button>
							)}
						</div>
					</form>
				</div>

				<div className='col-12 col-md-6 col-lg-8'>
					{notes.length === 0 ? (
						<div className='notes-empty'>
							<p>No notes yet. Create your first note!</p>
						</div>
					) : (
						<div className='row'>
							{notes.map((note) => (
								<div className='col-12 col-lg-6 mb-3' key={note.id}>
									<div className='notes-card'>
										<h5 className='notes-card-title'>{note.title}</h5>
										<p className='notes-card-body'>{note.body}</p>
										<div className='notes-card-meta'>
											{note.updatedAt
												? `Updated: ${note.updatedAt}`
												: `Created: ${note.createdAt}`}
										</div>
										<div className='d-flex mt-2'>
											<button
												className='btn btn-sm btn-outline-light mr-2'
												onClick={() => handleEdit(note)}
											>
												Edit
											</button>
											<button
												className='btn btn-sm btn-outline-danger'
												onClick={() => handleDelete(note.id)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotesPage;
