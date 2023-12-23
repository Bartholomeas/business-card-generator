import { type WithFlipProps } from "~/components/common/special/with-flip/types";

export const FlippableCardHandler = ({
  variant = "front",
  ...props
}: WithFlipProps) => {
  switch (variant) {
    case "front":
      return <CardFrontContent {...props} />;
    case "back":
      return <CardBackContent {...props} />;
    default:
      return <CardFrontContent {...props} />;
  }
};

const CardFrontContent = ({ ...props }: WithFlipProps) => {
  return (
    <div {...props} className="aspect-cardOne rounded bg-blue-500 p-4">
      TO JEST FRONT
    </div>
  );
};

const CardBackContent = ({ ...props }: WithFlipProps) => {
  return (
    <div {...props} className="aspect-cardOne rounded bg-rose-500 p-4">
      TO JEST BACK
    </div>
  );
};
