import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Dimensions } from "react-native";

import { IPhoto, PhotoFrame } from "../PhotoFrame";

const mockPhotoFrameProps: IPhoto = {
  date: "2021-01-03",
  url: faker.image.url(),
  caption: "Somewhere in Canada 2",
  testID: "test-photo-frame"
};

const COMPONENT_TEST_ID = "test-photo-frame";
const IMAGE_TEST_ID = `${COMPONENT_TEST_ID}-image`;
const LOADING_TEST_ID = `${COMPONENT_TEST_ID}-loading`;

describe("PhotoFrame", () => {
  describe("while the image is loading", () => {
    beforeEach(() => {
      render(<PhotoFrame {...mockPhotoFrameProps} />);
    });

    it("renders the image component with the provided url", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.source).toEqual([{ uri: mockPhotoFrameProps.url }]);
    });

    it("renders the loading indicator", () => {
      screen.getByTestId(LOADING_TEST_ID);
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
            width: 200,
            height: 100
          }
        }
      });
    });

    it("renders the image component with the provided url", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.source).toEqual([{ uri: mockPhotoFrameProps.url }]);
    });

    it("renders the date and caption", () => {
      expect(
        screen.getByText(
          `${mockPhotoFrameProps.date}: ${mockPhotoFrameProps.caption}`
        )
      ).toBeTruthy();
    });

    it("does not render the loading indicator", () => {
      expect(screen.queryByTestId(LOADING_TEST_ID)).toBeNull();
    });

    it("sets the height, width and aspect ratio of the image", () => {
      const image = screen.getByTestId(IMAGE_TEST_ID);

      expect(image.props.style).toEqual({
        aspectRatio: 2,
        height: undefined,
        width: "90%"
      });
    });
  });
});
