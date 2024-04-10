import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, remote, Server } from "@rbxts/remo";

export const remotes = createRemotes({
	dispatch: remote<Client, [actions: BroadcastAction[]]>(),
	start: remote<Server, []>(),
});
