import { faker } from "@faker-js/faker";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Image } from "expo-image";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { Showcase } from "../Showcase";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

// Required due to presence of animations
jest.useFakeTimers();

const mockImages = Array.from({ length: 10 }, (_, i) => ({
  url: faker.image.url(),
  caption: faker.lorem.sentence(),
  date: faker.date.recent().toDateString()
}));

const mockAlbum = {
  name: faker.lorem.words(),
  images: mockImages
};

describe("Showcase", () => {
  describe("when showcase is not open", () => {
    const mockPrefetch = jest
      .fn()
      .mockImplementation(() => new Promise(() => {}));

    describe("when images are loading", () => {
      beforeEach(() => {
        jest.spyOn(Image, "prefetch").mockImplementation(mockPrefetch);
        render(<Showcase images={mockAlbum.images} name={mockAlbum.name} />);
      });

      it("renders the loading text", () => {
        screen.getByText("Showcase loading...");
      });

      it("renders the loading indicator", () => {
        screen.getByTestId("loading-indicator");
      });

      it("calls Image.prefetch with the correct urls", () => {
        mockAlbum.images.forEach(({ url }) => {
          expect(Image.prefetch).toHaveBeenCalledWith(url);
        });
      });
    });

    describe("when images have loaded", () => {
      const mockPrefetchPromise = new Promise((resolve) => resolve(true));
      const mockPrefetch = jest.fn().mockReturnValue(mockPrefetchPromise);

      beforeEach(async () => {
        jest.spyOn(Image, "prefetch").mockImplementation(mockPrefetch);

        render(<Showcase images={mockAlbum.images} name={mockAlbum.name} />);

        // Wrapped in act() to prevent warnings about state updates
        await act(() => mockPrefetchPromise);
      });

      it("renders the Showcase button", () => {
        screen.getByText("Showcase");
      });

      it("renders the showcase duration input with placeholder text", () => {
        const input = screen.getByTestId("duration-input");

        expect(input.props.placeholder).toBe("Delay (ms), default: 1000");
      });

      describe("when the Showcase button is pressed", () => {
        beforeEach(() => {
          fireEvent.press(screen.getByText("Showcase"));
        });

        it("renders the album title", () => {
          screen.getByText(mockAlbum.name);
        });

        it("renders the images", () => {
          mockImages.forEach(({ url }, index) => {
            screen.getByTestId(`showcase-image-${index}`);
          });
        });

        it("renders the close button", () => {
          screen.getByText("Close");
        });

        describe("when the close button is pressed", () => {
          beforeEach(() => {
            fireEvent.press(screen.getByText("Close"));
          });

          it("renders the Showcase button", () => {
            screen.getByText("Showcase");
          });

          it("renders the showcase duration input", () => {
            screen.getByTestId("duration-input");
          });
        });
      });
    });
  });
});
