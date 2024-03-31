import { JSX, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  ActivityIndicator,
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
    alignItems: "center",
  },
  text: {
    color: "black",
  },
  frameText: {
    color: "black",
  },
  imageLoading: {
    width: 50,
    height: 50,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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

  const [dimensions, setDimensions] = useState(styles.imageLoading);

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
    <View testID={testID} style={styles.container}>
      <Image
        testID={`${testID}-image`}
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

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            style={styles.loading}
            testID={`${testID}-loading`}
          />
        </View>
      )}
    </View>
  );
};
