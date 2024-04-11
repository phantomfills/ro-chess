import { producer } from "server/store/producer";
import { remotes } from "shared/store/remotes";

export function initBoardRemotesService() {
	remotes.movePiece.connect((_, from, to) => {
		producer.movePiece(from, to);
	});
}
