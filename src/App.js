import Home from "./pages/Home";
import Login from "./pages/Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
	const [user] = useAuthState(auth);
	return (
		<>
			<div className="bg-gray-500">{!user ? <Login /> : <Home />}</div>
		</>
	);
}

export default App;
