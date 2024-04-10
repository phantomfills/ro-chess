import { CombineStates } from "@rbxts/reflex";
import { boardSlice } from "./board/board-slice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	board: boardSlice,
};
