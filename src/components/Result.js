function Result({ result }) {
	return (
		<section>
			<h2>Name: {result.name}</h2>
			<h3>Species: {result.species.name}</h3>
			<h3>Height: {result.height}</h3>
			<small>
				Height: {result.height}, Weight: {result.weight}
			</small>
		</section>
	);
}

export default Result;
