import React from "react";

import "./Overlay.scss";

const Overlay = () => {
	return (
		<div className="Overlay-main">
			<div className="Overlay-red top">
				<div className="Overlay-gray-circle bottom center-h">
					<div className="Overlay-black-circle bottom center-h"></div>
				</div>
			</div>
			<div className="Overlay-red bottom">
				<div className="Overlay-gray-circle top center-h flip">
					<div className="Overlay-black-circle top center-h"></div>
				</div>
			</div>
		</div>
	);
};

export default Overlay;
