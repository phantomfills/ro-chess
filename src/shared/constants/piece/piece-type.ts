export type Piece = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceColor = "white" | "black";
export type PieceType = `${PieceColor}-${Piece}`;
