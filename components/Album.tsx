import { FlashList } from "@shopify/flash-list";
import { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";

import { IPhoto, PhotoFrame } from "./PhotoFrame";
import { colours } from "../colours/colours";
export interface IAlbum {
  name: string;
  images: IPhoto[];
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
    height: "80%",
    alignContent: "center"
  },
  itemsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: colours["Baby powder"]
  }
});

export const Album = ({ name, images }: IAlbum): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <FlashList
        data={images}
        renderItem={({ item: image }) => (
          <View style={styles.itemsContainer}>
            <PhotoFrame
              date={image.date}
              url={image.url}
              caption={image.caption}
              testID={image.testID}
            />
          </View>
        )}
        estimatedItemSize={70}
        testID="album-list"
      />
    </View>
  );
};
