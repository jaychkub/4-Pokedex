import { useState, useEffect } from "react";

const PokeInfoEvo = (props) => {
	const id = props.pokeId;

	const [evolutionData, setEvolutionData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const evolutionData = await fetch(
					`https://pokeapi.co/api/v2/evolution-chain/${id}/`
				).json();
				setEvolutionData(evolutionData);

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
					<div>{evolutionData["id"]}</div>
				</>
			)}
		</div>
	);
};

export default PokeInfoEvo;
