import React from "react";

import "./SortModal.scss";

const SortModal = (props) => {
	const isDisplayed = props.isDisplayed;
	const toggleModal = props.toggleModal;

	return (
		<div className={isDisplayed ? "SortModal" : "hide"}>
			<div className="Modal-Container">
				<div className="Modal-top">
					<button onClick={toggleModal}>BACK</button>
					<button onClick={props.sortListAZ}>SORT A-Z</button>
					<button onClick={props.sortListZA}>SORT Z-A</button>
				</div>
			</div>
		</div>
	);
};

export default SortModal;
