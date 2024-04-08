import React, { useEffect, useRef, useState } from "react";

import "./PokeGrid.scss";

import PokeItem from "./PokeItem/PokeItem";
import PokeInfo from "./PokeItem/PokeInfo";

import BULB from "../../assets/bulbasaur.png";

const PokeGrid = (props) => {
	const sortedList = props.sortedList;

	const [pokeInfoId, setPokeInfoId] = useState(1);
	const [pokeInfoIndex, setPokeInfoIndex] = useState(1);

	const handlePokeItem = (id, index) => {
		setPokeInfoId(id);
		setPokeInfoIndex(index);
	};

	return (
		<div className="PokeGrid-grid">
			<PokeInfo pokeId={pokeInfoId} pokeIndex={pokeInfoIndex} />
			{/* {pokeItems} */}
			{sortedList.map((item, index) => (
				<PokeItem
					key={index}
					pokeId={item["id"]}
					index={index}
					onClick={handlePokeItem}
					editList={props.editList}
					setIsPopulated={props.setIsPopulated}
				/>
			))}
		</div>
	);
};

export default PokeGrid;
