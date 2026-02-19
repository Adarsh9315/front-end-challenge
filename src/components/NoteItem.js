import React, { useState } from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(note.title);
	const [editBody, setEditBody] = useState(note.body);

	const handleSave = () => {
		if (editTitle.trim() || editBody.trim()) {
			onEdit(note.id, editTitle.trim(), editBody.trim());
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setEditTitle(note.title);
		setEditBody(note.body);
		setIsEditing(false);
	};

	const formatDate = (timestamp) => {
		return new Date(timestamp).toLocaleString();
	};

	if (isEditing) {
		return (
			<div className='note-item mb-3'>
				<input
					type='text'
					className='form-control mb-2'
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
					style={{
						backgroundColor: '#333',
						color: '#ffffff',
						border: '1px solid #555'
					}}
				/>
				<textarea
					className='form-control mb-2'
					value={editBody}
					onChange={(e) => setEditBody(e.target.value)}
					rows={4}
					style={{
						backgroundColor: '#333',
						color: '#ffffff',
						border: '1px solid #555',
						resize: 'vertical'
					}}
				/>
				<div className='d-flex gap-2'>
					<button className='btn btn-success btn-sm mr-2' onClick={handleSave}>
						Save
					</button>
					<button className='btn btn-secondary btn-sm' onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='note-item mb-3'>
			{note.title && (
				<h5 className='note-title mb-2'>{note.title}</h5>
			)}
			<p className='note-body mb-2' style={{ whiteSpace: 'pre-wrap' }}>
				{note.body || <span style={{ opacity: 0.4, fontStyle: 'italic' }}>No content</span>}
			</p>
			<div className='d-flex justify-content-between align-items-center'>
				<small style={{ opacity: 0.5 }}>
					{note.updatedAt !== note.createdAt
						? `Updated ${formatDate(note.updatedAt)}`
						: `Created ${formatDate(note.createdAt)}`}
				</small>
				<div>
					<button
						className='btn btn-outline-light btn-sm mr-2'
						onClick={() => setIsEditing(true)}
					>
						Edit
					</button>
					<button
						className='btn btn-danger btn-sm'
						onClick={() => onDelete(note.id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoteItem;
