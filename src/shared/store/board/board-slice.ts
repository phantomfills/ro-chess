import { createProducer } from "@rbxts/reflex";
import { PieceType } from "shared/constants/piece";

interface BoardState {
	cells: (PieceType | false)[];
}

const initialState: BoardState = {
	cells: [
		"white-rook",
		"white-knight",
		"white-bishop",
		"white-queen",
		"white-king",
		"white-bishop",
		"white-knight",
		"white-rook",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-pawn",
		"black-rook",
		"black-knight",
		"black-bishop",
		"black-queen",
		"black-king",
		"black-bishop",
		"black-knight",
		"black-rook",
	],
};

export const boardSlice = createProducer(initialState, {
	movePiece: (state, from: number, to: number) => {
		const cells = [...state.cells];

		const piece = cells[from];
		if (piece === false) {
			return state;
		}

		const shouldPromote = piece === "white-pawn" && to > 55;

		cells[to] = shouldPromote ? "white-queen" : cells[from];
		cells[from] = false;

		return { ...state, cells };
	},
});
