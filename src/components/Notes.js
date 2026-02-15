import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [openSnackbar] = useSnackbar();

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const handleAddNote = () => {
		if (!title.trim() || !content.trim()) {
			openSnackbar('Please fill in both title and content');
			return;
		}

		const newNote = {
			id: Date.now(),
			title: title.trim(),
			content: content.trim(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
		setTitle('');
		setContent('');
		openSnackbar('Note added successfully');
	};

	const handleEditNote = (note) => {
		setEditingId(note.id);
		setTitle(note.title);
		setContent(note.content);
	};

	const handleUpdateNote = () => {
		if (!title.trim() || !content.trim()) {
			openSnackbar('Please fill in both title and content');
			return;
		}

		const updatedNotes = notes.map(note =>
			note.id === editingId
				? {
						...note,
						title: title.trim(),
						content: content.trim(),
						updatedAt: new Date().toISOString()
				  }
				: note
		);

		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		setTitle('');
		setContent('');
		setEditingId(null);
		openSnackbar('Note updated successfully');
	};

	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		openSnackbar('Note deleted successfully');
	};

	const handleCancelEdit = () => {
		setTitle('');
		setContent('');
		setEditingId(null);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<div className='container-fluid notes-app' style={{ padding: '20px' }}>
			<div className='row mb-4'>
				<div className='col-12'>
					<h1 className='text-white mb-4'>Notes</h1>
					<div className='card' style={{ backgroundColor: '#1f1f1f', border: '1px solid #333', padding: '20px' }}>
						<div className='form-group mb-3'>
							<label className='text-white mb-2'>Title</label>
							<input
								type='text'
								className='form-control'
								style={{ backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff' }}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder='Enter note title...'
							/>
						</div>
						<div className='form-group mb-3'>
							<label className='text-white mb-2'>Content</label>
							<textarea
								className='form-control'
								style={{ backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', minHeight: '150px' }}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder='Enter note content...'
							/>
						</div>
						<div className='d-flex'>
							{editingId ? (
								<>
									<button
										className='btn btn-primary mr-2'
										onClick={handleUpdateNote}
									>
										Update Note
									</button>
									<button
										className='btn btn-secondary'
										onClick={handleCancelEdit}
									>
										Cancel
									</button>
								</>
							) : (
								<button
									className='btn btn-success'
									onClick={handleAddNote}
								>
									Add Note
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='row'>
				{notes.length === 0 ? (
					<div className='col-12'>
						<p className='text-white text-center'>No notes yet. Create your first note above!</p>
					</div>
				) : (
					notes.map((note) => (
						<div key={note.id} className='col-md-6 col-lg-4 mb-4'>
							<div className='card' style={{ backgroundColor: '#1f1f1f', border: '1px solid #333', height: '100%' }}>
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-white'>{note.title}</h5>
									<p className='card-text text-white-50 flex-grow-1' style={{ whiteSpace: 'pre-wrap' }}>
										{note.content}
									</p>
									<div className='mt-auto'>
										<small className='text-muted d-block mb-2'>
											Created: {formatDate(note.createdAt)}
										</small>
										{note.updatedAt !== note.createdAt && (
											<small className='text-muted d-block mb-2'>
												Updated: {formatDate(note.updatedAt)}
											</small>
										)}
										<div className='d-flex'>
											<button
												className='btn btn-sm btn-warning mr-2'
												onClick={() => handleEditNote(note)}
											>
												Edit
											</button>
											<button
												className='btn btn-sm btn-danger'
												onClick={() => handleDeleteNote(note.id)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Notes;
