import React, { useState } from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(note.title);
	const [editContent, setEditContent] = useState(note.content);

	const handleSave = () => {
		if (editTitle.trim() && editContent.trim()) {
			onEdit(note.id, editTitle, editContent);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setEditTitle(note.title);
		setEditContent(note.content);
		setIsEditing(false);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	if (isEditing) {
		return (
			<div className='note-item editing'>
				<input
					type='text'
					className='form-control mb-2'
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
					placeholder='Note title'
				/>
				<textarea
					className='form-control mb-2'
					value={editContent}
					onChange={(e) => setEditContent(e.target.value)}
					placeholder='Note content'
					rows='5'
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
		);
	}

	return (
		<div className='note-item'>
			<h3 className='note-title'>{note.title}</h3>
			<p className='note-content'>{note.content}</p>
			<p className='note-date'>{formatDate(note.createdAt)}</p>
			<div className='note-actions'>
				<button className='btn btn-primary btn-sm' onClick={() => setIsEditing(true)}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm ml-2' onClick={() => onDelete(note.id)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default NoteItem;
