import { producer } from "server/store/producer";
import { selectLegalMovesWithoutCheckForCell } from "shared/store/board/board-selectors";
import { remotes } from "shared/store/remotes";

export function initBoardRemotesService() {
	remotes.movePiece.connect((_, from, to) => {
		const legalMoves = producer.getState(selectLegalMovesWithoutCheckForCell(from));
		if (!legalMoves.includes(to)) return;

		producer.movePiece(from, to);
	});
}
