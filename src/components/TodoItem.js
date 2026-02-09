import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	const handleSave = () => {
		if (editText.trim()) {
			onEdit(todo.id, editText);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSave();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	};

	return (
		<div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
			<div className="todo-content">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className="todo-checkbox"
				/>
				{isEditing ? (
					<input
						type="text"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onKeyDown={handleKeyPress}
						className="todo-edit-input"
						autoFocus
					/>
				) : (
					<span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
						{todo.text}
					</span>
				)}
			</div>
			<div className="todo-actions">
				{isEditing ? (
					<>
						<button className="btn-save" onClick={handleSave}>
							Save
						</button>
						<button className="btn-cancel" onClick={handleCancel}>
							Cancel
						</button>
					</>
				) : (
					<>
						<button className="btn-edit" onClick={() => setIsEditing(true)}>
							Edit
						</button>
						<button className="btn-delete" onClick={() => onDelete(todo.id)}>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TodoItem;
