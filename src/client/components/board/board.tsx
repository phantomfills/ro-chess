import React, { useEffect, useState } from "@rbxts/react";
import { Frame } from "../ui/frame";
import { Cell } from "./cell";
import { numberRange } from "shared/utils/math-utils";
import { useSelector } from "@rbxts/react-reflex";
import { selectCells, selectPieceAtCell } from "shared/store/board/board-selectors";
import { getPieceIconFromPieceType } from "client/constants/piece-icons";
import { Piece } from "./piece";
import { remotes } from "shared/store/remotes";
import { producer } from "client/store/producer";

export function Board() {
	const cells = useSelector(selectCells);

	const [selectedCell, setSelectedCell] = useState<number | undefined>(undefined);
	const [previousSelectedCell, setPreviousSelectedCell] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (previousSelectedCell !== undefined && selectedCell !== undefined) {
			const previousSelectedPiece = producer.getState(selectPieceAtCell(previousSelectedCell));

			if (previousSelectedPiece !== undefined) {
				remotes.movePiece.fire(previousSelectedCell, selectedCell);
				setSelectedCell(undefined);
			}
		}

		setPreviousSelectedCell(selectedCell);
	}, [selectedCell]);

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
					<Cell
						position={new UDim2(0, column * 50, 0, (7 - row) * 50)}
						color={color}
						selected={selectedCell === index}
						onClick={() => setSelectedCell(index)}
					>
						{cellIcon !== undefined && <Piece icon={cellIcon} />}
					</Cell>
				);
			})}
		</Frame>
	);
}
