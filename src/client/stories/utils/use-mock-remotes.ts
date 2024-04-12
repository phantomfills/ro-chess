import { useEffect } from "@rbxts/react";
import { producer } from "client/store/producer";
import { selectLegalMovesForCell } from "shared/store/board/board-selectors";
import { remotes } from "shared/store/remotes";

export function useMockRemotes() {
	useEffect(() => {
		const connections = [
			remotes.movePiece.test.onFire((from, to) => {
				const legalMoves = producer.getState(selectLegalMovesForCell(from));
				if (!legalMoves.includes(to)) return;

				producer.movePiece(from, to);
			}),
		];

		return () => {
			connections.forEach((connection) => connection());
		};
	}, []);
}
