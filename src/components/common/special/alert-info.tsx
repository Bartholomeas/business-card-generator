import {
  Alert,
  AlertDescription,
  type AlertProps,
  AlertTitle,
} from "~/components/common/ui/alert";
import { type LucideIcon } from "lucide-react";

interface Props extends AlertProps {
  title?: string;
  icon?: LucideIcon;
}

export const AlertInfo = ({ title, icon: Icon, children, ...props }: Props) => {
  return (
    <Alert {...props}>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  );
};
