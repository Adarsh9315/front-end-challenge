import React, { useEffect, useState } from 'react';

const Notes = () => {
	const [noteText, setNoteText] = useState('');
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (Array.isArray(savedNotes)) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const addNote = () => {
		const trimmed = noteText.trim();
		if (!trimmed) return;
		const newNote = {
			id: Date.now(),
			text: trimmed,
			createdAt: new Date().toISOString()
		};
		setNotes([newNote, ...notes]);
		setNoteText('');
	};

	const deleteNote = (id) => {
		setNotes(notes.filter((note) => note.id !== id));
	};

	const clearNotes = () => {
		setNotes([]);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			addNote();
		}
	};

	return (
		<div className='notes-panel'>
			<div className='notes-header'>
				<div>
					<h2 className='notes-title'>Notes</h2>
					<p className='notes-subtitle'>Capture quick ideas while you browse movies.</p>
				</div>
				<button className='notes-clear' onClick={clearNotes} disabled={notes.length === 0}>
					Clear all
				</button>
			</div>
			<div className='notes-input'>
				<textarea
					className='notes-textarea'
					placeholder='Write a note and press Enter to save…'
					value={noteText}
					onChange={(event) => setNoteText(event.target.value)}
					onKeyDown={handleKeyDown}
					rows='3'
				/>
				<button className='notes-add' onClick={addNote}>
					Add note
				</button>
			</div>
			<div className='notes-list'>
				{notes.length === 0 ? (
					<div className='notes-empty'>No notes yet. Add your first note above.</div>
				) : (
					notes.map((note) => (
						<div key={note.id} className='notes-card'>
							<div className='notes-card-text'>{note.text}</div>
							<div className='notes-card-footer'>
								<span>{new Date(note.createdAt).toLocaleString()}</span>
								<button className='notes-delete' onClick={() => deleteNote(note.id)}>
									Delete
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Notes;
