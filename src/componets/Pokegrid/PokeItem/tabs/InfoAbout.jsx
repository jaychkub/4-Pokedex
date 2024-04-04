import { useState, useEffect } from "react";

const PokeInfoAbout = (props) => {
	const id = props.pokeId;

	const [data, setData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/evolution-chain/${id}/`
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

	return (
		<div className="PokeInfo-About">
			{!isDataLoading && (
				<>
					<div>Found on Route 1 in Pokemon Red</div>
				</>
			)}
		</div>
	);
};

export default PokeInfoAbout;
