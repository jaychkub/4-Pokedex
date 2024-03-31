import "./App.scss";

import Overlay from "./componets/Overlay/Overlay";
import Pokegrid from "./componets/Pokegrid/Pokegrid";

function App() {
	return (
		<div className="App">
			<Overlay />
			<Pokegrid />
		</div>
	);
}

export default App;
