import { useState, useReducer } from 'react';
import Result from './Result';
import SearchForm from './SearchForm';

function SearchWithReducer() {
	const initialState = {
		loading: false,
		result: null,
		error: '',
	};

	const [searchString, setSearchString] = useState('');
	const [state, dispatch] = useReducer(apiStateReducer, initialState);
	const { loading, result, error } = state;

	function apiStateReducer(state, action) {
		switch (action.type) {
			case 'loading': {
				return { ...initialState, loading: true };
			}
			case 'success': {
				return { ...state, loading: false, result: action.data };
			}
			case 'error': {
				return { ...state, loading: false, error: action.error };
			}
			default: {
				return state;
			}
		}
	}

	function handleChange(event) {
		setSearchString(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		dispatch({ type: 'loading' });
		const url = `https://pokeapi.co/api/v2/pokemon/${searchString}`;
		fetch(url)
			.then((res) => {
				if (res.status === 404) {
					return dispatch({
						type: 'error',
						error: `No result found for ${searchString}. Please try another search!`,
					});
				} else if (res.status === 200) {
					return res.json();
				}
			})
			.then((data) => {
				dispatch({
					type: 'success',
					data,
				});
			})
			.catch((err) => {
				dispatch({
					type: 'error',
					error: 'Oops, something went wrong! Please try again later.',
				});
			});
	}
	return (
		<div>
			<SearchForm
				searchString={searchString}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			{result && <Result result={result} />}
			{loading && 'Loading results...'}
			{error && error}
		</div>
	);
}

export default SearchWithReducer;
