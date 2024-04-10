import { useEffect, useState } from "react";
import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import PokeGrid from "./componets/PokeGrid/PokeGrid";
import SearchBar from "./componets/SearchBar/SearchBar";
import SortModal from "./componets/SortModal/SortModal";

function App() {
	// const [pokeList, setPokeList] = useState([]);
	// const [isPopulated, setIsPopulated] = useState(false);
	// const [sortedList, setSortedList] = useState([]);

	// const [isModalDisplayed, setIsModalDisplayed] = useState(false);
	// const [searchTerm, setSearchTerm] = useState("");

	// const toggleModal = () => {
	// 	setIsModalDisplayed((prevState) => !prevState);
	// };

	// const populateList = (index, newValue) => {
	// 	if (!isPopulated) {
	// 		setPokeList((prevItems) => {
	// 			const newPokes = [...prevItems];
	// 			newPokes[index] = newValue;
	// 			return newPokes;
	// 		});
	// 	}
	// };

	// const sortByName = () => {
	// 	if (isPopulated) {
	// 		const sortedPokes = [...pokeList].sort((a, b) => {
	// 			const nameA = (a["name"] || "").toUpperCase();
	// 			const nameB = (b["name"] || "").toUpperCase();
	// 			if (nameA < nameB) return -1;
	// 			if (nameA > nameB) return 1;
	// 			return 0;
	// 		});
	// 		setSortedList(sortedPokes);
	// 	} else console.log("List not populated yet");
	// };

	// const sortByNameReverse = () => {
	// 	if (isPopulated) {
	// 		const sortedPokes = [...pokeList].sort((a, b) => {
	// 			const nameA = (a["name"] || "").toUpperCase();
	// 			const nameB = (b["name"] || "").toUpperCase();
	// 			if (nameA < nameB) return -1;
	// 			if (nameA > nameB) return 1;
	// 			return 0;
	// 		});
	// 		sortedPokes.reverse();
	// 		setSortedList(sortedPokes);
	// 	} else console.log("List not populated yet");
	// };

	// const handleSearch = (term) => {
	// 	setSearchTerm(term);
	// };

	// useEffect(() => {
	// 	const pokeItems = [];
	// 	for (let i = 1; i <= 160; i++) {
	// 		pokeItems.push({ id: i });
	// 	}
	// 	setPokeList(pokeItems);
	// 	setSortedList(pokeItems);
	// }, []);

	// useEffect(() => {
	// 	if (isPopulated) {
	// 		setSortedList(
	// 			[...pokeList].filter((item) => {
	// 				return item["name"]
	// 					.toUpperCase()
	// 					.includes(searchTerm.toUpperCase());
	// 			})
	// 		);
	// 	}
	// }, [searchTerm]);

	// useEffect(() => {
	// 	console.log("CHANGEY CHANGE CHANGE");
	// }, [pokeList]);

	const [pokeList, setPokeList] = useState([]);
	const [sortedList, setSortedList] = useState([]);

	const [isModalDisplayed, setIsModalDisplayed] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const toggleModal = () => {
		setIsModalDisplayed((prevState) => !prevState);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	useEffect(() => {
		let pokeItems = [];
		for (let i = 1; i <= 151; i++) {
			pokeItems.push({ id: i });
		}
		setPokeList(pokeItems);
	}, []);

	useEffect(() => {
		setSortedList(pokeList);
	}, [pokeList]);

	useEffect(() => {
		setSortedList(
			[...pokeList].filter((item) => {
				return item["id"].toString().includes(searchTerm || "");
			})
		);
	}, [searchTerm]);

	return (
		<div className="App">
			<SortModal
				isDisplayed={isModalDisplayed}
				toggleModal={toggleModal}
			/>
			<SearchBar toggleModal={toggleModal} onSearch={handleSearch} />
			<Overlay />
			<PokeGrid sortedList={sortedList} searchTerm={searchTerm} />
			<Overlay isBottom />
		</div>
	);
}

export default App;
