import Link from "next/link";
import { sidebarLinks } from "~/misc/routes";
import { buttonVariants } from "~/components/common/button";
import { cn } from "~/misc/utils/cn";

export const Sidebar = () => {
  return (
    <div className="mr-0 h-full pb-12 md:col-span-3 lg:col-span-2">
      <div className="flex flex-col gap-2 py-6 pr-2">
        {sidebarLinks.map(link => {
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mr-2 flex w-full flex-row justify-start gap-2 px-2",
              )}
            >
              <>
                {<link.icon size={20} />}

                {link.label}
              </>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
