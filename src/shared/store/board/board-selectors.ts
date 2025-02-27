import { getPieceIsBlack, getPieceIsWhite } from "shared/constants/piece";
import { SharedState } from "..";
import { numberRange } from "shared/utils/math-utils";

export function selectCells(state: SharedState) {
	return state.board.cells;
}

export function selectPieceAtCell(cell: number) {
	return (state: SharedState) => state.board.cells[cell];
}

function getLinearMoves(
	state: SharedState,
	startRow: number,
	startCol: number,
	rowOffset: number,
	colOffset: number,
	isPieceBlack: boolean,
) {
	const moves = [];

	for (let offset = 1; offset < 8; offset++) {
		const row = startRow + rowOffset * offset;
		const col = startCol + colOffset * offset;

		if (row < 0 || row > 7 || col < 0 || col > 7) {
			break;
		}

		const move = row * 8 + col;
		const targetPiece = state.board.cells[move];

		if (targetPiece !== false) {
			if (isPieceBlack ? !getPieceIsBlack(targetPiece) : getPieceIsBlack(targetPiece)) {
				moves.push({ row, col });
			}
			break;
		}

		moves.push({ row, col });
	}

	return moves;
}

function getKingMoves(state: SharedState, startRow: number, startCol: number, isPieceBlack: boolean) {
	const directions = [
		{ row: -1, col: -1 },
		{ row: -1, col: 0 },
		{ row: -1, col: 1 },
		{ row: 0, col: -1 },
		{ row: 0, col: 1 },
		{ row: 1, col: -1 },
		{ row: 1, col: 0 },
		{ row: 1, col: 1 },
	];

	const moves = [];

	for (const { row: rowOffset, col: colOffset } of directions) {
		const row = startRow + rowOffset;
		const col = startCol + colOffset;

		if (row < 0 || row > 7 || col < 0 || col > 7) {
			continue;
		}

		const move = row * 8 + col;
		const targetPiece = state.board.cells[move];

		if (targetPiece !== false && (isPieceBlack ? !getPieceIsWhite(targetPiece) : !getPieceIsBlack(targetPiece))) {
			continue;
		}

		moves.push({ row, col });
	}

	return moves;
}

export function selectLegalMovesForCell(cell: number) {
	return (state: SharedState) => {
		const piece = state.board.cells[cell];
		const cellRow = math.floor(cell / 8);
		const cellCol = cell % 8;

		switch (piece) {
			case "white-pawn": {
				const attackingMoves = [cell + 7, cell + 9].filter((move) => {
					const piece = state.board.cells[move];
					const isLeftEdge = move % 8 === 0;
					const isRightEdge = move % 8 === 7;
					const isInvalidLeftAttack = move === cell + 7 && isRightEdge;
					const isInvalidRightAttack = move === cell + 9 && isLeftEdge;
					return piece !== false && getPieceIsBlack(piece) && !isInvalidLeftAttack && !isInvalidRightAttack;
				});
				const oneRowAhead = cell + 8;
				const twoRowsAhead = cell + 16;

				const pieceBlocksOneRowAhead = state.board.cells[oneRowAhead] !== false;
				const pieceBlocksTwoRowsAhead = state.board.cells[twoRowsAhead] !== false;

				const oneRowAheadIsInBounds = oneRowAhead < 64;
				const twoRowsAheadIsInBounds = twoRowsAhead < 64;

				const oneRowAheadIsAvailable = oneRowAheadIsInBounds && !pieceBlocksOneRowAhead;
				const twoRowsAheadIsAvailable =
					twoRowsAheadIsInBounds && !pieceBlocksTwoRowsAhead && !pieceBlocksOneRowAhead;

				const isOnSecondRow = cell >= 8 && cell < 16;

				const enPassantLeft = cell - 1;
				const enPassantRight = cell + 1;

				const enPassantLeftPiece = state.board.cells[enPassantLeft];
				const enPassantRightPiece = state.board.cells[enPassantRight];

				const enPassantLeftMovedTwoRows = state.board.prevCells[enPassantLeft] === false;
				const enPassantRightMovedTwoRows = state.board.prevCells[enPassantRight] === false;

				const enPassantLeftIsBlackPawn = enPassantLeftPiece === "black-pawn";
				const enPassantRightIsBlackPawn = enPassantRightPiece === "black-pawn";

				const enPassantLeftIsOnFifthRow = enPassantLeft >= 32 && enPassantLeft < 40;
				const enPassantRightIsOnFifthRow = enPassantRight >= 32 && enPassantRight < 40;

				const enPassantLeftIsAvailable =
					enPassantLeftIsBlackPawn && enPassantLeftIsOnFifthRow && enPassantLeftMovedTwoRows;
				const enPassantRightIsAvailable =
					enPassantRightIsBlackPawn && enPassantRightIsOnFifthRow && enPassantRightMovedTwoRows;

				const potentialmoves = [
					...(oneRowAheadIsAvailable ? [oneRowAhead] : []),
					...(isOnSecondRow && twoRowsAheadIsAvailable ? [twoRowsAhead] : []),
					...attackingMoves,
					...(enPassantLeftIsAvailable ? [enPassantLeft + 8] : []),
					...(enPassantRightIsAvailable ? [enPassantRight + 8] : []),
				];

				const movesInBounds = potentialmoves.filter((move) => move >= 0 && move < 64);

				return movesInBounds;
			}
			case "white-knight": {
				const moves = [
					{ row: -2, col: -1 },
					{ row: -2, col: 1 },
					{ row: -1, col: -2 },
					{ row: -1, col: 2 },
					{ row: 1, col: -2 },
					{ row: 1, col: 2 },
					{ row: 2, col: -1 },
					{ row: 2, col: 1 },
				].map(({ row, col }) => {
					const cellRow = math.floor(cell / 8);
					const cellCol = cell % 8;
					return { row: cellRow + row, col: cellCol + col };
				});

				const legalMoves = moves.filter(({ row, col }) => {
					if (row < 0 || row > 7 || col < 0 || col > 7) {
						return false;
					}

					const move = row * 8 + col;
					const targetPiece = state.board.cells[move];

					const pieceBlocks = targetPiece !== false;
					if (!pieceBlocks) return true;

					const pieceIsBlack = getPieceIsBlack(targetPiece);
					return pieceIsBlack;
				});

				return legalMoves.map(({ row, col }) => row * 8 + col);
			}
			case "white-rook": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 0, 1, false),
					...getLinearMoves(state, cellRow, cellCol, 0, -1, false),
					...getLinearMoves(state, cellRow, cellCol, 1, 0, false),
					...getLinearMoves(state, cellRow, cellCol, -1, 0, false),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-bishop": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 1, 1, false),
					...getLinearMoves(state, cellRow, cellCol, 1, -1, false),
					...getLinearMoves(state, cellRow, cellCol, -1, 1, false),
					...getLinearMoves(state, cellRow, cellCol, -1, -1, false),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-queen": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 0, 1, false),
					...getLinearMoves(state, cellRow, cellCol, 0, -1, false),
					...getLinearMoves(state, cellRow, cellCol, 1, 0, false),
					...getLinearMoves(state, cellRow, cellCol, -1, 0, false),
					...getLinearMoves(state, cellRow, cellCol, 1, 1, false),
					...getLinearMoves(state, cellRow, cellCol, 1, -1, false),
					...getLinearMoves(state, cellRow, cellCol, -1, 1, false),
					...getLinearMoves(state, cellRow, cellCol, -1, -1, false),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-king": {
				const canCastleLeft = selectCanCastle(state, "white", "left");
				const canCastleRight = selectCanCastle(state, "white", "right");

				return [
					...getKingMoves(state, cellRow, cellCol, false).map(({ row, col }) => row * 8 + col),
					...(canCastleLeft ? [cell - 2] : []),
					...(canCastleRight ? [cell + 2] : []),
				];
			}
			case "black-pawn": {
				const attackingMoves = [cell - 7, cell - 9].filter((move) => {
					const piece = state.board.cells[move];
					const isLeftEdge = move % 8 === 0;
					const isRightEdge = move % 8 === 7;
					const isInvalidLeftAttack = move === cell - 9 && isRightEdge;
					const isInvalidRightAttack = move === cell - 7 && isLeftEdge;
					return piece !== false && !getPieceIsBlack(piece) && !isInvalidLeftAttack && !isInvalidRightAttack;
				});
				const oneRowBehind = cell - 8;
				const twoRowsBehind = cell - 16;

				const pieceBlocksOneRowBehind = state.board.cells[oneRowBehind] !== false;
				const pieceBlocksTwoRowsBehind = state.board.cells[twoRowsBehind] !== false;

				const oneRowBehindIsInBounds = oneRowBehind >= 0;
				const twoRowsBehindIsInBounds = twoRowsBehind >= 0;

				const oneRowBehindIsAvailable = oneRowBehindIsInBounds && !pieceBlocksOneRowBehind;
				const twoRowsBehindIsAvailable =
					twoRowsBehindIsInBounds && !pieceBlocksTwoRowsBehind && !pieceBlocksOneRowBehind;

				const isOnSeventhRow = cell >= 48 && cell < 56;

				// add en passant
				const enPassantLeft = cell - 1;
				const enPassantRight = cell + 1;

				const enPassantLeftPiece = state.board.cells[enPassantLeft];
				const enPassantRightPiece = state.board.cells[enPassantRight];

				const enPassantLeftMovedTwoRows = state.board.prevCells[enPassantLeft] === false;
				const enPassantRightMovedTwoRows = state.board.prevCells[enPassantRight] === false;

				const enPassantLeftIsWhitePawn = enPassantLeftPiece === "white-pawn";
				const enPassantRightIsWhitePawn = enPassantRightPiece === "white-pawn";

				const enPassantLeftIsOnFourthRow = enPassantLeft >= 24 && enPassantLeft < 32;
				const enPassantRightIsOnFourthRow = enPassantRight >= 24 && enPassantRight < 32;

				const enPassantLeftIsAvailable =
					enPassantLeftIsWhitePawn && enPassantLeftIsOnFourthRow && enPassantLeftMovedTwoRows;
				const enPassantRightIsAvailable =
					enPassantRightIsWhitePawn && enPassantRightIsOnFourthRow && enPassantRightMovedTwoRows;

				const potentialmoves = [
					...(oneRowBehindIsAvailable ? [oneRowBehind] : []),
					...(isOnSeventhRow && twoRowsBehindIsAvailable ? [twoRowsBehind] : []),
					...attackingMoves,
					...(enPassantLeftIsAvailable ? [enPassantLeft - 8] : []),
					...(enPassantRightIsAvailable ? [enPassantRight - 8] : []),
				];

				const movesInBounds = potentialmoves.filter((move) => move >= 0 && move < 64);

				return movesInBounds;
			}
			case "black-knight": {
				const moves = [
					{ row: -2, col: -1 },
					{ row: -2, col: 1 },
					{ row: -1, col: -2 },
					{ row: -1, col: 2 },
					{ row: 1, col: -2 },
					{ row: 1, col: 2 },
					{ row: 2, col: -1 },
					{ row: 2, col: 1 },
				].map(({ row, col }) => {
					const cellRow = math.floor(cell / 8);
					const cellCol = cell % 8;
					return { row: cellRow + row, col: cellCol + col };
				});

				const legalMoves = moves.filter(({ row, col }) => {
					if (row < 0 || row > 7 || col < 0 || col > 7) {
						return false;
					}

					const move = row * 8 + col;
					const targetPiece = state.board.cells[move];

					const pieceBlocks = targetPiece !== false && !getPieceIsWhite(targetPiece);
					return !pieceBlocks;
				});

				return legalMoves.map(({ row, col }) => row * 8 + col);
			}
			case "black-rook": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 0, 1, true),
					...getLinearMoves(state, cellRow, cellCol, 0, -1, true),
					...getLinearMoves(state, cellRow, cellCol, 1, 0, true),
					...getLinearMoves(state, cellRow, cellCol, -1, 0, true),
				].map(({ row, col }) => row * 8 + col);
			}
			case "black-bishop": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 1, 1, true),
					...getLinearMoves(state, cellRow, cellCol, 1, -1, true),
					...getLinearMoves(state, cellRow, cellCol, -1, 1, true),
					...getLinearMoves(state, cellRow, cellCol, -1, -1, true),
				].map(({ row, col }) => row * 8 + col);
			}
			case "black-queen": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 0, 1, true),
					...getLinearMoves(state, cellRow, cellCol, 0, -1, true),
					...getLinearMoves(state, cellRow, cellCol, 1, 0, true),
					...getLinearMoves(state, cellRow, cellCol, -1, 0, true),
					...getLinearMoves(state, cellRow, cellCol, 1, 1, true),
					...getLinearMoves(state, cellRow, cellCol, 1, -1, true),
					...getLinearMoves(state, cellRow, cellCol, -1, 1, true),
					...getLinearMoves(state, cellRow, cellCol, -1, -1, true),
				].map(({ row, col }) => row * 8 + col);
			}
			case "black-king": {
				const canCastleLeft = selectCanCastle(state, "black", "left");
				const canCastleRight = selectCanCastle(state, "black", "right");

				return [
					...getKingMoves(state, cellRow, cellCol, true).map(({ row, col }) => row * 8 + col),
					...(canCastleLeft ? [cell - 2] : []),
					...(canCastleRight ? [cell + 2] : []),
				];
			}
			default: {
				return [];
			}
		}
	};
}

export function selectLegalMovesWithoutCheckForCell(cell: number) {
	return (state: SharedState) => {
		const legalMoves = selectLegalMovesForCell(cell)(state);

		return legalMoves.filter((move) => {
			const nextState = state.board.cells.map((cell) => cell);
			nextState[move] = nextState[cell];
			nextState[cell] = false;

			const piece = state.board.cells[cell];
			if (piece === false) return false;

			const isCheck = selectIsCheckPosition(getPieceIsBlack(piece) ? "black" : "white")({
				...state,
				board: { ...state.board, cells: nextState },
			});

			return !isCheck;
		});
	};
}

function selectCanCastle(state: SharedState, color: "white" | "black", side: "left" | "right") {
	const hasKingMoved = state.board.hasKingMoved[color];
	const hasRookMoved = state.board.hasRookMoved[color][side];

	if (hasKingMoved || hasRookMoved) {
		return false;
	}

	const kingPosition = color === "white" ? 4 : 60;
	const rookPosition = side === "left" ? (color === "white" ? 0 : 56) : color === "white" ? 7 : 63;
	const step = rookPosition < kingPosition ? -1 : 1;

	for (let i = kingPosition + step; i !== rookPosition; i += step) {
		if (state.board.cells[i] !== false) {
			return false;
		}
	}

	return true;
}

export function selectIsCheckPosition(color: "white" | "black") {
	return (state: SharedState) => {
		if (color === "white") {
			const blackPieceCells = numberRange(0, 63).filter((cell) => {
				const piece = state.board.cells[cell];
				return piece !== false && getPieceIsBlack(piece);
			});

			const blackPieceMoves = blackPieceCells.map((cell) => selectLegalMovesForCell(cell)(state));

			const blackMoves: number[] = [];
			blackPieceMoves.forEach((moves) => {
				moves.forEach((move) => {
					blackMoves.push(move);
				});
			});

			const whiteKingCell = state.board.cells.findIndex((piece) => piece === "white-king");
			return blackMoves.includes(whiteKingCell);
		}

		const whitePieceCells = numberRange(0, 63).filter((cell) => {
			const piece = state.board.cells[cell];
			return piece !== false && !getPieceIsBlack(piece);
		});

		const whitePieceMoves = whitePieceCells.map((cell) => selectLegalMovesForCell(cell)(state));

		const whiteMoves: number[] = [];
		whitePieceMoves.forEach((moves) => {
			moves.forEach((move) => {
				whiteMoves.push(move);
			});
		});

		const blackKingCell = state.board.cells.findIndex((piece) => piece === "black-king");
		return whiteMoves.includes(blackKingCell);
	};
}
