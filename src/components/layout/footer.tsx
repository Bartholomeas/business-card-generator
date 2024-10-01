import React from "react";

import Link from "next/link";

import { Heading, Text, textVariants } from "../common";

export const Footer = () => {
	return (
		<footer
			className="relative h-[600px]"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="relative -top-[100vh] bottom-0 h-[calc(100vh+600px)] w-full bg-primary">
				<div className="container sticky top-[calc(100vh-600px)] flex h-[600px] flex-col justify-end pb-4">
					<div className="grid grid-cols-1 gap-8 pt-[calc(100vh-600px)] md:grid-cols-3">
						<div className="flex flex-col gap-2">
							<Heading color={"secondary"} type="h4" size="h4">
								O nas
							</Heading>
							<Link className={textVariants({ color: "background" })} href="/o-nas">
								Kim jesteśmy
							</Link>
							<Link className={textVariants({ color: "background" })} href="/misja">
								Nasza misja
							</Link>
							<Link className={textVariants({ color: "background" })} href="/kontakt">
								Kontakt
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<Heading color={"secondary"} type="h4" size="h4">
								Usługi
							</Heading>
							<Link className={textVariants({ color: "background" })} href="/generator">
								Generator wizytówek
							</Link>
							<Link className={textVariants({ color: "background" })} href="/wizytowki-cyfrowe">
								Wizytówki cyfrowe
							</Link>
						</div>
						<div className="flex flex-col gap-2">
							<Heading color={"secondary"} type="h4" size="h4">
								Pomoc
							</Heading>
							<Link className={textVariants({ color: "background" })} href="/faq">
								Często zadawane pytania
							</Link>
							<Link className={textVariants({ color: "background" })} href="/polityka-prywatnosci">
								Polityka prywatności
							</Link>
							<Link className={textVariants({ color: "background" })} href="/regulamin">
								Regulamin
							</Link>
						</div>
					</div>
					<div className="mt-8 border-t border-gray-600 pt-4">
						<Text size={"xs"} color={"background"} align={"center"}>
							© 2024 Kwirk. Wszelkie prawa zastrzeżone.
						</Text>
					</div>
				</div>
			</div>
		</footer>
	);
};
