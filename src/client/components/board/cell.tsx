import React from "@rbxts/react";
import { Frame } from "../ui/frame";

interface CellProps {
	color: "white" | "black";
	position: UDim2;
}

export function Cell({ color, position }: CellProps) {
	return (
		<Frame
			size={new UDim2(0, 50, 0, 50)}
			position={position}
			backgroundColor={color === "white" ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(0, 0, 0)}
		></Frame>
	);
}
