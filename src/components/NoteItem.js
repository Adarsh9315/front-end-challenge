import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
	return (
		<div className='note-item mb-3'>
			<div className='note-header d-flex justify-content-between align-items-center mb-2'>
				<h4 className='note-title mb-0'>{note.title}</h4>
				<div className='note-actions'>
					<button
						className='btn btn-sm btn-outline-primary mr-2'
						onClick={() => onEdit(note.id)}
					>
						Edit
					</button>
					<button
						className='btn btn-sm btn-danger'
						onClick={() => onDelete(note.id)}
					>
						Delete
					</button>
				</div>
			</div>
			<p className='note-content'>{note.content}</p>
			<small className='note-date' style={{ opacity: 0.6 }}>
				{new Date(note.createdAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				})}
			</small>
		</div>
	);
};

export default NoteItem;
