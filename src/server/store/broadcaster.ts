import { createBroadcaster } from "@rbxts/reflex";
import { slices } from "shared/store";
import { remotes } from "shared/store/remotes";
import { producer } from "./producer";

const broadcaster = createBroadcaster({
	producers: slices,
	dispatch: (player, actions) => {
		remotes.dispatch.fire(player, actions);
	},
});

remotes.start.connect((player) => {
	broadcaster.start(player);
});

producer.applyMiddleware(broadcaster.middleware);
