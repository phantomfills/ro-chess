import React from "@rbxts/react";
import { Frame } from "../ui/frame";
import { BLACK, WHITE, YELLOW } from "client/constants/board-colors";

interface CellProps extends React.PropsWithChildren {
	color: "white" | "black";
	selected: boolean;
	position: UDim2;
	onClick: () => void;
}

export function Cell({ children, color, selected, position, onClick }: CellProps) {
	return (
		<Frame
			size={new UDim2(0, 50, 0, 50)}
			position={position}
			backgroundColor={selected ? YELLOW : color === "white" ? WHITE : BLACK}
		>
			<textbutton
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				Text=""
				Event={{ MouseButton1Click: onClick }}
			/>
			{children}
		</Frame>
	);
}
