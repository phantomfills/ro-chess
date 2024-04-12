interface Images {
	pieces: {
		white: {
			pawn: string;
			rook: string;
			knight: string;
			bishop: string;
			queen: string;
			king: string;
		};
		black: {
			pawn: string;
			rook: string;
			knight: string;
			bishop: string;
			queen: string;
			king: string;
		};
	};
	legal_move_circle: string;
}

export declare const images: Images;
