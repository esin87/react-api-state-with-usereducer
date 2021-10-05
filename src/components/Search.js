import { useState } from 'react';

import Result from './Result';
import SearchForm from './SearchForm';

function Search(props) {
	const [searchString, setSearchString] = useState('');
	const [result, setResult] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	function handleChange(event) {
		setSearchString(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const url = `https://pokeapi.co/api/v2/pokemon/${searchString}`;
		// set error back to falsey
		setError('');
		// set loading to true while we await results of search
		setLoading(true);
		// reset any existing results
		setResult(null);
		fetch(url)
			.then((res) => {
				// 404 means no results found
				if (res.status === 404) {
					// describe 404 error in error state
					setError(
						`No results found for ${searchString}. Please try another search! `
					);
					setLoading(false);
					return;
				} else if (res.status === 200) {
					// 200 means successful response
					// pass body of res onto next .then
					return res.json();
				}
			})
			.then((data) => {
				setResult(data);
				setLoading(false);
			})
			.catch((err) => {
				// if the request promise fails to return a response
				// likely a server side issue
				// invite user to try again later
				console.log(err);
				setError('Oops, something went wrong! Please try again later.');
				setLoading(false);
			});
		//reset search string for ux
		setSearchString('');
	}

	return (
		<div>
			<SearchForm
				searchString={searchString}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			{result && <Result result={result} />}
			{error && error}
			{loading && 'Loading results...'}
		</div>
	);
}

export default Search;
