import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { Message } from "../components/Message";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	addDoc,
	collection,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
const Home = () => {
	const [input, setInput] = useState("");
	const [user] = useAuthState(auth);
	const lastMessageDiv = useRef(null);
	const sendMessage = (e) => {
		e.preventDefault();
		addDoc(collection(db, "chatty"), {
			sender: user?.displayName,
			message: input,
			time: serverTimestamp(),
		})
			.then(() => {
				setInput("");
				scrollToBottom();
			})
			.catch((err) => alert("An error occured " + err));
	};

	const [messages] = useCollection(
		query(collection(db, "chatty"), orderBy("time", "asc"))
	);

	const scrollToBottom = () => {
		lastMessageDiv.current.scrollIntoView({
			behaviour: "smooth",
		});
	};

	return (
		<>
			<div className="max-w-4xl p-2 mx-auto mt-1">
				<Header />
				<div className="">
					{messages?.docs?.map((message) => (
						<Message
							key={message?.id}
							sender={message?.data().sender}
							message={message?.data().message}
							time={message?.data().time?.toDate().getTime()}
						/>
					))}
				</div>
				<div ref={lastMessageDiv} className="mb-20" />
				<form className="fixed bottom-5 items-center space-x-2">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 outline-1 bg-slate-200 p-2 rounded-lg font-medium text-blue-900"
						type="text"
						placeholder="Type something witty here... or don't, I'm not your boss."
					/>
					<button
						disabled={!input}
						onClick={sendMessage}
						className="bg-green-300 text-sm text-gray-600 p-3 rounded-xl hover:scale-75 transition-all duration-100 ease-in-out disabled:bg-slate-300 disabled:cursor-not-allowed"
					>
						Send
					</button>
				</form>
			</div>
		</>
	);
};

export default Home;
