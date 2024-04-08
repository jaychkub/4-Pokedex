import React from "react";

import "./SearchBar.scss";

const SearchBar = (props) => {
	const toggleModal = props.toggleModal;

	return (
		<div className="Search-Sort-Filter">
			<input type="text" />
			<button onClick={toggleModal}>Filter</button>
		</div>
	);
};

export default SearchBar;
