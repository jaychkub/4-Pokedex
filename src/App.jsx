import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import PokeGrid from "./componets/PokeGrid/PokeGrid";
import PokePage from "./pages/PokePage/PokePage";

function App() {
	return (
		<div className="App">
			<PokeGrid />
			{/* <PokePage /> */}
			<Overlay />
		</div>
	);
}

export default App;
