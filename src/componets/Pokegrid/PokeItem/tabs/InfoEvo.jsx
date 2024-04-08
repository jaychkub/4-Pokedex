import { useState, useEffect } from "react";

import arrow from "./evoarrow.png";

const PokeEvoSlot = (props) => {
	const name = props.name;
	const current = props.current;

	const [pokemonData, setPokemonData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [isCurrent, setIsCurrent] = useState();

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const pokemonRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${name}`
				);
				setPokemonData(await pokemonRes.json());

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();

		if (name === current) setIsCurrent(true);
		else setIsCurrent(false);
	}, []);

	return (
		<div className={isCurrent ? "PokeEvoSlot current" : "PokeEvoSlot"}>
			{!isDataLoading && (
				<>
					<img src={pokemonData["sprites"]["front_default"]} alt="" />
					{/* <p>{props.name}</p> */}
				</>
			)}
		</div>
	);
};

const PokeInfoEvo = (props) => {
	const id = props.pokeId;

	const [speciesData, setSpeciesData] = useState();
	const [evolutionData, setEvolutionData] = useState();
	const [isSpeciesDataLoading, setIsSpeciesDataLoading] = useState(true);
	const [isEvolutionDataLoading, setIsEvolutionDataLoading] = useState(true);

	useEffect(() => {
		setIsSpeciesDataLoading(true);
		const fetchData = async () => {
			try {
				const speciesRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${id}/`
				);
				setSpeciesData(await speciesRes.json());

				setIsSpeciesDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		setIsEvolutionDataLoading(true);
		const fetchData = async () => {
			if (!isSpeciesDataLoading) {
				try {
					const evolutionRes = await fetch(
						`${speciesData["evolution_chain"]["url"]}`
					);
					setEvolutionData(await evolutionRes.json());

					setIsEvolutionDataLoading(false);
				} catch (error) {
					console.error("Error: ", error);
				}
			}
		};
		fetchData();
	}, [speciesData, id]);

	return (
		<div className="PokeInfo-Evo">
			{!isSpeciesDataLoading && !isEvolutionDataLoading && (
				<>
					<PokeEvoSlot
						name={evolutionData["chain"]["species"]["name"]}
						current={speciesData["name"]}
					/>
					<img className="arrow" src={arrow} alt="" />
					<PokeEvoSlot
						name={
							evolutionData["chain"]["evolves_to"][0]["species"][
								"name"
							]
						}
						current={speciesData["name"]}
					/>
					<img className="arrow" src={arrow} alt="" />
					<PokeEvoSlot
						name={
							evolutionData["chain"]["evolves_to"][0][
								"evolves_to"
							][0]["species"]["name"]
						}
						current={speciesData["name"]}
					/>
				</>
			)}
		</div>
	);
};

export default PokeInfoEvo;
