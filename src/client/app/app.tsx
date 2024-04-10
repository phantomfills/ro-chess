import React from "@rbxts/react";
import { Board } from "client/components/board";
import { Layer } from "client/components/ui/layer";

export function App() {
	return (
		<Layer>
			<Board />
		</Layer>
	);
}
