import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import './Notes.css';

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
		if (!title.trim() && !content.trim()) {
			openSnackbar('Please enter a title or content');
			return;
		}

		const newNote = {
			id: Date.now(),
			title: title.trim() || 'Untitled',
			content: content.trim(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		const newNotesList = [...notes, newNote];
		setNotes(newNotesList);
		saveToLocalStorage(newNotesList);
		setTitle('');
		setContent('');
		openSnackbar('Note added successfully');
	};

	const handleUpdateNote = () => {
		if (!title.trim() && !content.trim()) {
			openSnackbar('Please enter a title or content');
			return;
		}

		const updatedNotes = notes.map(note => {
			if (note.id === editingId) {
				return {
					...note,
					title: title.trim() || 'Untitled',
					content: content.trim(),
					updatedAt: new Date().toISOString()
				};
			}
			return note;
		});

		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
		setTitle('');
		setContent('');
		setEditingId(null);
		openSnackbar('Note updated successfully');
	};

	const handleEditNote = (note) => {
		setTitle(note.title);
		setContent(note.content);
		setEditingId(note.id);
	};

	const handleDeleteNote = (id) => {
		const newNotesList = notes.filter(note => note.id !== id);
		setNotes(newNotesList);
		saveToLocalStorage(newNotesList);
		openSnackbar('Note deleted successfully');
	};

	const handleCancelEdit = () => {
		setTitle('');
		setContent('');
		setEditingId(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editingId) {
			handleUpdateNote();
		} else {
			handleAddNote();
		}
	};

	return (
		<div className='container-fluid notes-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row mb-4'>
				<div className='col-12'>
					<form onSubmit={handleSubmit} className='note-form'>
						<div className='form-group'>
							<input
								type='text'
								className='form-control note-input'
								placeholder='Note title...'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<textarea
								className='form-control note-textarea'
								placeholder='Note content...'
								rows='5'
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							{editingId ? (
								<>
									<button type='submit' className='btn btn-primary mr-2'>
										Update Note
									</button>
									<button
										type='button'
										className='btn btn-secondary'
										onClick={handleCancelEdit}
									>
										Cancel
									</button>
								</>
							) : (
								<button type='submit' className='btn btn-primary'>
									Add Note
								</button>
							)}
						</div>
					</form>
				</div>
			</div>

			<div className='row'>
				{notes.length === 0 ? (
					<div className='col-12'>
						<p className='text-center empty-message'>No notes yet. Create your first note above!</p>
					</div>
				) : (
					notes.map((note) => (
						<div key={note.id} className='col-md-4 mb-4'>
							<div className='note-card'>
								<div className='note-card-header'>
									<h5 className='note-title'>{note.title}</h5>
									<div className='note-actions'>
										<button
											className='btn btn-sm btn-outline-primary mr-2'
											onClick={() => handleEditNote(note)}
										>
											Edit
										</button>
										<button
											className='btn btn-sm btn-outline-danger'
											onClick={() => handleDeleteNote(note.id)}
										>
											Delete
										</button>
									</div>
								</div>
								<div className='note-content'>
									{note.content ? (
										<p>{note.content}</p>
									) : (
										<p className='text-muted'>No content</p>
									)}
								</div>
								<div className='note-footer'>
									<small className='text-muted'>
										Created: {new Date(note.createdAt).toLocaleDateString()}
										{note.updatedAt !== note.createdAt && (
											<span> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
										)}
									</small>
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
