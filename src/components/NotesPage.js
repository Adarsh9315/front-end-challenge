import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NotesList from './NotesList';
import MovieListHeading from './MovieListHeading';

const NotesPage = () => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = (title, content) => {
		const newNote = {
			id: Date.now(),
			title: title,
			content: content,
			createdAt: new Date().toISOString()
		};
		const newNotes = [newNote, ...notes];
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	const updateNote = (id, title, content) => {
		const newNotes = notes.map((note) =>
			note.id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
		);
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	return (
		<div className='container-fluid notes-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Notes' />
			</div>
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<AddNote onAdd={addNote} />
					<NotesList
						notes={notes}
						onUpdate={updateNote}
						onDelete={deleteNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotesPage;
