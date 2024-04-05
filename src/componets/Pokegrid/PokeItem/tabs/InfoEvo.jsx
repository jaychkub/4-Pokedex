import { useState, useEffect } from "react";

const PokeInfoEvo = (props) => {
	const id = props.pokeId;

	const [evolutionData, setEvolutionData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const evolutionRes = await fetch(
					`https://pokeapi.co/api/v2/evolution-chain/${id}/`
				);
				setEvolutionData(await evolutionRes.json());

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
					<p>{evolutionData["id"]}</p>
				</>
			)}
		</div>
	);
};

export default PokeInfoEvo;
