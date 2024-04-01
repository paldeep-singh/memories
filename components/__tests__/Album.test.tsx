import { render, screen } from "@testing-library/react-native";

import { Album, IAlbum } from "../Album";

const mockAlbumProps: IAlbum = {
  name: "The Album",
  images: [
    {
      url: faker.image.url(),
      caption: "The first image",
      date: "2021-10-01",
    },
    {
      url: faker.image.url(),
      caption: "The second image",
      date: "2021-10-02",
    },
  ],
};

describe("Album", () => {
  beforeEach(() => {
    render(<Album name={mockAlbumProps.name} images={mockAlbumProps.images} />);
  });

  it("renders the album title", () => {
    screen.getByText(mockAlbumProps.name);
  });

  it("renders the flash list", () => {
    screen.getByTestId("album-list");
  });
});
