import React, { useState, useEffect } from 'react';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveNotes = (updatedNotes) => {
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
		setNotes(updatedNotes);
	};

	const addNote = () => {
		if (!newNote.trim()) return;
		const updatedNotes = [...notes, { id: Date.now(), text: newNote, createdAt: new Date().toLocaleString() }];
		saveNotes(updatedNotes);
		setNewNote('');
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		saveNotes(updatedNotes);
	};

	const updateNote = (id, text) => {
		const updatedNotes = notes.map(note => 
			note.id === id ? { ...note, text, updatedAt: new Date().toLocaleString() } : note
		);
		saveNotes(updatedNotes);
		setEditingId(null);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col d-flex'>
					<input
						type='text'
						className='form-control'
						placeholder='Write a new note...'
						value={newNote}
						onChange={(e) => setNewNote(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && addNote()}
					/>
					<button className='btn btn-primary ml-2' onClick={addNote}>Add Note</button>
				</div>
			</div>
			<div className='row'>
				{notes.length === 0 ? (
					<div className='col'>
						<p>No notes yet. Add your first note above!</p>
					</div>
				) : (
					notes.map((note) => (
						<div key={note.id} className='col-12 mb-3'>
							<div className='card'>
								<div className='card-body'>
									{editingId === note.id ? (
										<div>
											<textarea
												className='form-control mb-2'
												defaultValue={note.text}
												onBlur={(e) => updateNote(note.id, e.target.value)}
												onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && updateNote(note.id, e.target.value)}
												autoFocus
											/>
										</div>
									) : (
										<div>
											<p className='card-text'>{note.text}</p>
											<small className='text-muted'>Created: {note.createdAt}</small>
											{note.updatedAt && (
												<><br /><small className='text-muted'>Updated: {note.updatedAt}</small></>
											)}
										</div>
									)}
									<div className='mt-2'>
										<button
											className='btn btn-sm btn-secondary mr-2'
											onClick={() => setEditingId(note.id)}
										>
											Edit
										</button>
										<button
											className='btn btn-sm btn-danger'
											onClick={() => deleteNote(note.id)}
										>
											Delete
										</button>
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
