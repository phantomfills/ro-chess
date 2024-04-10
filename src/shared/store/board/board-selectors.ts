import { SharedState } from "..";

export function selectCells(state: SharedState) {
	return state.board.cells;
}
