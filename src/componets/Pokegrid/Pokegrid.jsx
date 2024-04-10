import React, { useEffect, useRef, useState } from "react";

import "./PokeGrid.scss";

import PokeItem from "./PokeItem/PokeItem";
import PokeInfo from "./PokeItem/PokeInfo";

const PokeGrid = (props) => {
	const sortedList = props.sortedList;

	const [pokeInfoId, setPokeInfoId] = useState(1);
	const [pokeInfoIndex, setPokeInfoIndex] = useState(-1);

	const handlePokeItem = (id, index) => {
		setPokeInfoId(id);
		setPokeInfoIndex(index);
	};

	return (
		<div className="PokeGrid-grid">
			<PokeInfo
				pokeId={pokeInfoId}
				pokeIndex={pokeInfoIndex}
				searchTerm={props.searchTerm}
			/>
			{sortedList.map((item, index) => (
				<PokeItem
					key={index}
					index={index}
					pokeId={item["id"]}
					onClick={handlePokeItem}
				/>
			))}
		</div>
	);
};

export default PokeGrid;
