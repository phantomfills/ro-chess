import React from "@rbxts/react";
import { Frame } from "../ui/frame";
import { BLACK, WHITE, YELLOW } from "client/constants/board-colors";
import { Image } from "../ui/image";
import { images } from "shared/assets";

interface CellProps extends React.PropsWithChildren {
	color: "white" | "black";
	selected: boolean;
	legal: boolean;
	position: UDim2;
	onClick: () => void;
}

export function Cell({ children, color, selected, legal, position, onClick }: CellProps) {
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
			{legal && (
				<Image
					size={new UDim2(0.6, 0, 0.6, 0)}
					position={new UDim2(0.5, 0, 0.5, 0)}
					anchorPoint={new Vector2(0.5, 0.5)}
					imageTransparency={0.5}
					image={images.legal_move_circle}
				/>
			)}
			{children}
		</Frame>
	);
}
