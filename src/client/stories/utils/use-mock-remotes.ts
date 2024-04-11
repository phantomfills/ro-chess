import { useEffect } from "@rbxts/react";
import { producer } from "client/store/producer";
import { remotes } from "shared/store/remotes";

export function useMockRemotes() {
	useEffect(() => {
		const connections = [
			remotes.movePiece.test.onFire((from, to) => {
				producer.movePiece(from, to);
			}),
		];

		return () => {
			connections.forEach((connection) => connection());
		};
	}, []);
}
