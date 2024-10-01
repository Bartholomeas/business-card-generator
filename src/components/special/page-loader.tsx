import React from "react";

import { Text } from "~/components/common";
import { Backlight } from "~/components/special/backlight";

export const PageLoader = () => (
	<div className={"fixed inset-0 flex size-full items-center justify-center bg-background"}>
		<Backlight transition={{ duration: 6 }} />
		<Backlight transition={{ duration: 3 }} size={"sm"} color={"white"} rotate={"reversed"} />
		<Text
			size={"h1"}
			color={"secondary"}
			weight={"bold"}
			className="z-50 inline-flex h-[250px]  w-[400px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
		>
			Trwa ładowanie..
		</Text>
	</div>
);
