import { Image } from "expo-image";
import { useEffect, useState, JSX, useRef } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  useWindowDimensions,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Easing,
  SafeAreaView
} from "react-native";

import { IAlbum } from "./Album";
import { Button } from "./Button";
import { PhotoFrame } from "./PhotoFrame";
import { colours } from "../colours/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours["Tropical indigo"],
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20
  },
  closeButton: {
    position: "absolute",
    bottom: 30,
    zIndex: 100,
    backgroundColor: colours["Misty rose"]
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    padding: 20,
    flex: 1,
    alignItems: "center"
  },
  loadingText: {
    color: colours["Baby powder"]
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 10
  },
  durationInput: {
    backgroundColor: colours["Baby powder"],
    color: colours["Rich black"],
    width: "50%",
    textAlign: "center"
  },
  modalButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  headerText: {
    color: colours["Rich black"],
    fontSize: 20
  }
});

export const Showcase = ({ images, name }: IAlbum): JSX.Element => {
  const [startShowcase, setStartShowcase] = useState(false);
  const [loading, setLoading] = useState(true);
  const { height: screenHeight } = useWindowDimensions();
  const [showcaseDuration, setShowcaseDuration] = useState(1000);

  const slideProgress = useRef(
    images.map(() => new Animated.Value(-1))
  ).current;
  const rotationProgress = useRef(
    images.map(() => new Animated.Value(0))
  ).current;

  const imageTop = slideProgress.map((value) =>
    value.interpolate({
      inputRange: [-1, 1],
      outputRange: [screenHeight, 100]
    })
  );

  const imageRotation = rotationProgress.map((value) =>
    value.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-30deg", "30deg"]
    })
  );

  useEffect(() => {
    console.log("prefetching images");
    Promise.all(images.map(({ url }) => Image.prefetch(url))).then(() => {
      console.log("images prefetched");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && startShowcase) {
      Animated.sequence(
        slideProgress.map((progress, index) => {
          const even = index % 2 === 0;
          const rotateValue = Math.min(Math.random(), 0.8);

          return Animated.parallel([
            Animated.timing(progress, {
              toValue: index === 0 ? 1 : 1 - index * (1 / images.length),
              duration: showcaseDuration,
              useNativeDriver: false
            }),
            Animated.timing(rotationProgress[index], {
              toValue: even ? rotateValue : -rotateValue,
              duration: showcaseDuration,
              useNativeDriver: false
            })
          ]);
        })
      ).start();
    }
  });

  const handleOnClose = () => {
    Animated.parallel(
      rotationProgress.map((progress) =>
        Animated.timing(progress, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false
        })
      )
    ).start(() => {
      setStartShowcase(false);
      Animated.parallel(
        slideProgress.map((progress) =>
          Animated.timing(progress, {
            toValue: -1,
            duration: 0,
            useNativeDriver: false,
            easing: Easing.out(Easing.bezier(0.03, 0.93, 0.71, 0.99))
          })
        )
      ).start();
    });
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Showcase loading...</Text>
          <ActivityIndicator color={colours["Misty rose"]} />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.modalButtonContainer}
          behavior="padding"
        >
          <TextInput
            inputMode="numeric"
            defaultValue="1000"
            style={styles.durationInput}
            onChangeText={(text) => setShowcaseDuration(parseInt(text, 10))}
          />
          <Button
            text="Start showcase"
            onPress={() => setStartShowcase(true)}
          />
        </KeyboardAvoidingView>
      )}
      <Modal visible={startShowcase} animationType="slide">
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>{name}</Text>
          {images.map(({ url, caption, date }, index) => (
            <Animated.View
              key={`slideshow-image-${index}`}
              style={[
                styles.modalContainer,
                {
                  top: imageTop[index],
                  zIndex: index,
                  transform: [{ rotate: imageRotation[index] }]
                }
              ]}
            >
              <PhotoFrame
                key={url}
                url={url}
                caption={caption}
                date={date}
                width="80%"
              />
            </Animated.View>
          ))}

          <Button
            text="Close"
            onPress={handleOnClose}
            containerStyle={styles.closeButton}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};
