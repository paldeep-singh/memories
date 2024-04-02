import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { albums } from "./assets/albums.json";
import { colours } from "./colours/colours";
import { Album } from "./components/Album";
import { Showcase } from "./components/Showcase";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Album name={albums[0].name} images={albums[0].images} />
        <Showcase images={albums[0].images} name={albums[0].name} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
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
