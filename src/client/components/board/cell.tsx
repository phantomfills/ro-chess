import React from "@rbxts/react";
import { Frame } from "../ui/frame";
import { BLACK, WHITE } from "client/constants/board-colors";

interface CellProps extends React.PropsWithChildren {
	color: "white" | "black";
	position: UDim2;
}

export function Cell({ children, color, position }: CellProps) {
	return (
		<Frame size={new UDim2(0, 50, 0, 50)} position={position} backgroundColor={color === "white" ? WHITE : BLACK}>
			{children}
		</Frame>
	);
}
