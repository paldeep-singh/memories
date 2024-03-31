import { fireEvent, render, screen } from "@testing-library/react-native";

import { IPhoto, PhotoFrame } from "../PhotoFrame";
import { Dimensions } from "react-native";

const mockPhotoFrameProps: IPhoto = {
  date: "2021-01-03",
  url: "https://memwa-web-staging.s3.ap-southeast-2.amazonaws.com/images/2+012.jpg",
  caption: "Somewhere in Canada 2",
  testID: "test-photo-frame",
};

const COMPONENT_TEST_ID = "test-photo-frame";
const IMAGE_TEST_ID = `${COMPONENT_TEST_ID}-image`;

describe("<PhotoFrame />", () => {
  describe("while the image is loading", () => {
    beforeEach(() => {
      render(<PhotoFrame {...mockPhotoFrameProps} />);
    });

    it("renders the image component with the provided url", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.src).toBe(mockPhotoFrameProps.url);
    });

    it("renders the loading text", () => {
      expect(screen.getByText("Loading...")).toBeTruthy();
    });

    it("does not render the date and caption", () => {
      expect(
        screen.queryByText(
          `${mockPhotoFrameProps.date}: ${mockPhotoFrameProps.caption}`
        )
      ).toBeNull();
    });
  });

  describe("after the image has loaded", () => {
    beforeEach(() => {
      jest
        .spyOn(Dimensions, "get")
        .mockReturnValue({ width: 100, height: 100, scale: 1, fontScale: 1 });

      render(<PhotoFrame {...mockPhotoFrameProps} />);

      fireEvent(screen.getByTestId(IMAGE_TEST_ID), "onLoad", {
        nativeEvent: {
          source: {
            width: 100,
            height: 100,
          },
        },
      });
    });

    it("renders the image component with the provided url", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.src).toBe(mockPhotoFrameProps.url);
    });

    it("renders the date and caption", () => {
      expect(
        screen.getByText(
          `${mockPhotoFrameProps.date}: ${mockPhotoFrameProps.caption}`
        )
      ).toBeTruthy();
    });

    it("does not render the loading text", () => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    it("sets the dimensions of the image", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.style).toEqual({
        width: 80,
        height: 80,
      });
    });
  });
});
