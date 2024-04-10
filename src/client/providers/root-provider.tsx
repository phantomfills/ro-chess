import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { producer } from "client/store/producer";

interface RootProviderProps extends React.PropsWithChildren {}

export function RootProvider({ children }: RootProviderProps) {
	return <ReflexProvider producer={producer}>{children}</ReflexProvider>;
}
