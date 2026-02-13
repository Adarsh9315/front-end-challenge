import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notes.css';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const handleAddNote = () => {
		if (title.trim() === '' || content.trim() === '') {
			return;
		}

		const newNote = {
			id: Date.now(),
			title: title.trim(),
			content: content.trim(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		const newNotesList = [...notes, newNote];
		setNotes(newNotesList);
		saveToLocalStorage(newNotesList);
		setTitle('');
		setContent('');
	};

	const handleUpdateNote = () => {
		if (title.trim() === '' || content.trim() === '') {
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
		if (editingId === id) {
			setTitle('');
			setContent('');
			setEditingId(null);
		}
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
		<div className='container-fluid notes-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col-md-6'>
					<h1 className='notes-heading'>Notes</h1>
				</div>
				<div className='col-md-6 text-right'>
					<Link to='/' className='btn btn-primary'>
						Back to Movies
					</Link>
				</div>
			</div>

			<div className='row mb-4'>
				<div className='col-md-12'>
					<div className='note-form'>
						<input
							type='text'
							className='form-control mb-3'
							placeholder='Note title...'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<textarea
							className='form-control mb-3'
							rows='5'
							placeholder='Note content...'
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<div className='button-group'>
							{editingId ? (
								<>
									<button
										className='btn btn-success'
										onClick={handleUpdateNote}
									>
										Update Note
									</button>
									<button
										className='btn btn-secondary ml-2'
										onClick={handleCancelEdit}
									>
										Cancel
									</button>
								</>
							) : (
								<button
									className='btn btn-primary'
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
					<div className='col-md-12 text-center'>
						<p className='no-notes'>No notes yet. Create your first note above!</p>
					</div>
				) : (
					notes.map((note) => (
						<div key={note.id} className='col-md-4 mb-4'>
							<div className='note-card'>
								<div className='note-card-header'>
									<h5 className='note-title'>{note.title}</h5>
									<div className='note-actions'>
										<button
											className='btn btn-sm btn-outline-primary'
											onClick={() => handleEditNote(note)}
										>
											Edit
										</button>
										<button
											className='btn btn-sm btn-outline-danger ml-2'
											onClick={() => handleDeleteNote(note.id)}
										>
											Delete
										</button>
									</div>
								</div>
								<p className='note-content'>{note.content}</p>
								<div className='note-footer'>
									<small className='text-muted'>
										Created: {formatDate(note.createdAt)}
									</small>
									{note.updatedAt !== note.createdAt && (
										<small className='text-muted'>
											Updated: {formatDate(note.updatedAt)}
										</small>
									)}
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
