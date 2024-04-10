import { runOnce } from "shared/utils/run-once";

import { initCharacterService } from "./character";

export const initPlayerServices = runOnce(async () => {
	initCharacterService();
});
