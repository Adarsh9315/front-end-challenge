import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	const handleEdit = () => {
		setIsEditing(true);
		setEditText(todo.text);
	};

	const handleSave = () => {
		if (editText.trim() && editText !== todo.text) {
			onUpdate(todo.id, editText.trim());
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	};

	return (
		<div className='todo-item d-flex align-items-center justify-content-between mb-3'>
			<div className='d-flex align-items-center flex-grow-1'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='mr-3'
					style={{ width: '20px', height: '20px', cursor: 'pointer' }}
					disabled={isEditing}
				/>
				{isEditing ? (
					<input
						type='text'
						className='form-control'
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onBlur={handleSave}
						onKeyDown={handleKeyDown}
						autoFocus
						style={{
							backgroundColor: '#2a2a2a',
							color: '#ffffff',
							border: '1px solid #444',
							fontSize: '1.1em'
						}}
					/>
				) : (
					<span
						onDoubleClick={handleEdit}
						style={{
							textDecoration: todo.completed ? 'line-through' : 'none',
							opacity: todo.completed ? 0.6 : 1,
							fontSize: '1.1em',
							cursor: 'pointer',
							flexGrow: 1
						}}
					>
						{todo.text}
					</span>
				)}
			</div>
			<div className='d-flex gap-2'>
				{!isEditing && (
					<button
						className='btn btn-secondary btn-sm'
						onClick={handleEdit}
					>
						Edit
					</button>
				)}
				<button
					className='btn btn-danger btn-sm'
					onClick={() => onDelete(todo.id)}
					disabled={isEditing}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoItem;
