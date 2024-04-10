import { combineProducers, InferState } from "@rbxts/reflex";
import { slices } from "shared/store";

export type RootState = InferState<typeof producer>;

export const producer = combineProducers({
	...slices,
});
