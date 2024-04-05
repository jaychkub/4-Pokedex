import React from "react";

import "./Overlay.scss";

import overlay from "./overlay.png";

const Overlay = (props) => {
	const isBottom = props.isBottom;

	return (
		<img
			className={isBottom ? "Overlay-bottom" : "Overlay"}
			src={overlay}
			alt=""
		/>
	);
};

export default Overlay;
