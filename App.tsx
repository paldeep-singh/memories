import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { albums } from "./assets/albums.json";
import { colours } from "./colours/colours";
import { Album } from "./components/Album";
import { Showcase } from "./components/Showcase";

export default function App() {
  return (
    <View style={styles.container}>
      <Album name={albums[0].name} images={albums[0].images} />
      <StatusBar style="auto" />
      <Showcase images={albums[0].images} name={albums[0].name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours["Tyrian purple"],
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
