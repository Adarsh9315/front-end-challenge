import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
	if (notes.length === 0) {
		return (
			<div className='text-center mt-5' style={{ opacity: 0.6 }}>
				<p>No notes yet. Add one to get started!</p>
			</div>
		);
	}

	return (
		<div className='note-list'>
			{notes.map((note) => (
				<NoteItem
					key={note.id}
					note={note}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default NoteList;
