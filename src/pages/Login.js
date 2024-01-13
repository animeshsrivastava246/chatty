import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const Login = () => {
	const signInUser = () => {
		signInWithPopup(auth, provider).catch((err) =>
			alert("An error Occured" + err.message)
		);
	};
	return (
		<div className="text-center mt-72">
			<h1 className="text-5xl font-bold font-serif text-white">Chatty 007</h1>
			<button onClick={signInUser} className="bg-blue-400 text-med font-bold text-white rounded-lg hover:scale-110 transition-all duration-100 ease-in-out p-2 mt-5">
				Sign in with Google
			</button>
		</div>
	);
};

export default Login;
