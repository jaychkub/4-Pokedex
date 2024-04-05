import { useState, useEffect } from "react";

import PokeInfoAbout from "./tabs/InfoAbout";
import PokeInfoEvo from "./tabs/InfoEvo";
import PokeInfoStat from "./tabs/InfoStat";

import PokePoly from "./POKESTATS.png";

const PokeInfo = (props) => {
	const id = props.pokeId;

	const [pokemonData, setPokemonData] = useState();
	const [speciesData, setSpeciesData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [styles, setStyles] = useState(null);
	const [tab, setTab] = useState("ABOUT");

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const pokemonRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				setPokemonData(await pokemonRes.json());

				const speciesRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${id}`
				);
				setSpeciesData(await speciesRes.json());

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();

		setStyles({
			gridRow: Math.ceil(id / 3) * 2 - 1,
		});
	}, [id]);

	useEffect(() => {
		document.getElementsByClassName("PokeGrid-info")[0].scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, [styles]);

	return (
		<div style={styles} className="PokeGrid-info">
			<div className="PokeGrid-info-main">
				{!isDataLoading && (
					<>
						<audio src={pokemonData["cries"]["latest"]} autoPlay />
						<div className="PokeGrid-info-image">
							<img
								src={pokemonData["sprites"]["front_default"]}
								alt=""
							/>
						</div>
						<div className="PokeGrid-info-simple">
							<div className="PokeGrid-info-simple-top">
								<p>{pokemonData["name"]}</p>
								<p>#{id}</p>
							</div>
							<p>{speciesData["genera"][7]["genus"]}</p>
							<div className="PokeGrid-info-simple-bottom">
								<p>{pokemonData["weight"] / 10}kg</p>
								<p>{pokemonData["height"] / 10}m</p>
							</div>
						</div>
					</>
				)}
			</div>
			<div className="PokeGrid-info-other">
				{!isDataLoading && (
					<>
						<ul className="PokeGrid-info-TabBar">
							<li>
								<button onClick={() => setTab("ABOUT")}>
									About
								</button>
							</li>
							<li>
								<button onClick={() => setTab("EVOLUTION")}>
									Evolution
								</button>
							</li>
							<li>
								<button onClick={() => setTab("STAT")}>
									Stats
								</button>
							</li>
						</ul>
						<div className="PokeGrid-info-TabInfo">
							{tab === "ABOUT" ? (
								<PokeInfoAbout pokeId={id} />
							) : (
								<></>
							)}
							{tab === "EVOLUTION" ? (
								<PokeInfoEvo pokeId={id} />
							) : (
								<></>
							)}
							{tab === "STAT" ? (
								<PokeInfoStat pokeId={id} />
							) : (
								<></>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default PokeInfo;
