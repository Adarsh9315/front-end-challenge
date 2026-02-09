import React, { useState, useEffect } from 'react';

const NoteEditor = (props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (props.editingNote) {
			setTitle(props.editingNote.title);
			setContent(props.editingNote.content);
		}
	}, [props.editingNote]);

	const handleSave = () => {
		if (!title.trim() || !content.trim()) {
			return;
		}

		const note = {
			title: title,
			content: content,
			date: new Date().toLocaleDateString()
		};

		if (props.editingNote) {
			props.handleUpdateNote(note, props.editingIndex);
		} else {
			props.handleAddNote(note);
		}

		setTitle('');
		setContent('');
	};

	const handleCancel = () => {
		setTitle('');
		setContent('');
		if (props.handleCancelEdit) {
			props.handleCancelEdit();
		}
	};

	return (
		<div className='note-editor'>
			<div className='form-group'>
				<input
					type='text'
					className='form-control note-input'
					placeholder='Note Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<textarea
					className='form-control note-textarea'
					placeholder='Write your note here...'
					rows='5'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<div className='note-editor-actions'>
				<button
					className='btn btn-primary mr-2'
					onClick={handleSave}
				>
					{props.editingNote ? 'Update Note' : 'Add Note'}
				</button>
				{props.editingNote && (
					<button
						className='btn btn-secondary'
						onClick={handleCancel}
					>
						Cancel
					</button>
				)}
			</div>
		</div>
	);
};

export default NoteEditor;
