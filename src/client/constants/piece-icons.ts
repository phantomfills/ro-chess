import { images } from "shared/assets";
import { PieceType } from "shared/constants/piece";

export const PIECE_ICONS = {
	WHITE: {
		PAWN: images.pieces.white.pawn,
	},
};

export function getPieceIconFromPieceType(pieceType: PieceType | undefined): string | undefined {
	switch (pieceType) {
		case "white-pawn": {
			return PIECE_ICONS.WHITE.PAWN;
		}
		default: {
			return undefined;
		}
	}
}
