import { render, fireEvent } from "@testing-library/react";
import { ButtonElement, ButtonsInPopover } from "../buttons-in-popover";
import { Edit, Trash2 } from "lucide-react";

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
    const { getByText } = render(
      <ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>,
    );

    expect(getByText("Edit")).toBeInTheDocument();
  });

  it("should call the onClick function when a button is clicked", () => {
    const { getByText } = render(
      <ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>,
    );

    fireEvent.click(getByText("Edit"));

    fireEvent.click(getByText("Update"));
    fireEvent.click(getByText("Delete"));

    expect(buttons[0]?.onClick).toHaveBeenCalled();
    expect(buttons[1]?.onClick).toHaveBeenCalled();
  });

  it("should trigger file input click when uploadFile button is clicked", () => {
    const { getByText } = render(
      <ButtonsInPopover buttons={buttons}>Edit</ButtonsInPopover>,
    );

    const trigger = getByText("Edit");
    fireEvent.click(trigger);

    const buttonOne = getByText(buttons[0]?.text ?? "");
    const buttonTwo = getByText(buttons[1]?.text ?? "");

    expect(buttonOne).toHaveTextContent("Update");
    expect(buttonTwo).toHaveTextContent("Delete");

    fireEvent.click(buttonOne);

    expect(buttonOne).toBeInTheDocument();
    expect(buttons[0]?.onClick).toHaveBeenCalled();
  });
});
