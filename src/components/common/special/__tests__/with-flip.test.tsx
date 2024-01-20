import { useRef } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { FlipComponentRefProps, withFlip } from "../with-flip";

interface TestComponentProps {
  variant: "front" | "back";
  className?: string;
}
const TestComponent = ({ variant, className }: TestComponentProps) => {
  return <div className={className}>{variant}</div>;
};

const ComponentToTest = () => {
  const ref = useRef<FlipComponentRefProps>(null);

  const Flippable = withFlip(TestComponent, {
    buttonHandle: true,
    scaleOnHover: true,
  });

  return (
    <>
      <button
        onClick={() => {
          ref.current?.handleFlip();
        }}
      >
        flip
      </button>
      <Flippable ref={ref} variant="front" />
    </>
  );
};

describe("WithFlipHOC", () => {
  it("should take correctly passed children", () => {
    const { getByText, getByTestId } = render(<ComponentToTest />);

    const front = getByText("front");
    const frontParent = getByTestId("front");

    const back = getByText("back");
    const backParent = getByTestId("back");

    const flipBtn = getByText("flip");

    expect(front).toBeInTheDocument();
    expect(frontParent).toBeInTheDocument();

    expect(back).toBeInTheDocument();
    expect(backParent).toBeInTheDocument();

    expect(flipBtn).toBeInTheDocument();
  });
  it("should flip card on click", () => {
    const { getByText, getByTestId } = render(<ComponentToTest />);

    const flipBtn = getByText("flip");

    const frontParent = getByTestId("front");
    const backParent = getByTestId("back");

    expect(frontParent).toHaveClass("z-1");
    expect(backParent).not.toHaveClass("z-1");

    fireEvent.click(flipBtn);

    expect(frontParent).not.toHaveClass("z-1");
    expect(backParent).toHaveClass("z-1");
  });
  it("should scale component on hover", async () => {
    const { getByTestId } = render(<ComponentToTest />);

    const scalingParent = getByTestId("scaling-parent");

    expect(scalingParent).toHaveStyle("transform: none");

    fireEvent.mouseOver(scalingParent);
    await waitFor(() => {
      setTimeout(() => {
        expect(window.getComputedStyle(scalingParent).transform).toBe(
          "scale(1.1)",
        );
      }, 200);
    });
  });
});
