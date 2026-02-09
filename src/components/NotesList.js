import React from 'react';

const NotesList = (props) => {
	return (
		<>
			{props.notes.map((note, index) => (
				<div className='note-container' key={index}>
					<div className='note-header'>
						<h5 className='note-title'>{note.title}</h5>
						<span className='note-date'>{note.date}</span>
					</div>
					<div className='note-content'>
						{note.content}
					</div>
					<div className='note-actions'>
						<button
							className='btn btn-sm btn-primary mr-2'
							onClick={() => props.handleEditClick(note, index)}
						>
							Edit
						</button>
						<button
							className='btn btn-sm btn-danger'
							onClick={() => props.handleDeleteClick(index)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default NotesList;
