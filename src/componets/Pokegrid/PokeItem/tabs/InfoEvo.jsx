import { useState, useEffect } from "react";

import arrow from "./evoarrow.png";

const PokeEvoArrow = (props) => {
	const evolutionData = props.data;

	const [evoTriggerData, setEvoTriggerData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const evoTriggerRes = await fetch(
					`https://pokeapi.co/api/v2/evolution-trigger/`
				);
				setEvoTriggerData(await evoTriggerRes.json());

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="arrow">
			<img src={arrow} alt="" />
			<p>{evolutionData["evolution_details"][0]["min_level"]}</p>
		</div>
	);
};

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

	const [stageTwoEvos, setStageTwoEvos] = useState([]);
	const [stageThreeEvos, setStageThreeEvos] = useState([]);

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

	useEffect(() => {
		if (!isEvolutionDataLoading) {
			setStageTwoEvos(evolutionData["chain"]["evolves_to"]);
			if (evolutionData["chain"]["evolves_to"].length > 0)
				setStageThreeEvos(
					evolutionData["chain"]["evolves_to"][0]["evolves_to"]
				);
		}
	}, [evolutionData]);

	return (
		<div className="PokeInfo-Evo">
			{!isSpeciesDataLoading && !isEvolutionDataLoading && (
				<>
					<div className="stage-1">
						<PokeEvoSlot
							name={evolutionData["chain"]["species"]["name"]}
							current={speciesData["name"]}
						/>
					</div>
					{stageTwoEvos.length > 0 ? (
						<div className="stage-2">
							{stageTwoEvos.map((item, index) => (
								<PokeEvoSlot
									key={index}
									name={
										stageTwoEvos[index]["species"]["name"]
									}
									current={speciesData["name"]}
								/>
							))}
						</div>
					) : (
						<></>
					)}
					{stageThreeEvos.length > 0 ? (
						<div className="stage-3">
							{stageThreeEvos.map((item, index) => (
								<PokeEvoSlot
									key={index}
									name={
										stageThreeEvos[index]["species"]["name"]
									}
									current={speciesData["name"]}
								/>
							))}
						</div>
					) : (
						<></>
					)}

					{/* <PokeEvoSlot
						name={evolutionData["chain"]["species"]["name"]}
						current={speciesData["name"]}
					/>
					<img className="arrow" src={arrow} alt="" />
					<PokeEvoArrow
						data={evolutionData["chain"]["evolves_to"][0]}
					/>
					<PokeEvoSlot
						name={
							evolutionData["chain"]["evolves_to"][0]["species"][
								"name"
							]
						}
						current={speciesData["name"]}
					/>
					<img className="arrow" src={arrow} alt="" />
					<PokeEvoArrow
						data={
							evolutionData["chain"]["evolves_to"][0][
								"evolves_to"
							][0]
						}
					/>
					<PokeEvoSlot
						name={
							evolutionData["chain"]["evolves_to"][0][
								"evolves_to"
							][0]["species"]["name"]
						}
						current={speciesData["name"]}
					/> */}
				</>
			)}
		</div>
	);
};

export default PokeInfoEvo;
