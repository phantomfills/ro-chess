import { images } from "shared/assets";
import { PieceType } from "shared/constants/piece";

export const PIECE_ICONS = {
	WHITE: {
		PAWN: images.pieces.white.pawn,
		ROOK: images.pieces.white.rook,
		KNIGHT: images.pieces.white.knight,
		BISHOP: images.pieces.white.bishop,
		QUEEN: images.pieces.white.queen,
		KING: images.pieces.white.king,
	},
	BLACK: {
		PAWN: images.pieces.black.pawn,
		ROOK: images.pieces.black.rook,
		KNIGHT: images.pieces.black.knight,
		BISHOP: images.pieces.black.bishop,
		QUEEN: images.pieces.black.queen,
		KING: images.pieces.black.king,
	},
};

export function getPieceIconFromPieceType(pieceType: PieceType | false): string | undefined {
	switch (pieceType) {
		case "white-pawn": {
			return PIECE_ICONS.WHITE.PAWN;
		}
		case "white-rook": {
			return PIECE_ICONS.WHITE.ROOK;
		}
		case "white-knight": {
			return PIECE_ICONS.WHITE.KNIGHT;
		}
		case "white-bishop": {
			return PIECE_ICONS.WHITE.BISHOP;
		}
		case "white-queen": {
			return PIECE_ICONS.WHITE.QUEEN;
		}
		case "white-king": {
			return PIECE_ICONS.WHITE.KING;
		}
		case "black-pawn": {
			return PIECE_ICONS.BLACK.PAWN;
		}
		case "black-rook": {
			return PIECE_ICONS.BLACK.ROOK;
		}
		case "black-knight": {
			return PIECE_ICONS.BLACK.KNIGHT;
		}
		case "black-bishop": {
			return PIECE_ICONS.BLACK.BISHOP;
		}
		case "black-queen": {
			return PIECE_ICONS.BLACK.QUEEN;
		}
		case "black-king": {
			return PIECE_ICONS.BLACK.KING;
		}
		default: {
			return undefined;
		}
	}
}
