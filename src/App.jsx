import { useEffect, useState } from "react";
import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import PokeGrid from "./componets/PokeGrid/PokeGrid";
import SearchBar from "./componets/SearchBar/SearchBar";
import SortModal from "./componets/SortModal/SortModal";

function App() {
	const [sortedList, setSortedList] = useState([]);
	const [isPopulated, setIsPopulated] = useState(false);
	const [isModalDisplayed, setIsModalDisplayed] = useState(false);

	const toggleModal = () => {
		setIsModalDisplayed((prevState) => !prevState);
	};

	const editList = (index, newValue) => {
		setSortedList((prevItems) => {
			const newPokes = [...prevItems];
			newPokes[index] = newValue;
			return newPokes;
		});
	};

	const sortByName = () => {
		if (isPopulated) {
			const sortedPokes = [...sortedList].sort((a, b) => {
				const nameA = (a["name"] || "").toUpperCase();
				const nameB = (b["name"] || "").toUpperCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
			setSortedList(sortedPokes);
		} else console.log("List not populated yet");
	};

	const sortByNameReverse = () => {
		if (isPopulated) {
			const sortedPokes = [...sortedList].sort((a, b) => {
				const nameA = (a["name"] || "").toUpperCase();
				const nameB = (b["name"] || "").toUpperCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
			sortedPokes.reverse();
			setSortedList(sortedPokes);
		} else console.log("List not populated yet");
	};

	useEffect(() => {
		const pokeItems = [];
		for (let i = 1; i <= 160; i++) {
			pokeItems.push({ id: i });
		}
		setSortedList(pokeItems);
	}, []);

	useEffect(() => {
		console.log(sortedList);
	}, [sortedList]);

	return (
		<div className="App">
			<SortModal
				isDisplayed={isModalDisplayed}
				toggleModal={toggleModal}
				sortListAZ={sortByName}
				sortListZA={sortByNameReverse}
			/>
			<SearchBar toggleModal={toggleModal} />
			<Overlay />
			<PokeGrid
				sortedList={sortedList}
				setSortedList={setSortedList}
				editList={editList}
				setIsPopulated={setIsPopulated}
			/>
			<Overlay isBottom />
		</div>
	);
}

export default App;
