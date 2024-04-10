import React from "@rbxts/react";
import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Board } from "client/components/board";
import { producer } from "client/store/producer";
import { ReflexProvider } from "@rbxts/react-reflex";

export = hoarcekat(() => {
	return (
		<ReflexProvider producer={producer}>
			<Board />
		</ReflexProvider>
	);
});
