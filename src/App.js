import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNomination from './components/AddNomination';
import RemoveNominations from './components/RemoveNominations.js';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { useSnackbar } from 'react-simple-snackbar'

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nomination, setNomination] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [notes, setNotes] = useState([]);
	const [editingNote, setEditingNote] = useState(null);
	const [editingIndex, setEditingIndex] = useState(null);
	const [openSnackbar] = useSnackbar()

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a21d8f2b`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieNomination = JSON.parse(
			localStorage.getItem('nominations')
		);

		if (movieNomination) {
			setNomination(movieNomination);
		}

		const savedNotes = JSON.parse(
			localStorage.getItem('notes')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('nominations', JSON.stringify(items));
	};

	const addNominationMovie = (movie) => {
		let savedNominations = localStorage.getItem('nominations');
		if (savedNominations) {
			savedNominations = JSON.parse(savedNominations);
			if (savedNominations.length === 5) {
				openSnackbar('Only 5 nominations are allowed per user')
				return;
			}

			let obj = savedNominations.find(o => o.imdbID === movie.imdbID);
			if (!obj) {
				const newNominationList = [...nomination, movie];
				setNomination(newNominationList);
				saveToLocalStorage(newNominationList);
			}
		}else{
			const newNominationList = [...nomination, movie];
			setNomination(newNominationList);
			saveToLocalStorage(newNominationList);
		}
	};

	const removeNominationMovie = (movie) => {
		const newNominationList = nomination.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNomination(newNominationList);
		saveToLocalStorage(newNominationList);
	};

	const saveNotesToLocalStorage = (items) => {
		localStorage.setItem('notes', JSON.stringify(items));
	};

	const addNote = (note) => {
		const newNotesList = [...notes, note];
		setNotes(newNotesList);
		saveNotesToLocalStorage(newNotesList);
		openSnackbar('Note added successfully');
	};

	const updateNote = (note, index) => {
		const newNotesList = [...notes];
		newNotesList[index] = note;
		setNotes(newNotesList);
		saveNotesToLocalStorage(newNotesList);
		setEditingNote(null);
		setEditingIndex(null);
		openSnackbar('Note updated successfully');
	};

	const deleteNote = (index) => {
		const newNotesList = notes.filter((_, i) => i !== index);
		setNotes(newNotesList);
		saveNotesToLocalStorage(newNotesList);
		openSnackbar('Note deleted successfully');
	};

	const handleEditNote = (note, index) => {
		setEditingNote(note);
		setEditingIndex(index);
	};

	const handleCancelEdit = () => {
		setEditingNote(null);
		setEditingIndex(null);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='banner' style={{display: JSON.parse(localStorage.getItem('nominations')).length === 5 ? 'block' : 'none'}}>
				All 5 nominations are done
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleNominationClick={addNominationMovie}
					nominationComponent={AddNomination}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Nominations' />
			</div>
			<div className='row'>
				<MovieList
					movies={nomination}
					handleNominationClick={removeNominationMovie}
					nominationComponent={RemoveNominations}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Notes' />
			</div>
			<div className='notes-section'>
				<NoteEditor
					handleAddNote={addNote}
					handleUpdateNote={updateNote}
					handleCancelEdit={handleCancelEdit}
					editingNote={editingNote}
					editingIndex={editingIndex}
				/>
				<div className='row mt-4'>
					<NotesList
						notes={notes}
						handleEditClick={handleEditNote}
						handleDeleteClick={deleteNote}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
