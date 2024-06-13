import React from "react";

import { useState } from "react";

import "./SearchBar.scss";

const SearchBar = (props) => {
	const toggleModal = props.toggleModal;

	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (e) => {
		const inputValue = e.target.value.replace(/\D/g, "");
		setSearchTerm(inputValue);
		props.onSearch(inputValue);
	};

	return (
		<div className="Search-Sort-Filter">
			<input
				type="text"
				placeholder="Search By ID"
				value={searchTerm}
				onChange={handleInputChange}
			/>
			{/* <button onClick={toggleModal}>Filter</button> */}
		</div>
	);
};

export default SearchBar;
