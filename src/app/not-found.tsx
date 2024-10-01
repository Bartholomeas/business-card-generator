import { type Metadata } from "next";

import { ErrorCard } from "~/components/special/error-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "404, nie znaleziono strony",
};

const NotFound = () => {
	return (
		<div className="relative mt-[-74px] flex h-screen items-center justify-center bg-background">
			<ErrorCard errorCode={404} errorMessage={"Strona, której szukasz nie istnieje."} />
		</div>
	);
};

export default NotFound;
