import React, { useState, useEffect } from 'react';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim() || !body.trim()) return;

		if (editingId) {
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
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setTitle('');
		setBody('');
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

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-md-4 mb-4'>
					<form onSubmit={handleSubmit} className='notes-form'>
						<h5>{editingId ? 'Edit Note' : 'New Note'}</h5>
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
								rows='6'
								value={body}
								onChange={(e) => setBody(e.target.value)}
							/>
						</div>
						<div className='d-flex'>
							<button type='submit' className='btn btn-light mr-2'>
								{editingId ? 'Update' : 'Add Note'}
							</button>
							{editingId && (
								<button
									type='button'
									className='btn btn-outline-light'
									onClick={handleCancelEdit}
								>
									Cancel
								</button>
							)}
						</div>
					</form>
				</div>

				<div className='col-12 col-md-8'>
					{notes.length === 0 ? (
						<p className='text-muted'>No notes yet. Create your first note!</p>
					) : (
						<div className='row'>
							{notes.map((note) => (
								<div className='col-12 col-sm-6 col-lg-4 mb-3' key={note.id}>
									<div className='note-card'>
										<h5 className='note-card-title'>{note.title}</h5>
										<p className='note-card-body'>{note.body}</p>
										<small className='text-muted d-block mb-2'>
											{note.updatedAt
												? `Updated: ${note.updatedAt}`
												: `Created: ${note.createdAt}`}
										</small>
										<div className='d-flex'>
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
