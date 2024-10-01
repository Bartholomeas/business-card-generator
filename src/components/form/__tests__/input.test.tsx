import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "../form";
import { Input } from "../input";

const LABEL_TEXT = "Name";
const DESCRIPTION_TEXT = "Enter your name";

const testSchema = z.object({
	test: z.string().min(3, "testMsg"),
});

interface ComponentTestProps {
	handleSubmit: () => void;
	type?: "text" | "password";
}

const ComponentTest = ({ handleSubmit, type = "text" }: ComponentTestProps) => {
	const methods = useForm({
		defaultValues: {
			test: "",
		},
		resolver: zodResolver(testSchema),
	});

	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<Input
					name="test"
					label={LABEL_TEXT}
					placeholder={LABEL_TEXT}
					description={DESCRIPTION_TEXT}
					type={type}
				/>

				<button type="submit">submit</button>
			</form>
		</Form>
	);
};

describe("Input", () => {
	it("should render the input field with label and description", () => {
		const handleSubmit = jest.fn();

		render(<ComponentTest handleSubmit={handleSubmit} />);

		const labelElement = screen.queryByLabelText(LABEL_TEXT);
		const descriptionElement = screen.getByText(DESCRIPTION_TEXT);
		const inputElement = screen.getByRole("textbox");

		expect(labelElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();
	});

	it("should handle input value change", () => {
		render(<ComponentTest handleSubmit={() => null} />);

		const inputElement = screen.getByLabelText(LABEL_TEXT);

		fireEvent.change(inputElement, { target: { value: "John" } });

		expect(inputElement).toHaveDisplayValue("John");
	});

	it("should render input with passed type", () => {
		render(<ComponentTest handleSubmit={() => null} type="password" />);

		const inputElement = screen.getByLabelText(LABEL_TEXT);

		expect(inputElement).toHaveAttribute("type", "password");
	});
});
