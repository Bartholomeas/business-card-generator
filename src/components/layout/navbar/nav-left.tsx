"use client";

import { usePathname } from "next/navigation";

import { navLinks, routes } from "~/routes/routes";

import { Logo } from "~/components/special/logo";

import { NavLink } from "./nav-links";


export const NavLeft = () => {
	const pathname = usePathname();
	const isPanel = pathname.includes(routes.panel);

	return (
		<div className="flex items-center gap-6">
			<Logo withLink withText />
			{isPanel
				? null
				: navLinks.map(link => (
						<NavLink key={`${link.label}-${link.href}`} text={link.label} href={link.href} />
					))}
		</div>
	);
};
