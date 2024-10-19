import React from "react";

import { Text } from "~/components/common";
import { Backlight } from "~/components/special/backlight";

export const PageLoader = () => (
	<div className={"fixed inset-0 flex size-full items-center justify-center bg-background"}>
		<Backlight transition={{ duration: 6 }} />
		<Backlight transition={{ duration: 3 }} size={"sm"} color={"white"} rotate={"reversed"} />
		<Text
			size={"h1"}
			color={"primary"}
			weight={"bold"}
			className="z-50 inline-flex h-[250px] w-[400px] animate-shimmer items-center justify-center rounded-md border border-primary-200 bg-[linear-gradient(110deg,#f0f0f0,45%,#ffffff,55%,#f0f0f0)] bg-[length:200%_100%] px-6 font-medium text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-50"
		>
			Trwa ładowanie..
		</Text>
	</div>
);
