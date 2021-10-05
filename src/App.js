import './App.css';
import Search from './components/Search';
import SearchWithReducer from './components/SearchWithReducer';
function App() {
	return (
		<div>
			<h1>Pokemon Search</h1>
			{/* <Search /> */}
			<SearchWithReducer />
		</div>
	);
}

export default App;
