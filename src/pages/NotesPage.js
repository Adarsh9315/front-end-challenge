import React, { useState, useEffect } from 'react';
import '../App.css';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
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

	const handleAddNote = () => {
		if (currentNote.title.trim() === '' || currentNote.content.trim() === '') {
			alert('Please enter both title and content');
			return;
		}

		if (editingId !== null) {
			const updatedNotes = notes.map((note) =>
				note.id === editingId
					? { ...note, title: currentNote.title, content: currentNote.content, updatedAt: new Date().toISOString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			const newNote = {
				id: Date.now(),
				title: currentNote.title,
				content: currentNote.content,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			const updatedNotes = [...notes, newNote];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setCurrentNote({ title: '', content: '' });
	};

	const handleEditNote = (note) => {
		setCurrentNote({ title: note.title, content: note.content });
		setEditingId(note.id);
	};

	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const handleCancelEdit = () => {
		setCurrentNote({ title: '', content: '' });
		setEditingId(null);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<div className='container-fluid notes-app'>
			<div className='row mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<div className='note-editor'>
						<input
							type='text'
							className='form-control mb-3'
							placeholder='Note Title'
							value={currentNote.title}
							onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
						/>
						<textarea
							className='form-control mb-3'
							placeholder='Note Content'
							rows='10'
							value={currentNote.content}
							onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
						></textarea>
						<div className='button-group'>
							<button className='btn btn-primary mr-2' onClick={handleAddNote}>
								{editingId !== null ? 'Update Note' : 'Add Note'}
							</button>
							{editingId !== null && (
								<button className='btn btn-secondary' onClick={handleCancelEdit}>
									Cancel
								</button>
							)}
						</div>
					</div>
				</div>

				<div className='col-md-6'>
					<div className='notes-list'>
						{notes.length === 0 ? (
							<p className='text-muted'>No notes yet. Create your first note!</p>
						) : (
							notes.map((note) => (
								<div key={note.id} className='note-item mb-3 p-3'>
									<h3>{note.title}</h3>
									<p className='note-content'>{note.content}</p>
									<small className='text-muted'>
										Created: {formatDate(note.createdAt)}
										{note.updatedAt !== note.createdAt && (
											<> | Updated: {formatDate(note.updatedAt)}</>
										)}
									</small>
									<div className='note-actions mt-2'>
										<button
											className='btn btn-sm btn-info mr-2'
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
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotesPage;
