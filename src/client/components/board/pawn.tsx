import React from "@rbxts/react";
import { PIECE_ICONS } from "client/constants/piece-icons";
import { Image } from "../ui/image";

interface PawnProps {
	color: "white" | "black";
}

export function Pawn({ color }: PawnProps) {
	return <Image size={new UDim2(1, 0, 1, 0)} image={PIECE_ICONS.WHITE.PAWN} />;
}
