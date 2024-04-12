import { getPieceIsBlack } from "shared/constants/piece";
import { SharedState } from "..";
import { numberRange } from "shared/utils/math-utils";

export function selectCells(state: SharedState) {
	return state.board.cells;
}

export function selectPieceAtCell(cell: number) {
	return (state: SharedState) => state.board.cells[cell];
}

function getLinearMoves(state: SharedState, startRow: number, startCol: number, rowOffset: number, colOffset: number) {
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
			if (getPieceIsBlack(targetPiece)) {
				moves.push({ row, col });
			}
			break;
		}

		moves.push({ row, col });
	}

	return moves;
}

function getKingMoves(state: SharedState, startRow: number, startCol: number) {
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

		if (targetPiece !== false && !getPieceIsBlack(targetPiece)) {
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
					return piece !== false && getPieceIsBlack(piece);
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

				const potentialmoves = [
					...(oneRowAheadIsAvailable ? [oneRowAhead] : []),
					...(isOnSecondRow && twoRowsAheadIsAvailable ? [twoRowsAhead] : []),
					...attackingMoves,
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
					...getLinearMoves(state, cellRow, cellCol, 0, 1),
					...getLinearMoves(state, cellRow, cellCol, 0, -1),
					...getLinearMoves(state, cellRow, cellCol, 1, 0),
					...getLinearMoves(state, cellRow, cellCol, -1, 0),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-bishop": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 1, 1),
					...getLinearMoves(state, cellRow, cellCol, 1, -1),
					...getLinearMoves(state, cellRow, cellCol, -1, 1),
					...getLinearMoves(state, cellRow, cellCol, -1, -1),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-queen": {
				return [
					...getLinearMoves(state, cellRow, cellCol, 0, 1),
					...getLinearMoves(state, cellRow, cellCol, 0, -1),
					...getLinearMoves(state, cellRow, cellCol, 1, 0),
					...getLinearMoves(state, cellRow, cellCol, -1, 0),
					...getLinearMoves(state, cellRow, cellCol, 1, 1),
					...getLinearMoves(state, cellRow, cellCol, 1, -1),
					...getLinearMoves(state, cellRow, cellCol, -1, 1),
					...getLinearMoves(state, cellRow, cellCol, -1, -1),
				].map(({ row, col }) => row * 8 + col);
			}
			case "white-king": {
				return getKingMoves(state, cellRow, cellCol).map(({ row, col }) => row * 8 + col);
			}
			default: {
				return [];
			}
		}
	};
}
