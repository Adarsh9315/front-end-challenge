import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onUpdate, onDelete }) => {
	return (
		<div className='notes-list'>
			{notes.length === 0 ? (
				<div className='text-center' style={{ opacity: 0.6, padding: '2rem' }}>
					<p>No notes yet. Create your first note above!</p>
				</div>
			) : (
				notes.map((note) => (
					<NoteItem
						key={note.id}
						note={note}
						onUpdate={onUpdate}
						onDelete={onDelete}
					/>
				))
			)}
		</div>
	);
};

export default NotesList;
