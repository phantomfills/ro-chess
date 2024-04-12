import { producer } from "server/store/producer";
import { selectLegalMovesForCell } from "shared/store/board/board-selectors";
import { remotes } from "shared/store/remotes";

export function initBoardRemotesService() {
	remotes.movePiece.connect((_, from, to) => {
		const legalMoves = producer.getState(selectLegalMovesForCell(from));
		if (!legalMoves.includes(to)) return;

		producer.movePiece(from, to);
	});
}
