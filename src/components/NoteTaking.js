import React, { useState, useEffect } from 'react';

const NoteTaking = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('user-notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('user-notes', JSON.stringify(items));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;

		if (editingId) {
			const updatedNotes = notes.map((note) =>
				note.id === editingId
					? { ...note, title, content, updatedAt: new Date().toLocaleString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			const newNote = {
				id: Date.now().toString(),
				title,
				content,
				createdAt: new Date().toLocaleString(),
				updatedAt: new Date().toLocaleString(),
			};
			const updatedNotes = [newNote, ...notes];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setTitle('');
		setContent('');
	};

	const handleEdit = (note) => {
		setTitle(note.title);
		setContent(note.content);
		setEditingId(note.id);
	};

	const handleDelete = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const handleCancel = () => {
		setTitle('');
		setContent('');
		setEditingId(null);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-12 col-md-8 col-lg-6'>
					<form onSubmit={handleSubmit} className='note-form'>
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
								className='form-control note-input note-textarea'
								placeholder='Write your note here...'
								rows='5'
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</div>
						<div className='note-form-actions'>
							<button type='submit' className='btn btn-light mr-2'>
								{editingId ? 'Update Note' : 'Add Note'}
							</button>
							{editingId && (
								<button type='button' className='btn btn-outline-light' onClick={handleCancel}>
									Cancel
								</button>
							)}
						</div>
					</form>
				</div>
			</div>

			<div className='row mt-4'>
				<div className='col-12'>
					{notes.length === 0 && (
						<p className='text-muted'>No notes yet. Create your first note above.</p>
					)}
					<div className='notes-grid'>
						{notes.map((note) => (
							<div key={note.id} className='note-card'>
								<h5 className='note-card-title'>{note.title}</h5>
								<p className='note-card-content'>{note.content}</p>
								<div className='note-card-meta'>
									{note.updatedAt !== note.createdAt
										? `Updated: ${note.updatedAt}`
										: `Created: ${note.createdAt}`}
								</div>
								<div className='note-card-actions'>
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
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteTaking;
