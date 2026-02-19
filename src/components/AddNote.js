import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			onAdd(title, content);
			setTitle('');
			setContent('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='add-note-form mb-4'>
			<div className='form-group mb-3'>
				<input
					type='text'
					className='form-control'
					placeholder='Note title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{
						backgroundColor: '#2a2a2a',
						color: '#ffffff',
						border: '1px solid #444',
						padding: '12px'
					}}
				/>
			</div>
			<div className='form-group mb-3'>
				<textarea
					className='form-control'
					placeholder='Note content...'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows='4'
					style={{
						backgroundColor: '#2a2a2a',
						color: '#ffffff',
						border: '1px solid #444',
						padding: '12px',
						resize: 'vertical'
					}}
				/>
			</div>
			<button className='btn btn-primary' type='submit'>
				Add Note
			</button>
		</form>
	);
};

export default AddNote;
