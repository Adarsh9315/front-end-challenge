import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NoteList from './NoteList';
import MovieListHeading from './MovieListHeading';

const NotePage = () => {
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

	const addNote = (title, body) => {
		const now = Date.now();
		const newNote = {
			id: now,
			title: title,
			body: body,
			createdAt: now,
			updatedAt: now
		};
		const newNotes = [newNote, ...notes];
		setNotes(newNotes);
		saveToLocalStorage(newNotes);
	};

	const editNote = (id, title, body) => {
		const newNotes = notes.map((note) =>
			note.id === id
				? { ...note, title, body, updatedAt: Date.now() }
				: note
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
		<div className='container-fluid todo-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My Notes' />
			</div>
			{notes.length > 0 && (
				<div className='todo-stats mb-4'>
					<p style={{ fontSize: '1.1em', opacity: 0.8 }}>
						{notes.length} {notes.length === 1 ? 'note' : 'notes'}
					</p>
				</div>
			)}
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<AddNote onAdd={addNote} />
					<NoteList
						notes={notes}
						onEdit={editNote}
						onDelete={deleteNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default NotePage;
