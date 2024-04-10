import React from "@rbxts/react";
import { Image } from "../ui/image";

interface PieceProps {
	icon: string;
}

export function Piece({ icon }: PieceProps) {
	return <Image size={new UDim2(1, 0, 1, 0)} image={icon} />;
}
