import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
		setNotes(savedNotes);
	}, []);

	const saveToLocalStorage = (notesArray) => {
		localStorage.setItem('notes', JSON.stringify(notesArray));
	};

	const addNote = () => {
		if (noteTitle.trim() === '' || noteContent.trim() === '') {
			alert('Please fill in both title and content');
			return;
		}

		if (editingId !== null) {
			// Update existing note
			const updatedNotes = notes.map(note =>
				note.id === editingId
					? { ...note, title: noteTitle, content: noteContent, updatedAt: new Date().toISOString() }
					: note
			);
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
			setEditingId(null);
		} else {
			// Add new note
			const newNote = {
				id: Date.now(),
				title: noteTitle,
				content: noteContent,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			const updatedNotes = [...notes, newNote];
			setNotes(updatedNotes);
			saveToLocalStorage(updatedNotes);
		}

		setNoteTitle('');
		setNoteContent('');
	};

	const deleteNote = (id) => {
		const updatedNotes = notes.filter(note => note.id !== id);
		setNotes(updatedNotes);
		saveToLocalStorage(updatedNotes);
	};

	const editNote = (note) => {
		setNoteTitle(note.title);
		setNoteContent(note.content);
		setEditingId(note.id);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const cancelEdit = () => {
		setNoteTitle('');
		setNoteContent('');
		setEditingId(null);
	};

	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		note.content.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<div className='container-fluid notes-app' style={{ padding: '20px' }}>
			<div className='row align-items-center mb-4'>
				<div className='col'>
					<h1 style={{ color: '#ffffff' }}>📝 My Notes</h1>
				</div>
				<div className='col-auto'>
					<Link to='/' className='btn btn-outline-light'>
						← Back to Movies
					</Link>
				</div>
			</div>

			{/* Note Input Form */}
			<div className='card mb-4' style={{ backgroundColor: '#2a2a2a', border: 'none' }}>
				<div className='card-body'>
					<h5 className='card-title' style={{ color: '#ffffff' }}>
						{editingId ? 'Edit Note' : 'Create New Note'}
					</h5>
					<div className='form-group mb-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Note Title'
							value={noteTitle}
							onChange={(e) => setNoteTitle(e.target.value)}
							style={{
								backgroundColor: '#1a1a1a',
								color: '#ffffff',
								border: '1px solid #444'
							}}
						/>
					</div>
					<div className='form-group mb-3'>
						<textarea
							className='form-control'
							placeholder='Note Content'
							value={noteContent}
							onChange={(e) => setNoteContent(e.target.value)}
							rows='5'
							style={{
								backgroundColor: '#1a1a1a',
								color: '#ffffff',
								border: '1px solid #444'
							}}
						/>
					</div>
					<div className='d-flex gap-2'>
						<button
							className='btn btn-primary'
							onClick={addNote}
							style={{ marginRight: '10px' }}
						>
							{editingId ? 'Update Note' : 'Add Note'}
						</button>
						{editingId && (
							<button
								className='btn btn-secondary'
								onClick={cancelEdit}
							>
								Cancel
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Search Box */}
			{notes.length > 0 && (
				<div className='mb-4'>
					<input
						type='text'
						className='form-control'
						placeholder='Search notes...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{
							backgroundColor: '#2a2a2a',
							color: '#ffffff',
							border: '1px solid #444'
						}}
					/>
				</div>
			)}

			{/* Notes List */}
			<div className='row'>
				{filteredNotes.length === 0 ? (
					<div className='col-12 text-center' style={{ color: '#888', padding: '40px' }}>
						{notes.length === 0 ? 'No notes yet. Create your first note!' : 'No notes match your search.'}
					</div>
				) : (
					filteredNotes.map((note) => (
						<div className='col-md-6 col-lg-4 mb-4' key={note.id}>
							<div
								className='card h-100'
								style={{
									backgroundColor: '#2a2a2a',
									border: '1px solid #444',
									transition: 'transform 0.2s'
								}}
								onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
								onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
							>
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title' style={{ color: '#ffffff' }}>
										{note.title}
									</h5>
									<p
										className='card-text flex-grow-1'
										style={{
											color: '#cccccc',
											whiteSpace: 'pre-wrap',
											wordBreak: 'break-word'
										}}
									>
										{note.content}
									</p>
									<div style={{ fontSize: '0.8em', color: '#888', marginBottom: '10px' }}>
										<div>Created: {formatDate(note.createdAt)}</div>
										{note.updatedAt !== note.createdAt && (
											<div>Updated: {formatDate(note.updatedAt)}</div>
										)}
									</div>
									<div className='d-flex gap-2'>
										<button
											className='btn btn-sm btn-outline-primary'
											onClick={() => editNote(note)}
											style={{ marginRight: '10px' }}
										>
											Edit
										</button>
										<button
											className='btn btn-sm btn-outline-danger'
											onClick={() => deleteNote(note.id)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Notes;
