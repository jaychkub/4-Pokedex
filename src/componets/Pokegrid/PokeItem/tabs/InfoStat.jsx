import { useState, useEffect, useRef } from "react";

const polyOffs = [50, 100, 150, 200];

import poly from "../POKESTATS.png";
import labels from "../pokelabels.png";

const PokeInfoStat = (props) => {
	const id = props.pokeId;

	const canvasRef = useRef(null);

	const [pokemonData, setPokemonData] = useState();
	const [isDataLoading, setIsDataLoading] = useState(true);

	useEffect(() => {
		setIsDataLoading(true);
		const fetchData = async () => {
			try {
				const pokemonRes = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);
				setPokemonData(await pokemonRes.json());

				setIsDataLoading(false);
			} catch (error) {
				console.error("Error: ", error);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		const centerX = canvas?.width / 2;
		const centerY = canvas?.height / 2;

		if (!isDataLoading) {
			ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

			ctx.strokeStyle = "rgba(0, 0, 255, .4)";
			ctx?.beginPath();

			for (let i = 0; i <= 5; i++) {
				const angle = (i * 2 * Math.PI) / 6;
				ctx?.lineTo(
					centerX +
						(pokemonData["stats"][i]["base_stat"] / 3) *
							Math.cos(angle),
					centerY +
						(pokemonData["stats"][i]["base_stat"] / 3) *
							Math.sin(angle)
				);

				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = "white";
				ctx?.fillText(
					pokemonData["stats"][i]["base_stat"],
					centerX +
						((pokemonData["stats"][i]["base_stat"] + 40) / 3) *
							Math.cos(angle),
					centerY +
						((pokemonData["stats"][i]["base_stat"] + 40) / 3) *
							Math.sin(angle)
				);
			}

			ctx?.closePath();
			ctx.fillStyle = "rgba(0, 0, 255, .4)";
			ctx.fill();
			ctx?.stroke();
		}
	});

	return (
		<div className="PokeInfo-TEMP">
			{!isDataLoading && (
				<>
					<img className="labels" src={labels} alt="" />
					<img src={poly} alt="" />

					<canvas ref={canvasRef} width={170} height={147.2}></canvas>
				</>
			)}
		</div>
	);
};

export default PokeInfoStat;
