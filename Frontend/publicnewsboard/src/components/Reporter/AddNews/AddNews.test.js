import { act, fireEvent,  render } from "@testing-library/react";
import AddNews from "./AddNews";

describe("Form testing", () => {
  it("renders form without crashing", () => {
    const div = document.createElement("div");
    render(<AddNews />, div);
  });

  describe("With all inpunts", () => {
    it("calls onSubmit function", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole, getAllByTestId } = render(
        <AddNews onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Heading/Title"), { target: { value: "" } });
        fireEvent.change(getAllByTestId("article"), { target: { value: "" } });
        fireEvent.change(getAllByTestId("category"), { target: { value: "" } });
        fireEvent.change(getAllByTestId("image"), { target: { value: "" } });
        fireEvent.change(getByLabelText("City*"), { target: { value: "" } });
        fireEvent.change(getByLabelText("Locality *"), { target: { value: "" } });
      });

      await act(async () => {
        fireEvent.click(getByRole("button"));
      });

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});