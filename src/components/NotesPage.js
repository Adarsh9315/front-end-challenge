import React, { useState, useEffect } from 'react';
import MovieListHeading from './MovieListHeading';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = () => {
		if (newNote.trim()) {
			const note = {
				id: Date.now(),
				text: newNote,
				date: new Date().toLocaleDateString()
			};
			const newNotes = [...notes, note];
			setNotes(newNotes);
			saveToLocalStorage(newNotes);
			setNewNote('');
		}
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	return (
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Notes' />
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<div className='add-todo-form mb-4'>
						<div className='input-group'>
							<textarea
								className='form-control'
								placeholder='Write a note...'
								value={newNote}
								onChange={(e) => setNewNote(e.target.value)}
								rows='3'
								style={{
									backgroundColor: '#2a2a2a',
									color: '#ffffff',
									border: '1px solid #444',
									resize: 'vertical'
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										addNote();
									}
								}}
							/>
							<div className='input-group-append'>
								<button className='btn btn-primary' onClick={addNote}>
									Add Note
								</button>
							</div>
						</div>
					</div>
					{notes.length === 0 ? (
						<div className='text-center mt-5' style={{ opacity: 0.6 }}>
							<p>No notes yet. Add one to get started!</p>
						</div>
					) : (
						<div className='todo-list'>
							{notes.map((note) => (
								<div key={note.id} className='todo-item note-item'>
									<div className='note-content'>
										<p style={{ margin: 0 }}>{note.text}</p>
										<span className='note-date'>{note.date}</span>
									</div>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => deleteNote(note.id)}
									>
										Delete
									</button>
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
