import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react-native";

import { Album, IAlbum } from "../Album";

// TODO: Figure out how to mock the FlashList component
// This mock is taken from "@shopify/flash-list/jestSetup.js"
// The recommended setup from https://shopify.github.io/flash-list/docs/testing does not work
// and is why the header test below has been commented out.

// jest.mock("@shopify/flash-list", () => {
//   const ActualFlashList = jest.requireActual("@shopify/flash-list").FlashList;
//   class MockFlashList extends ActualFlashList {
//     componentDidMount() {
//       super.componentDidMount();
//       this.rlvRef?._scrollComponent?._scrollViewRef?.props.onLayout({
//         nativeEvent: { layout: { height: 900, width: 400 } },
//       });
//     }
//   }
//   return {
//     ...jest.requireActual("@shopify/flash-list"),
//     FlashList: MockFlashList,
//   };
// });

const mockAlbumProps: IAlbum = {
  name: "The Album",
  images: [
    {
      url: faker.image.url(),
      caption: "The first image",
      date: "2021-10-01"
    },
    {
      url: faker.image.url(),
      caption: "The second image",
      date: "2021-10-02"
    }
  ]
};

describe("Album", () => {
  beforeEach(() => {
    render(<Album name={mockAlbumProps.name} images={mockAlbumProps.images} />);
  });

  // TODO: Figure out how to test the header by mocking the FlashList component
  // it("renders the album title", () => {
  //   // screen.debug()
  //   screen.getByText(mockAlbumProps.name);
  // });

  it("renders the flash list", () => {
    screen.getByTestId("album-list");
  });
});
