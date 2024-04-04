import React, { useEffect, useRef, useState } from "react";

import "./PokeGrid.scss";

import PokeItem from "./PokeItem/PokeItem";
import PokeInfo from "./PokeItem/PokeInfo";

import BULB from "../../assets/bulbasaur.png";

const PokeGrid = (props) => {
	const pokeInfoRef = useRef(null);

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
			<PokeInfo ref={pokeInfoRef} pokeId={pokeInfoId} />
			{pokeItems}
		</div>
	);
};

export default PokeGrid;
