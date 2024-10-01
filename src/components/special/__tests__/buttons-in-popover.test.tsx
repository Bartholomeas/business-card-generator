import { fireEvent, render, screen } from "@testing-library/react";
import { Edit, Trash2 } from "lucide-react";

import { type ButtonElement, ButtonsInPopover } from "../buttons-in-popover";

describe("ButtonsInPopover", () => {
	const buttons: ButtonElement[] = [
		{
			text: "Update",
			icon: Edit,
			uploadFile: true,
			onClick: jest.fn(),
		},
		{
			text: "Delete",
			icon: Trash2,
			onClick: jest.fn(),
		},
	];

	it("should render the children correctly", () => {
		render(<ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>);

		expect(screen.getByText("Edit")).toBeInTheDocument();
	});

	it("should call the onClick function when a button is clicked", () => {
		render(<ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>);

		fireEvent.click(screen.getByText("Edit"));

		fireEvent.click(screen.getByText("Update"));
		fireEvent.click(screen.getByText("Delete"));

		expect(buttons[0]?.onClick).toHaveBeenCalled();
		expect(buttons[1]?.onClick).toHaveBeenCalled();
	});

	it("should trigger file input click when uploadFile button is clicked", () => {
		render(<ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>);

		const trigger = screen.getByText("Edit");
		fireEvent.click(trigger);

		const buttonOne = screen.getByText(buttons[0]?.text ?? "");
		const buttonTwo = screen.getByText(buttons[1]?.text ?? "");

		expect(buttonOne).toHaveTextContent("Update");
		expect(buttonTwo).toHaveTextContent("Delete");

		fireEvent.click(buttonOne);

		expect(buttonOne).toBeInTheDocument();
		expect(buttons[0]?.onClick).toHaveBeenCalled();
	});
});
