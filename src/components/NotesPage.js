import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NoteList from './NoteList';
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
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	const editNote = (id) => {
		// Future implementation for editing notes
	};

	const totalCount = notes.length;

	return (
		<div className='container-fluid notes-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Notes' />
			</div>
			{totalCount > 0 && (
				<div className='notes-stats mb-4'>
					<p style={{ fontSize: '1.1em', opacity: 0.8 }}>
						{totalCount} {totalCount === 1 ? 'note' : 'notes'}
					</p>
				</div>
			)}
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<AddNote onAdd={addNote} />
					<NoteList
						notes={notes}
						onDelete={deleteNote}
						onEdit={editNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotesPage;
