import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import { albums } from "./assets/albums.json";
import { Album } from "./components/Album";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!
      </Text>
      <Album name={albums[0].name} images={albums[0].images} />
      <StatusBar style="auto" />
      <TouchableHighlight style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Start slideshow</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    color: "white",
  },
  button: {
    borderRadius: 5,
    backgroundColor: "white",
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
  },
});
