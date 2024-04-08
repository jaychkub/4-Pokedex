import { useState, useEffect } from "react";

import normal from "./types-png/normal.png";
import fighting from "./types-png/fighting.png";
import flying from "./types-png/flying.png";
import poison from "./types-png/poison.png";
import ground from "./types-png/ground.png";
import rock from "./types-png/rock.png";
import bug from "./types-png/bug.png";
import ghost from "./types-png/ghost.png";
import steel from "./types-png/steel.png";
import fire from "./types-png/fire.png";
import water from "./types-png/water.png";
import grass from "./types-png/grass.png";
import electric from "./types-png/electric.png";
import psychic from "./types-png/psychic.png";
import ice from "./types-png/ice.png";
import dragon from "./types-png/dragon.png";
import dark from "./types-png/dark.png";
import fairy from "./types-png/fairy.png";

import bg from "./pokeitem.png";

// TODO: Chnage to switch function.
const pokemonTypes = {
	normal: normal,
	fighting: fighting,
	flying: flying,
	poison: poison,
	ground: ground,
	rock: rock,
	bug: bug,
	ghost: ghost,
	steel: steel,
	fire: fire,
	water: water,
	grass: grass,
	electric: electric,
	psychic: psychic,
	ice: ice,
	dragon: dragon,
	dark: dark,
	fairy: fairy,
};

const PokeItem = (props) => {
	const id = props.pokeId;
	const onClick = props.onClick;

	const [data, setData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				const d = await response.json();
				setData(d);
				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (!isDataLoading) {
			props.editList(props.index, { id: id, name: data["name"] });
			props.setIsPopulated(true);
		}
	}, [data, id]);

	return (
		<button
			onClick={() => onClick(id, props.index)}
			className="PokeGrid-pokemon">
			{!isDataLoading && (
				<>
					<div className="PokeGrid-pokemon-top">
						<div className="PokeGrid-pokemon-types">
							<img
								src={
									pokemonTypes[
										data["types"][0]["type"]["name"]
									]
								}
								alt=""
							/>
							<img
								src={
									data["types"].length > 1
										? pokemonTypes[
												data["types"][1]["type"]["name"]
										  ]
										: null
								}
								alt=""
							/>
						</div>
						<p>#{id}</p>
					</div>
					<img
						className="PokeGrid-pokemon-image"
						src={data["sprites"]["front_default"]}
						alt={id}
					/>
					<div className="PokeGrid-pokemon-bottom">
						<p>{data["name"]}</p>
					</div>
				</>
			)}
		</button>
	);
};

export default PokeItem;
