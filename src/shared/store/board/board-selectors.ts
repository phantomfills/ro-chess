import { SharedState } from "..";

export function selectCells(state: SharedState) {
	return state.board.cells;
}

export function selectPieceAtCell(cell: number) {
	return (state: SharedState) => state.board.cells[cell];
}
