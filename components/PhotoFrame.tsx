import { Image } from "expo-image";
import { JSX, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  DimensionValue
} from "react-native";

import { colours } from "../colours/colours";

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
    backgroundColor: colours["Baby powder"],
    padding: 10,
    alignItems: "center"
  },
  text: {
    color: colours["Rich black"]
  },
  imageLoading: {
    width: 50,
    height: 50
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const PhotoFrame = ({
  date,
  url,
  caption,
  testID,
  width,
  height
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
          height
        }
      ]}
    >
      <Image
        testID={`${testID}-image`}
        source={url}
        style={{
          width: "90%",
          height: undefined,
          aspectRatio: dimensions.width / dimensions.height
        }}
        onLoad={({ source: { width, height } }) => {
          setDimensions({ width, height });
          setLoading(false);
        }}
        contentFit="contain"
      />
      {!loading && (
        <Text style={styles.text}>
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
