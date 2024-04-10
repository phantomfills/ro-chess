import { createProducer } from "@rbxts/reflex";
import { PieceType } from "shared/constants/piece";

interface BoardState {
	cells: (PieceType | undefined)[];
}

const initialState: BoardState = {
	cells: [
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
		"white-pawn",
	],
};

export const boardSlice = createProducer(initialState, {});
