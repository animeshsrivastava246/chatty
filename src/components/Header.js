import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
	const [user] = useAuthState(auth);
	return (
		<header className="flex items-center justify-between p-5 sticky top-0 shadow-lg mt-1 bg-gray-500">
			<div className="text-5xl font-bold font-serif text-yellow-500">
				Chatty 007
			</div>
			<div className="flex items-center cursor-pointer p-0.5 font-bold font-serif" onClick={() => auth.signOut()}>
				<img
					className="h-12 w-12 rounded-full"
					src={user?.photoURL}
					alt="IMG"
					title="Log Out"
				/>
				{user.displayName}
			</div>
		</header>
	);
};

export default Header;
