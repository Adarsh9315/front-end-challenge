import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const STORAGE_KEY = 'custom-notes';
const COLOR_OPTIONS = [
	{ id: 'sunrise', label: 'Sunrise', value: '#FFE2D1' },
	{ id: 'mint', label: 'Mint', value: '#D7F9E9' },
	{ id: 'ocean', label: 'Ocean', value: '#D6ECFF' },
	{ id: 'lilac', label: 'Lilac', value: '#E8D6FF' },
	{ id: 'sand', label: 'Sand', value: '#FFF1CC' },
];
const CATEGORY_OPTIONS = ['General', 'Personal', 'Work', 'Ideas', 'Study'];

const buildEmptyDraft = () => ({
	title: '',
	content: '',
	category: CATEGORY_OPTIONS[0],
	color: COLOR_OPTIONS[0].value,
	pinned: false,
});

const normalizeNotes = (storedNotes) => {
	if (!Array.isArray(storedNotes)) {
		return [];
	}

	return storedNotes.map((note) => ({
		...note,
		title: note.title || 'Untitled',
		content: note.content || '',
		category: note.category || CATEGORY_OPTIONS[0],
		color: note.color || COLOR_OPTIONS[0].value,
		pinned: Boolean(note.pinned),
		createdAt: Number(note.createdAt) || 0,
		updatedAt: Number(note.updatedAt) || Number(note.createdAt) || 0,
	}));
};

const App = () => {
	const [notes, setNotes] = useState(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? normalizeNotes(JSON.parse(stored)) : [];
		} catch (error) {
			return [];
		}
	});
	const [draft, setDraft] = useState(buildEmptyDraft);
	const [editingId, setEditingId] = useState(null);
	const [query, setQuery] = useState('');
	const [filterCategory, setFilterCategory] = useState('All');
	const [sortBy, setSortBy] = useState('updated');
	const [showPinnedFirst, setShowPinnedFirst] = useState(true);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
	}, [notes]);

	const categories = useMemo(() => {
		const dynamic = Array.from(
			new Set(notes.map((note) => note.category).filter(Boolean))
		);
		return ['All', ...new Set([...CATEGORY_OPTIONS, ...dynamic])];
	}, [notes]);

	const stats = useMemo(() => {
		const total = notes.length;
		const pinned = notes.filter((note) => note.pinned).length;
		const latest = notes.reduce(
			(max, note) => (note.updatedAt > max ? note.updatedAt : max),
			0
		);
		return { total, pinned, latest };
	}, [notes]);

	const filteredNotes = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		let result = notes.filter((note) => {
			const matchesQuery =
				!normalizedQuery ||
				`${note.title} ${note.content}`.toLowerCase().includes(normalizedQuery);
			const matchesCategory =
				filterCategory === 'All' || note.category === filterCategory;
			return matchesQuery && matchesCategory;
		});

		result.sort((first, second) => {
			if (showPinnedFirst && first.pinned !== second.pinned) {
				return first.pinned ? -1 : 1;
			}
			if (sortBy === 'title') {
				return first.title.localeCompare(second.title);
			}
			if (sortBy === 'created') {
				return second.createdAt - first.createdAt;
			}
			return second.updatedAt - first.updatedAt;
		});

		return result;
	}, [notes, query, filterCategory, sortBy, showPinnedFirst]);

	const wordCount = useMemo(() => {
		const trimmed = draft.content.trim();
		return trimmed ? trimmed.split(/\s+/).length : 0;
	}, [draft.content]);

	const updateDraft = (updates) => {
		setDraft((prevDraft) => ({ ...prevDraft, ...updates }));
	};

	const resetDraft = () => {
		setDraft(buildEmptyDraft());
		setEditingId(null);
	};

	const handleSave = () => {
		const trimmedTitle = draft.title.trim();
		const trimmedContent = draft.content.trim();
		if (!trimmedTitle && !trimmedContent) {
			return;
		}

		const now = Date.now();
		if (editingId) {
			setNotes((prevNotes) =>
				prevNotes.map((note) =>
					note.id === editingId
						? {
								...note,
								title: trimmedTitle || 'Untitled',
								content: trimmedContent,
								category: draft.category,
								color: draft.color,
								pinned: draft.pinned,
								updatedAt: now,
						  }
						: note
				)
			);
		} else {
			const newNote = {
				id: `note-${now}-${Math.floor(Math.random() * 1000)}`,
				title: trimmedTitle || 'Untitled',
				content: trimmedContent,
				category: draft.category,
				color: draft.color,
				pinned: draft.pinned,
				createdAt: now,
				updatedAt: now,
			};
			setNotes((prevNotes) => [newNote, ...prevNotes]);
		}

		resetDraft();
	};

	const handleEdit = (note) => {
		setEditingId(note.id);
		setDraft({
			title: note.title || '',
			content: note.content || '',
			category: note.category || CATEGORY_OPTIONS[0],
			color: note.color || COLOR_OPTIONS[0].value,
			pinned: note.pinned || false,
		});
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDelete = (noteId) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
		if (editingId === noteId) {
			resetDraft();
		}
	};

	const handleDuplicate = (note) => {
		const now = Date.now();
		const duplicated = {
			...note,
			id: `note-${now}-${Math.floor(Math.random() * 1000)}`,
			title: `${note.title} (copy)`,
			pinned: false,
			createdAt: now,
			updatedAt: now,
		};
		setNotes((prevNotes) => [duplicated, ...prevNotes]);
	};

	const togglePin = (noteId) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === noteId
					? { ...note, pinned: !note.pinned, updatedAt: Date.now() }
					: note
			)
		);
	};

	const formatTimestamp = (value) => {
		if (!value) {
			return 'No edits yet';
		}
		return new Date(value).toLocaleString(undefined, {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className='notes-app'>
			<header className='notes-hero'>
				<div className='container'>
					<div className='notes-hero-content'>
						<div>
							<p className='notes-kicker'>Custom Note Studio</p>
							<h1>Capture ideas, tasks, and moments in one place.</h1>
							<p className='notes-subtitle'>
								Build a personal knowledge space with colors, categories, and
								pin-ready highlights.
							</p>
						</div>
						<div className='notes-stats'>
							<div className='stat-card'>
								<p>Total notes</p>
								<h3>{stats.total}</h3>
							</div>
							<div className='stat-card'>
								<p>Pinned</p>
								<h3>{stats.pinned}</h3>
							</div>
							<div className='stat-card'>
								<p>Last update</p>
								<h3>{stats.latest ? formatTimestamp(stats.latest) : 'New'}</h3>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className='container notes-body'>
				<div className='row'>
					<div className='col-lg-4'>
						<section className='notes-panel'>
							<div className='panel-header'>
								<h2>{editingId ? 'Edit note' : 'New note'}</h2>
								{editingId && <span className='editing-pill'>Editing</span>}
							</div>

							<div className='form-group'>
								<label htmlFor='note-title'>Title</label>
								<input
									id='note-title'
									className='form-control'
									placeholder='Give it a headline'
									value={draft.title}
									onChange={(event) => updateDraft({ title: event.target.value })}
								/>
							</div>

							<div className='form-group'>
								<label htmlFor='note-content'>Details</label>
								<textarea
									id='note-content'
									className='form-control notes-textarea'
									placeholder='Write your thoughts here'
									value={draft.content}
									onChange={(event) =>
										updateDraft({ content: event.target.value })
									}
								/>
							</div>

							<div className='form-group'>
								<label htmlFor='note-category'>Category</label>
								<select
									id='note-category'
									className='form-control'
									value={draft.category}
									onChange={(event) =>
										updateDraft({ category: event.target.value })
									}
								>
									{CATEGORY_OPTIONS.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							<div className='form-group'>
								<label>Color theme</label>
								<div className='color-picker'>
									{COLOR_OPTIONS.map((option) => (
										<button
											key={option.id}
											type='button'
											className={`color-swatch ${
												draft.color === option.value ? 'active' : ''
											}`}
											style={{ backgroundColor: option.value }}
											onClick={() => updateDraft({ color: option.value })}
											aria-label={`Select ${option.label} color`}
											title={option.label}
										/>
									))}
								</div>
							</div>

							<label className='notes-toggle'>
								<input
									type='checkbox'
									checked={draft.pinned}
									onChange={(event) =>
										updateDraft({ pinned: event.target.checked })
									}
								/>
								<span>Pin this note</span>
							</label>

							<div className='draft-meta'>
								<span>{wordCount} words</span>
								<span>{draft.content.length} characters</span>
							</div>

							<div className='notes-actions'>
								<button type='button' className='btn btn-primary' onClick={handleSave}>
									{editingId ? 'Update note' : 'Save note'}
								</button>
								<button
									type='button'
									className='btn btn-outline-light'
									onClick={resetDraft}
								>
									{editingId ? 'Cancel' : 'Clear'}
								</button>
							</div>
						</section>
					</div>

					<div className='col-lg-8'>
						<section className='notes-panel notes-panel--list'>
							<div className='notes-list-header'>
								<div>
									<h2>Notes</h2>
									<p className='notes-count'>
										Showing {filteredNotes.length} of {notes.length}
									</p>
								</div>
								<div className='notes-controls'>
									<input
										className='form-control'
										placeholder='Search notes'
										value={query}
										onChange={(event) => setQuery(event.target.value)}
									/>
									<select
										className='form-control'
										value={filterCategory}
										onChange={(event) => setFilterCategory(event.target.value)}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
									<select
										className='form-control'
										value={sortBy}
										onChange={(event) => setSortBy(event.target.value)}
									>
										<option value='updated'>Sort by last edit</option>
										<option value='created'>Sort by created</option>
										<option value='title'>Sort by title</option>
									</select>
								</div>
								<label className='notes-toggle'>
									<input
										type='checkbox'
										checked={showPinnedFirst}
										onChange={(event) =>
											setShowPinnedFirst(event.target.checked)
										}
									/>
									<span>Pin priority</span>
								</label>
							</div>

							{filteredNotes.length === 0 ? (
								<div className='notes-empty'>
									<h3>No notes yet</h3>
									<p>Create a note or adjust your filters.</p>
								</div>
							) : (
								<div className='notes-grid'>
									{filteredNotes.map((note) => (
										<article
											key={note.id}
											className={`note-card ${note.pinned ? 'pinned' : ''}`}
											style={{ '--note-color': note.color }}
										>
											<div className='note-card-header'>
												<span className='note-category'>{note.category}</span>
												<div className='note-actions'>
													<button type='button' onClick={() => togglePin(note.id)}>
														{note.pinned ? 'Unpin' : 'Pin'}
													</button>
													<button type='button' onClick={() => handleEdit(note)}>
														Edit
													</button>
													<button type='button' onClick={() => handleDuplicate(note)}>
														Duplicate
													</button>
													<button type='button' onClick={() => handleDelete(note.id)}>
														Delete
													</button>
												</div>
											</div>
											<h3>{note.title}</h3>
											<p className='note-preview'>
												{note.content || 'No additional details yet.'}
											</p>
											<div className='note-footer'>
												<span>
													Updated {formatTimestamp(note.updatedAt || note.createdAt)}
												</span>
												{note.pinned && <span className='note-pin'>Pinned</span>}
											</div>
										</article>
									))}
								</div>
							)}
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
