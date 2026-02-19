import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title.trim() || body.trim()) {
			onAdd(title.trim(), body.trim());
			setTitle('');
			setBody('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='add-note-form mb-4'>
			<div className='mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Note title...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{
						backgroundColor: '#2a2a2a',
						color: '#ffffff',
						border: '1px solid #444'
					}}
				/>
			</div>
			<div className='mb-2'>
				<textarea
					className='form-control'
					placeholder='Write your note...'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					rows={4}
					style={{
						backgroundColor: '#2a2a2a',
						color: '#ffffff',
						border: '1px solid #444',
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
