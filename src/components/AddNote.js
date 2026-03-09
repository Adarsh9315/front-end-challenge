import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title.trim() || content.trim()) {
			onAdd(title, content);
			setTitle('');
			setContent('');
		}
	};

	return (
		<div className='add-note mb-4'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					className='form-control mb-2'
					placeholder='Note title (optional)'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className='form-control mb-2'
					placeholder='Write your note here...'
					rows='4'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type='submit' className='btn btn-primary'>
					Add Note
				</button>
			</form>
		</div>
	);
};

export default AddNote;
