import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	const handleEdit = () => {
		if (isEditing && editText !== todo.text) {
			onEdit(todo.id, editText);
		}
		setIsEditing(!isEditing);
	};

	const handleCancel = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleEdit();
		} else if (e.key === 'Escape') {
			handleCancel();
		}
	};

	return (
		<div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
			<div className='todo-item__checkbox'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					id={`todo-${todo.id}`}
				/>
				<label htmlFor={`todo-${todo.id}`}></label>
			</div>

			<div className='todo-item__content'>
				{isEditing ? (
					<input
						type='text'
						className='todo-item__edit-input'
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onKeyDown={handleKeyPress}
						autoFocus
					/>
				) : (
					<span className='todo-item__text'>{todo.text}</span>
				)}
			</div>

			<div className='todo-item__actions'>
				{isEditing ? (
					<>
						<button
							className='todo-item__btn todo-item__btn--save'
							onClick={handleEdit}
							title='Save'
						>
							✓
						</button>
						<button
							className='todo-item__btn todo-item__btn--cancel'
							onClick={handleCancel}
							title='Cancel'
						>
							✕
						</button>
					</>
				) : (
					<>
						<button
							className='todo-item__btn todo-item__btn--edit'
							onClick={() => setIsEditing(true)}
							title='Edit'
						>
							✎
						</button>
						<button
							className='todo-item__btn todo-item__btn--delete'
							onClick={() => onDelete(todo.id)}
							title='Delete'
						>
							🗑
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TodoItem;
