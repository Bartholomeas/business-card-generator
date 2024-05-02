import { toast } from "~/components/common";

interface handleErrorToastProps {
  title?: string;
  description?: string;
}

export const handleErrorToast = ({
  title = "Wystąpił błąd",
  description = "Nieznany błąd, spróbuj ponownie później.",
}: handleErrorToastProps) => {
  toast({
    title,
    description,
  });
};