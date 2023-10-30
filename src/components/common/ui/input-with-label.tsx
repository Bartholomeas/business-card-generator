import { Input, type InputProps } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface Props extends InputProps {
  labelText: string;
  name: string;
}

export const InputWithLabel = ({ name, labelText, ...props }: Props) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label>
        {labelText}
        <Input name={name} {...props} />
      </Label>
    </div>
  );
};
