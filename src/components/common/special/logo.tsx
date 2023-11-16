import Image from "next/image";
import Link from "next/link";
import { routes } from "~/misc/routes";
import { cn } from "~/misc/utils/cn";

interface Props {
  withLink?: boolean;
  withText?: boolean;
  flexColumn?: boolean;
}

export const Logo = ({
  withLink = false,
  withText = false,
  flexColumn = false,
}: Props) => {
  if (withLink)
    return (
      <Link href={routes.home}>
        <div
          className={cn("flex flex-row flex-nowrap items-center gap-2", {
            "flex-col": flexColumn,
          })}
        >
          <Image
            src={"/logo.svg"}
            alt="Logo"
            height={14}
            width={14}
            className="object-contain"
          />
          {withText && <p className="font-bold text-textPrimary">Kwirk</p>}
        </div>
      </Link>
    );

  return (
    <div
      className={cn("flex flex-row flex-nowrap items-center gap-2", {
        "flex-col": flexColumn,
      })}
    >
      <Image
        src={"/logo.svg"}
        alt="Logo"
        height={20}
        width={20}
        className="object-contain"
      />
      {withText && <p className="font-bold text-textPrimary">Kwirk</p>}
    </div>
  );
};
