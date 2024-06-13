import { useState, useEffect } from "react";

const PokeInfoAbout = (props) => {
	const id = props.pokeId;

	const [charData, setCharData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const charRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${id}`
				);
				setCharData(await charRes.json());

				setIsDataLoading(false);

				console.log("TODO: Get char data");
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
					<p>
						{charData
							? charData["flavor_text_entries"][0]["flavor_text"]
							: "Error loading data."}
						.
					</p>
				</>
			)}
		</div>
	);
};

export default PokeInfoAbout;
