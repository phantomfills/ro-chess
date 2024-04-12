import { getPieceIsBlack } from "shared/constants/piece";
import { SharedState } from "..";

export function selectCells(state: SharedState) {
	return state.board.cells;
}

export function selectPieceAtCell(cell: number) {
	return (state: SharedState) => state.board.cells[cell];
}

export function selectLegalMovesForCell(cell: number) {
	return (state: SharedState) => {
		const piece = state.board.cells[cell];

		switch (piece) {
			case "white-pawn": {
				const oneRowAhead = cell + 8;
				const twoRowsAhead = cell + 16;

				const pieceBlocksOneRowAhead = state.board.cells[oneRowAhead] !== undefined;
				const pieceBlocksTwoRowsAhead = state.board.cells[twoRowsAhead] !== undefined;

				const oneRowAheadIsInBounds = oneRowAhead < 64;
				const twoRowsAheadIsInBounds = twoRowsAhead < 64;

				const oneRowAheadIsAvailable = oneRowAheadIsInBounds && !pieceBlocksOneRowAhead;
				const twoRowsAheadIsAvailable = twoRowsAheadIsInBounds && !pieceBlocksTwoRowsAhead;

				const isOnSecondRow = cell > 7 && cell < 16;
				if (isOnSecondRow) return [oneRowAheadIsAvailable && cell + 8, twoRowsAheadIsAvailable && cell + 16];
				return [!pieceBlocksOneRowAhead && cell + 8];
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
			default: {
				return [];
			}
		}
	};
}
