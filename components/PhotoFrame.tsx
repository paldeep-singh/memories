import { JSX, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  ActivityIndicator,
  DimensionValue,
} from "react-native";

export interface IPhoto {
  date: string;
  url: string;
  caption: string;
  testID?: string;
  width?: DimensionValue;
  height?: DimensionValue;
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
  width,
  height,
}: IPhoto): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const [dimensions, setDimensions] = useState(styles.imageLoading);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width,
          height,
        },
      ]}
    >
      <Image
        testID={`${testID}-image`}
        src={url}
        style={{
          width: "90%",
          height: undefined,
          aspectRatio: dimensions.width / dimensions.height,
        }}
        onLoad={({
          nativeEvent: {
            source: { width, height },
          },
        }) => {
          setDimensions({ width, height });
          setLoading(false);
        }}
        resizeMode="contain"
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
