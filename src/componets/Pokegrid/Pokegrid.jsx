import React, { useEffect, useState } from "react";

import "./PokeGrid.scss";

import BULB from "../../assets/bulbasaur.png";

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
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://pokeapi.co/api/v2/pokemon/" + id
				);
				const d = await response.json();
				setData(d);
				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, []);

	return (
		<button onClick={() => onClick(id)} className="PokeGrid-pokemon">
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

const PokeInfoAbout = () => {
	return <div className="PokeInfo-About">ABOUT</div>;
};

const PokeInfoEvo = () => {
	return <div className="PokeInfo-Evo">Evo</div>;
};

const PokeInfoTEMP = () => {
	return <div className="PokeInfo-TEMP">TEMP</div>;
};

const PokeInfo = (props) => {
	const id = props.pokeId;

	const [data, setData] = useState();
	const [speciesData, setSpeciesData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [styles, setStyles] = useState(null);
	const [tab, setTab] = useState("ABOUT");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://pokeapi.co/api/v2/pokemon/" + id
				);
				const d = await response.json();
				setData(d);

				const speciesResponse = await fetch(
					"https://pokeapi.co/api/v2/pokemon-species/" + id
				);
				const sd = await speciesResponse.json();
				setSpeciesData(sd);

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();

		setStyles({
			gridRow: Math.ceil(id / 3) * 2 - 1,
		});

		document.getElementsByClassName("PokeGrid-info")[0].scrollIntoView({
			behavior: "smooth",
		});
	}, [id]);

	useEffect(() => {
		console.log(tab);
	}, [tab]);

	return (
		<div style={styles} className="PokeGrid-info">
			<div className="PokeGrid-info-main">
				{!isDataLoading && (
					<>
						<div className="PokeGrid-info-image">
							<img src={null} alt="" />
							<img
								src={data["sprites"]["front_default"]}
								alt=""
							/>
						</div>
						<div className="PokeGrid-info-simple">
							<div className="PokeGrid-info-simple-top">
								<p>{data["name"]}</p>
								<p>#{id}</p>
							</div>
							<p>{speciesData["genera"][7]["genus"]}</p>
							<div className="PokeGrid-info-simple-bottom">
								<p>{data["weight"] / 10}kg</p>
								<p>{data["height"] / 10}m</p>
							</div>
						</div>
					</>
				)}
			</div>
			<div className="PokeGrid-info-other">
				{!isDataLoading && (
					<>
						<div className="PokeGrid-info-TabBar">
							<button onClick={() => setTab("ABOUT")}>
								About
							</button>
							<button onClick={() => setTab("EVOLUTION")}>
								Evolution
							</button>
							<button onClick={() => setTab("TEMP")}>TEMP</button>
						</div>
						<div className="PokeGrid-info-TabInfo">
							{tab === "ABOUT" ? <PokeInfoAbout /> : null}
							{tab === "EVOLUTION" ? <PokeInfoEvo /> : null}
							{tab === "TEMP" ? <PokeInfoTEMP /> : null}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const PokeGrid = (props) => {
	const [pokeInfoId, setPokeInfoId] = useState(1);

	const handlePokeItem = (id) => {
		setPokeInfoId(id);
	};

	const pokeItems = [];
	for (let i = 1; i <= 386; i++)
		pokeItems.push(
			<PokeItem key={i} pokeId={i} onClick={handlePokeItem} />
		);

	return (
		<div className="PokeGrid-grid">
			<PokeInfo pokeId={pokeInfoId} />
			{pokeItems}
		</div>
	);
};

export default PokeGrid;
