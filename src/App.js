import React, { useEffect, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'notes-app.v1';

const loadNotes = () => {
	if (typeof window === 'undefined') {
		return [];
	}

	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		const parsed = stored ? JSON.parse(stored) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		return [];
	}
};

const createId = () =>
	`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const formatDate = (timestamp) => {
	if (!timestamp) {
		return '';
	}

	return new Date(timestamp).toLocaleString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const normalizeText = (value) => (typeof value === 'string' ? value : '');

const App = () => {
	const [notes, setNotes] = useState(() => loadNotes());
	const [activeId, setActiveId] = useState(() => {
		const storedNotes = loadNotes();
		return storedNotes[0]?.id || null;
	});
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		if (notes.length === 0) {
			setActiveId(null);
			return;
		}

		if (!notes.some((note) => note.id === activeId)) {
			setActiveId(notes[0].id);
		}
	}, [activeId, notes]);

	const activeNote = notes.find((note) => note.id === activeId);
	const normalizedSearch = searchTerm.trim().toLowerCase();
	const filteredNotes = notes.filter((note) => {
		const title = normalizeText(note.title);
		const body = normalizeText(note.body);

		if (!normalizedSearch) {
			return true;
		}

		return (
			title.toLowerCase().includes(normalizedSearch) ||
			body.toLowerCase().includes(normalizedSearch)
		);
	});
	const orderedNotes = [...filteredNotes].sort(
		(first, second) => second.updatedAt - first.updatedAt
	);

	const createNote = () => {
		const now = Date.now();
		const newNote = {
			id: createId(),
			title: '',
			body: '',
			createdAt: now,
			updatedAt: now,
		};

		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setActiveId(newNote.id);
	};

	const updateActiveField = (field, value) => {
		if (!activeNote) {
			return;
		}

		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === activeId
					? { ...note, [field]: value, updatedAt: Date.now() }
					: note
			)
		);
	};

	const deleteNote = (noteId) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
	};

	return (
		<div className='app'>
			<header className='app-header'>
				<div>
					<p className='app-kicker'>Personal Notes</p>
					<h1>Note Taking App</h1>
					<p className='app-subtitle'>
						Capture ideas, track tasks, and keep thoughts organized.
					</p>
				</div>
				<button className='btn primary' onClick={createNote} type='button'>
					New note
				</button>
			</header>
			<section className='app-body'>
				<aside className='sidebar'>
					<div className='search'>
						<input
							placeholder='Search notes'
							type='search'
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
						/>
					</div>
					<div className='note-count'>
						{filteredNotes.length} of {notes.length} notes
					</div>
					<div className='note-list'>
						{orderedNotes.length === 0 ? (
							<div className='empty-state'>No notes yet.</div>
						) : (
							orderedNotes.map((note) => {
								const title = normalizeText(note.title).trim();
								const body = normalizeText(note.body).trim();

								return (
									<button
										className={`note-card ${
											note.id === activeId ? 'active' : ''
										}`}
										key={note.id}
										onClick={() => setActiveId(note.id)}
										type='button'
									>
										<div className='note-card-title'>
											{title || 'Untitled note'}
										</div>
										<div className='note-card-body'>
											{body || 'No details added yet.'}
										</div>
										<div className='note-card-date'>
											{formatDate(note.updatedAt)}
										</div>
									</button>
								);
							})
						)}
					</div>
				</aside>
				<main className='editor'>
					{activeNote ? (
						<div className='editor-inner'>
							<input
								className='editor-title'
								placeholder='Note title'
								type='text'
								value={normalizeText(activeNote.title)}
								onChange={(event) =>
									updateActiveField('title', event.target.value)
								}
							/>
							<textarea
								className='editor-body'
								placeholder='Write your note here...'
								rows={12}
								value={normalizeText(activeNote.body)}
								onChange={(event) =>
									updateActiveField('body', event.target.value)
								}
							/>
							<div className='editor-footer'>
								<div className='editor-meta'>
									Created {formatDate(activeNote.createdAt)} · Updated{' '}
									{formatDate(activeNote.updatedAt)}
								</div>
								<button
									className='btn danger'
									onClick={() => deleteNote(activeNote.id)}
									type='button'
								>
									Delete note
								</button>
							</div>
						</div>
					) : (
						<div className='editor-empty'>
							<h2>No note selected</h2>
							<p>Create a note to start writing.</p>
							<button className='btn primary' onClick={createNote} type='button'>
								Create note
							</button>
						</div>
					)}
				</main>
			</section>
		</div>
	);
};

export default App;
