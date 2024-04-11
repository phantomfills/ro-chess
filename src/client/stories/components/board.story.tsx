import React from "@rbxts/react";
import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Board } from "client/components/board";
import { useMockRemotes } from "../utils/use-mock-remotes";
import { RootProvider } from "client/providers/root-provider";

export = hoarcekat(() => {
	useMockRemotes();

	return (
		<RootProvider>
			<Board />
		</RootProvider>
	);
});
