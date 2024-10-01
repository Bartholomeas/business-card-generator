import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "../form";
import { InputTextarea } from "../input-textarea";

const LABEL_TEXT = "Name";
const DESCRIPTION_TEXT = "Enter your name";

const testSchema = z.object({
	test: z.string().min(3, "testMsg"),
});

interface ComponentTestProps {
	handleSubmit: () => void;
	type?: "text" | "password";
}

const ComponentTest = ({ handleSubmit }: ComponentTestProps) => {
	const methods = useForm({
		defaultValues: {
			test: "",
		},
		resolver: zodResolver(testSchema),
	});

	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<InputTextarea
					name="test"
					label={LABEL_TEXT}
					placeholder={LABEL_TEXT}
					description={DESCRIPTION_TEXT}
				/>

				<button type="submit">submit</button>
			</form>
		</Form>
	);
};

describe("textArea", () => {
	it("should render the textArea field with label and description", () => {
		const handleSubmit = jest.fn();

		render(<ComponentTest handleSubmit={handleSubmit} />);

		const labelElement = screen.queryByLabelText(LABEL_TEXT);
		const descriptionElement = screen.getByText(DESCRIPTION_TEXT);
		const textAreaElement = screen.getByRole("textbox");

		expect(labelElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(textAreaElement).toBeInTheDocument();
	});

	it("should handle textArea value change", () => {
		render(<ComponentTest handleSubmit={() => null} />);

		const textAreaElement = screen.getByLabelText(LABEL_TEXT);

		fireEvent.change(textAreaElement, { target: { value: "John" } });

		expect(textAreaElement).toHaveDisplayValue("John");
	});
});
