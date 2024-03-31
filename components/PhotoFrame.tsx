import { JSX, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";

export interface IPhoto {
  date: string;
  url: string;
  caption: string;
  testID?: string;
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "white",
    padding: 10,
  },
  text: {
    color: "black",
  },
  frameText: {
    color: "black",
  },
  imageLoading: {
    width: 0,
    height: 0,
  },
});

export const PhotoFrame = ({
  date,
  url,
  caption,
  testID,
}: IPhoto): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const { width: ScreenWidth } = useWindowDimensions();

  const [dimensions, setDimensions] = useState({
    width: 10,
    height: 10,
  });

  const handleOnLoad = async ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    const imageWidth = ScreenWidth * 0.8;
    setDimensions({
      width: imageWidth,
      height: (imageWidth / width) * height,
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.text}>Loading...</Text>}
      <Image
        testID={testID}
        src={url}
        style={dimensions}
        onLoad={({
          nativeEvent: {
            source: { width, height },
          },
        }) => handleOnLoad({ width, height })}
      />
      {!loading && (
        <Text style={styles.frameText}>
          {date}: {caption}
        </Text>
      )}
    </View>
  );
};
