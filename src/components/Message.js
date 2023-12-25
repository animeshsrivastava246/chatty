import moment from "moment";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Message = ({ sender, message, time }) => {
	const [user] = useAuthState(auth);
	return (
		<>
			<div
				className={`${
					sender === user?.displayName
						? "overflow-hidden relative w-fit min-w-[90px] rounded-tr-none bg-yellow-500 p-1 rounded-lg mt-5 ml-auto"
						: "overflow-hidden relative w-fit min-w-[90px] rounded-tl-none bg-gray-400 p-1 rounded-lg mt-5"
				}`}
			>
				<p className="text-sm absolute -top-4 ">
					{sender !== user?.displayName
						? sender.length < 16
							? sender
							: sender.split(" ")[0]
						: ""}
				</p>
				<p className="px-1 text-xl">{message}</p>
				<p className="text-xs text-right font-bold text-gray-500">
					{moment(time).format("LT")}
				</p>
			</div>
		</>
	);
};
