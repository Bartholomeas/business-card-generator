import { useRef } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { withFlip } from "../with-flip/with-flip";
import { type FlipComponentRefProps } from "../with-flip/with-flip.types";

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
		render(<ComponentToTest />);

		const front = screen.getByText("front");
		const frontParent = screen.getByTestId("front");

		const back = screen.getByText("back");
		const backParent = screen.getByTestId("back");

		const flipBtn = screen.getByText("flip");

		expect(front).toBeInTheDocument();
		expect(frontParent).toBeInTheDocument();

		expect(back).toBeInTheDocument();
		expect(backParent).toBeInTheDocument();

		expect(flipBtn).toBeInTheDocument();
	});

	it("should flip card on click", () => {
		render(<ComponentToTest />);

		const flipBtn = screen.getByText("flip");

		const frontParent = screen.getByTestId("front");
		const backParent = screen.getByTestId("back");

		expect(frontParent).toHaveClass("z-1");
		expect(backParent).not.toHaveClass("z-1");

		fireEvent.click(flipBtn);

		expect(frontParent).not.toHaveClass("z-1");
		expect(backParent).toHaveClass("z-1");
	});

	it("should scale component on hover", async () => {
		render(<ComponentToTest />);

		const scalingParent = screen.getByTestId("scaling-parent");

		expect(scalingParent).toHaveStyle("transform: none");

		fireEvent.mouseOver(scalingParent);
		await waitFor(() => {
			setTimeout(() => {
				expect(window.getComputedStyle(scalingParent).transform).toBe("scale(1.1)");
			}, 200);
		});
	});
});
