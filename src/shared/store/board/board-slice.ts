import { createProducer } from "@rbxts/reflex";
import { PieceType } from "shared/constants/piece";

interface BoardState {
	cells: (PieceType | false)[];
	hasKingMoved: {
		white: boolean;
		black: boolean;
	};
	hasRookMoved: {
		white: {
			left: boolean;
			right: boolean;
		};
		black: {
			left: boolean;
			right: boolean;
		};
	};
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
	hasKingMoved: {
		white: false,
		black: false,
	},
	hasRookMoved: {
		white: {
			left: false,
			right: false,
		},
		black: {
			left: false,
			right: false,
		},
	},
};

export const boardSlice = createProducer(initialState, {
	movePiece: (state, from: number, to: number) => {
		let hasKingMoved = state.hasKingMoved;
		const hasRookMoved = state.hasRookMoved;

		const cells = [...state.cells];

		const piece = cells[from];
		if (piece === false) {
			return state;
		}

		if (piece === "white-king" && !hasKingMoved.white) {
			hasKingMoved = { ...hasKingMoved, white: true };
		} else if (piece === "black-king" && !hasKingMoved.black) {
			hasKingMoved = { ...hasKingMoved, black: true };
		}

		if (piece === "white-rook" && from === 0 && !state.hasRookMoved.white.left) {
			hasRookMoved.white.left = true;
		} else if (piece === "white-rook" && from === 7 && !state.hasRookMoved.white.right) {
			hasRookMoved.white.right = true;
		} else if (piece === "black-rook" && from === 56 && !state.hasRookMoved.black.left) {
			hasRookMoved.black.left = true;
		} else if (piece === "black-rook" && from === 63 && !state.hasRookMoved.black.right) {
			hasRookMoved.black.right = true;
		}

		const shouldPromoteToWhiteQueen = piece === "white-pawn" && to > 55;
		const shouldPromoteToBlackQueen = piece === "black-pawn" && to < 8;

		cells[to] = shouldPromoteToWhiteQueen ? "white-queen" : shouldPromoteToBlackQueen ? "black-queen" : cells[from];
		cells[from] = false;

		// if the king has moved more than one square, it's a castle
		if (piece === "white-king" && to - from === 2) {
			cells[7] = false;
			cells[5] = "white-rook";
		} else if (piece === "white-king" && to - from === -2) {
			cells[0] = false;
			cells[3] = "white-rook";
		} else if (piece === "black-king" && to - from === 2) {
			cells[63] = false;
			cells[61] = "black-rook";
		} else if (piece === "black-king" && to - from === -2) {
			cells[56] = false;
			cells[59] = "black-rook";
		}

		return { cells, hasKingMoved, hasRookMoved };
	},
});
