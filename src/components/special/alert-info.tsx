import { Alert, AlertDescription, type AlertProps, AlertTitle } from "~/components/common/alert";
import { type LucideIcon } from "lucide-react";

interface Props extends AlertProps {
  title?: string;
  icon?: LucideIcon;
}

export const AlertInfo = ({ title, icon: Icon, children, ...props }: Props) => {
  return (
    <Alert {...props}>
      {Icon ? <Icon className="size-4" /> : null}
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  );
};
