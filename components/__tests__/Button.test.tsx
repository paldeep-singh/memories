import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "../Button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button onPress={() => {}} text="test" />);
    screen.getByText("test");
  });

  it("triggers onPress function when pressed", () => {
    const onPress = jest.fn();

    render(<Button onPress={onPress} text="test" />);

    fireEvent.press(screen.getByText("test"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom container styles", () => {
    render(
      <Button
        onPress={() => {}}
        text="test"
        containerStyle={{ backgroundColor: "red" }}
      />
    );

    const button = screen.getByTestId("test-button");

    expect(button.props.style).toHaveProperty("backgroundColor", "red");
  });

  it("applies custom text styles", () => {
    render(
      <Button onPress={() => {}} text="test" textStyle={{ color: "blue" }} />
    );

    const text = screen.getByText("test");

    expect(text.props.style).toHaveProperty("color", "blue");
  });
});
