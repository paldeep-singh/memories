import { fireEvent, render } from "@testing-library/react-native";

import { IPhoto, PhotoFrame } from "../PhotoFrame";

const mockPhotoFrameProps: IPhoto = {
  date: "2021-01-03",
  url: "https://memwa-web-staging.s3.ap-southeast-2.amazonaws.com/images/2+012.jpg",
  caption: "Somewhere in Canada 2",
  testID: "test-photo-frame",
};

describe("<PhotoFrame />", () => {
  it("renders", () => {
    const { getByTestId } = render(<PhotoFrame {...mockPhotoFrameProps} />);

    getByTestId("test-photo-frame");
  });

  it("renders the image with the provided url", () => {
    const { getByTestId } = render(<PhotoFrame {...mockPhotoFrameProps} />);

    const image = getByTestId("test-photo-frame");

    expect(image.props.src).toBe(mockPhotoFrameProps.url);
  });

  it("does not render the date and caption while image is loading", () => {
    const { queryByText } = render(<PhotoFrame {...mockPhotoFrameProps} />);

    expect(
      queryByText(`${mockPhotoFrameProps.date}: ${mockPhotoFrameProps.caption}`)
    ).toBeNull();
  });

  it("renders the date and caption after the image has loaded", () => {
    const { getByText, getByTestId } = render(
      <PhotoFrame {...mockPhotoFrameProps} />
    );

    fireEvent(getByTestId("test-photo-frame"), "onLoad", {
      nativeEvent: {
        source: {
          width: 100,
          height: 100,
        },
      },
    });

    getByText(`${mockPhotoFrameProps.date}: ${mockPhotoFrameProps.caption}`);
  });

  it("renders loading text when the image is loading", () => {
    const { getByText } = render(<PhotoFrame {...mockPhotoFrameProps} />);

    getByText("Loading...");
  });

  it("does not render loading text when the image has loaded", () => {
    const { queryByText, getByTestId } = render(
      <PhotoFrame {...mockPhotoFrameProps} />
    );

    fireEvent(getByTestId("test-photo-frame"), "onLoad", {
      nativeEvent: {
        source: {
          width: 100,
          height: 100,
        },
      },
    });

    expect(queryByText("Loading...")).toBeNull();
  });
});
