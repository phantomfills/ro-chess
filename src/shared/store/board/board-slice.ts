import { createProducer } from "@rbxts/reflex";
import { PieceType } from "shared/constants/piece";

interface BoardState {
	cells: (PieceType | undefined)[];
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
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
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

		cells[to] = cells[from];
		cells[from] = undefined;

		return { ...state, cells };
	},
});
