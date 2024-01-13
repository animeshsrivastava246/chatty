import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
	const [user] = useAuthState(auth);
	return (
		<header className="z-10 flex items-center justify-between p-5 sticky top-0 shadow-lg mt-0 bg-slate-800">
			<div className="text-5xl font-bold font-serif text-yellow-500">
				Chatty 007
			</div>
			<div
				className="flex items-center cursor-pointer p-0.5 font-bold font-serif text-slate-100"
				title="Log Out"
				onClick={() => auth.signOut()}
			>
				<img
					className="h-12 w-12 rounded-full"
					src={user?.photoURL}
					alt="IMG"
				/>
				{user.displayName}
			</div>
		</header>
	);
};

export default Header;
