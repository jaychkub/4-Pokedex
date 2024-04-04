import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import PokeGrid from "./componets/PokeGrid/PokeGrid";

function App() {
	return (
		<div className="App">
			<Overlay />
			<PokeGrid />
		</div>
	);
}

export default App;
