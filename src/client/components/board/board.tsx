import React from "@rbxts/react";
import { Frame } from "../ui/frame";
import { Cell } from "./cell";
import { numberRange } from "shared/utils/math-utils";
import { useSelector } from "@rbxts/react-reflex";
import { selectCells } from "shared/store/board/board-selectors";
import { getPieceIconFromPieceType } from "client/constants/piece-icons";
import { Piece } from "./piece";

export function Board() {
	const cells = useSelector(selectCells);

	return (
		<Frame
			size={new UDim2(0, 400, 0, 400)}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
			backgroundTransparency={1}
		>
			{numberRange(0, 63).map((index) => {
				const row = math.floor(index / 8);
				const column = index % 8;

				const color = (row + column) % 2 === 0 ? "white" : "black";

				const boardCell = cells[index];
				const cellIcon = getPieceIconFromPieceType(boardCell);

				return (
					<Cell position={new UDim2(0, column * 50, 0, (7 - row) * 50)} color={color}>
						{cellIcon !== undefined && <Piece icon={cellIcon} />}
					</Cell>
				);
			})}
		</Frame>
	);
}
