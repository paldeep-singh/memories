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
    color: colours["Baby powder"],
    backgroundColor: colours["Tyrian purple"],
    width: "100%",
    padding: 10
  }
});

export const Album = ({ name, images }: IAlbum): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlashList
        data={[name, ...images]}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            return <Text style={styles.title}>{item}</Text>;
          }
          return (
            <View style={styles.itemsContainer}>
              <PhotoFrame
                date={item.date}
                url={item.url}
                caption={item.caption}
                testID={item.testID}
              />
            </View>
          );
        }}
        estimatedItemSize={70}
        testID="album-list"
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};
