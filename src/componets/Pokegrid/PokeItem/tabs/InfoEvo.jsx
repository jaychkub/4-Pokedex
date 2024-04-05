import { useState, useEffect } from "react";

const PokeInfoEvo = (props) => {
	const id = props.pokeId;

	const [speciesData, setSpeciesData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const speciesRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${id}/`
				);
				setSpeciesData(await speciesRes.json());

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, [id]);

	return (
		<div className="PokeInfo-Evo">
			{!isDataLoading && (
				<>
					<p>{speciesData["id"]}</p>
				</>
			)}
		</div>
	);
};

export default PokeInfoEvo;
