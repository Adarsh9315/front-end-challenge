import React, { useState, useEffect } from 'react';
import AddNoteForm from './AddNoteForm';
import NoteItem from './NoteItem';

const Notes = () => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = (title, content) => {
		const newNote = {
			id: Date.now(),
			title,
			content,
			createdAt: new Date().toISOString()
		};
		const updatedNotes = [...notes, newNote];
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const editNote = (id, title, content) => {
		const updatedNotes = notes.map(note =>
			note.id === id ? { ...note, title, content } : note
		);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	return (
		<div className='container-fluid notes-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<div className='col'>
					<h1>My Notes</h1>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-6 offset-md-3'>
					<AddNoteForm onAddNote={addNote} />
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					{notes.length === 0 ? (
						<p className='text-center'>No notes yet. Add your first note above!</p>
					) : (
						<div className='notes-grid'>
							{notes.map(note => (
								<NoteItem
									key={note.id}
									note={note}
									onDelete={deleteNote}
									onEdit={editNote}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Notes;
