import { useRef, useState } from "react";
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
			<div className="max-w-3xl p-4 mx-auto">
				<Header />
				<div>
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
				<form className="fixed bottom-2 pt-2 pr-20 items-center space-x-2 w-[100%]">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 outline-1 bg-slate-200 p-2 rounded-lg font-medium text-blue-900 px-4 w-[30rem]"
						type="text"
						placeholder="Type somethin witty here...or don't, I ain't your boss."
					/>
					<button
						disabled={!input}
						onClick={sendMessage}
						className="bg-green-300 text-sm text-gray-600 p-3 rounded-xl hover:scale-75 transition-all duration-100 ease-in-out disabled:bg-slate-300 disabled:cursor-not-allowed px-6"
					>
						Send
					</button>
				</form>
			</div>
		</>
	);
};

export default Home;
