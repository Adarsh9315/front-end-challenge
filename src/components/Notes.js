import React, { useState, useEffect } from 'react';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');

	useEffect(() => {
		const savedNotes = localStorage.getItem('notes');
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
	}, []);

	const saveNotes = (updatedNotes) => {
		setNotes(updatedNotes);
		localStorage.setItem('notes', JSON.stringify(updatedNotes));
	};

	const addNote = () => {
		if (newNote.trim() === '') return;
		
		const note = {
			id: Date.now(),
			text: newNote,
			date: new Date().toLocaleDateString()
		};
		
		saveNotes([note, ...notes]);
		setNewNote('');
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		saveNotes(updatedNotes);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>Notes</h1>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-8'>
					<div className='input-group mb-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Write a note...'
							value={newNote}
							onChange={(e) => setNewNote(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && addNote()}
						/>
						<div className='input-group-append'>
							<button className='btn btn-primary' onClick={addNote}>
								Add Note
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				{notes.length === 0 ? (
					<p className='no-notes'>No notes yet. Add your first note above!</p>
				) : (
					notes.map((note) => (
						<div key={note.id} className='col-md-4 mb-3'>
							<div className='note-card'>
								<p>{note.text}</p>
								<div className='note-footer'>
									<small>{note.date}</small>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => deleteNote(note.id)}
									>
										Delete
									</button>
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
