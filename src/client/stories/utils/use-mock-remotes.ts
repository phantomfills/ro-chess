import { useEffect } from "@rbxts/react";
import { producer } from "client/store/producer";
import { selectLegalMovesWithoutCheckForCell } from "shared/store/board/board-selectors";
import { remotes } from "shared/store/remotes";

export function useMockRemotes() {
	useEffect(() => {
		const connections = [
			remotes.movePiece.test.onFire((from, to) => {
				const legalMoves = producer.getState(selectLegalMovesWithoutCheckForCell(from));
				if (!legalMoves.includes(to)) return;

				producer.movePiece(from, to);
			}),
		];

		return () => {
			connections.forEach((connection) => connection());
		};
	}, []);
}
