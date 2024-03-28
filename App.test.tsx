import { render, screen } from "@testing-library/react-native";
import React from "react";

import App from "./App";

describe("<App />", () => {
  it("contains placeholder text", () => {
    render(<App />);

    expect(
      screen.getByText("Open up App.tsx to start working on your app!")
    ).toBeTruthy();
  });
});
