import React, { useState } from 'react';

const AddNoteForm = ({ onAddNote }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title.trim() && content.trim()) {
			onAddNote(title, content);
			setTitle('');
			setContent('');
		}
	};

	return (
		<div className='add-note-form'>
			<h3>Add New Note</h3>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						placeholder='Note title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<textarea
						className='form-control'
						placeholder='Note content'
						rows='4'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button type='submit' className='btn btn-primary btn-block'>
					Add Note
				</button>
			</form>
		</div>
	);
};

export default AddNoteForm;
