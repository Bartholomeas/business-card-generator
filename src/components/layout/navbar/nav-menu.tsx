import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import { NavMenuLink } from "./nav-links";
import { NavSignLinks } from "./nav-sign-links";
import { menuVariants } from "./navbar.animations";
import { UserDropdown } from "./user-dropdown";

import { navLinks, routes, sidebarLinks } from "~/routes/routes";

export const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
	const { data: session } = useSession();
	const pathname = usePathname();
	const isPanel = pathname.includes(routes.panel);

	return (
		<motion.div
			variants={menuVariants}
			initial="closed"
			animate={isOpen ? "open" : "closed"}
			className="absolute inset-x-0 top-full flex origin-top flex-col gap-4 border-y-DEFAULT border-y-border bg-background p-4 pt-8 shadow-lg"
		>
			{isPanel
				? sidebarLinks.map(link => (
						<NavMenuLink
							key={`${link.label}-${link.href}`}
							text={link.label}
							href={link.href}
							icon={link.icon}
						/>
					))
				: navLinks.map(link => (
						<NavMenuLink key={`${link.label}-${link.href}`} text={link.label} href={link.href} />
					))}

			{session ? <UserDropdown /> : <NavSignLinks inMenu />}
		</motion.div>
	);
};
