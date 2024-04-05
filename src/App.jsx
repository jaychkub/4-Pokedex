import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import PokeGrid from "./componets/PokeGrid/PokeGrid";

function App() {
	return (
		<div className="App">
			<Overlay />
			<PokeGrid />
			<Overlay isBottom />
		</div>
	);
}

export default App;
