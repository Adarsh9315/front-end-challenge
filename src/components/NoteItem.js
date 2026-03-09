import React, { useState } from 'react';

const NoteItem = ({ note, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(note.title);
	const [editContent, setEditContent] = useState(note.content);

	const handleSave = () => {
		if (editTitle.trim() || editContent.trim()) {
			onUpdate(note.id, editTitle, editContent);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setEditTitle(note.title);
		setEditContent(note.content);
		setIsEditing(false);
	};

	return (
		<div className='note-item mb-3'>
			{isEditing ? (
				<div className='note-edit'>
					<input
						type='text'
						className='form-control mb-2'
						placeholder='Note title'
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
					<textarea
						className='form-control mb-2'
						placeholder='Note content'
						rows='6'
						value={editContent}
						onChange={(e) => setEditContent(e.target.value)}
					/>
					<div className='note-actions'>
						<button className='btn btn-success btn-sm' onClick={handleSave}>
							Save
						</button>
						<button className='btn btn-secondary btn-sm ml-2' onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className='note-view'>
					<div className='note-header'>
						{note.title && <h4>{note.title}</h4>}
						<div className='note-actions'>
							<button className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>
								Edit
							</button>
							<button className='btn btn-danger btn-sm ml-2' onClick={() => onDelete(note.id)}>
								Delete
							</button>
						</div>
					</div>
					<p className='note-content'>{note.content}</p>
					<small className='note-date'>
						{new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
					</small>
				</div>
			)}
		</div>
	);
};

export default NoteItem;
