import { runOnce } from "shared/utils/run-once";
import { initBoardRemotesService } from "./remotes";

export const initBoardServices = runOnce(() => {
	initBoardRemotesService();
});
