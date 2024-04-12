export type Piece = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceColor = "white" | "black";
export type PieceType = `${PieceColor}-${Piece}`;

export function getPieceIsWhite(piece: PieceType) {
	return ["white-pawn", "white-rook", "white-knight", "white-bishop", "white-queen", "white-king"].includes(piece);
}

export function getPieceIsBlack(piece: PieceType) {
	return ["black-pawn", "black-rook", "black-knight", "black-bishop", "black-queen", "black-king"].includes(piece);
}
