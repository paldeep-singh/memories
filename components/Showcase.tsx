import { Image } from "expo-image";
import { useEffect, useState, JSX, useRef } from "react";
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  ActivityIndicator,
  Animated,
  useWindowDimensions,
} from "react-native";

import { IAlbum } from "./Album";
import { PhotoFrame } from "./PhotoFrame";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingTop: 50,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "white",
    width: "50%",
    alignItems: "center",
    zIndex: 100,
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 100,
  },
  buttonText: {
    color: "blue",
  },
});

export const Showcase = ({ images, name }: IAlbum): JSX.Element => {
  const [showSlideShow, setShowSlideShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { height: screenHeight } = useWindowDimensions();
  const slideProgress = useRef(
    images.map(() => new Animated.Value(-1))
  ).current;
  const rotationProgress = useRef(
    images.map(() => new Animated.Value(0))
  ).current;

  const imageTop = slideProgress.map((value) =>
    value.interpolate({
      inputRange: [-1, 1],
      outputRange: [screenHeight, 100],
    })
  );

  const imageRotation = rotationProgress.map((value) =>
    value.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-30deg", "30deg"],
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
    if (!loading && showSlideShow) {
      Animated.sequence(
        slideProgress.map((progress, index) => {
          const even = index % 2 === 0;
          const rotateValue = Math.min(Math.random(), 0.8);

          return Animated.parallel([
            Animated.timing(progress, {
              toValue: index === 0 ? 1 : 1 - index * (1 / images.length),
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(rotationProgress[index], {
              toValue: even ? rotateValue : -rotateValue,
              duration: 1000,
              useNativeDriver: false,
            }),
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
          useNativeDriver: false,
        })
      )
    ).start(() => {
      setShowSlideShow(false);
      Animated.parallel(
        slideProgress.map((progress) =>
          Animated.timing(progress, {
            toValue: -1,
            duration: 0,
            useNativeDriver: false,
          })
        )
      ).start();
    });
  };

  return (
    <>
      {!loading && (
        <TouchableHighlight
          style={styles.button}
          onPress={() => setShowSlideShow(true)}
        >
          <Text style={styles.buttonText}>Start showcase</Text>
        </TouchableHighlight>
      )}
      <Modal visible={showSlideShow} animationType="slide">
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" color="#000000" />}

          {!loading &&
            images.map(({ url, caption, date }, index) => (
              <Animated.View
                key={`slideshow-image-${index}`}
                style={{
                  position: "absolute",
                  width: "100%",
                  top: imageTop[index],
                  zIndex: index,
                  transform: [{ rotate: imageRotation[index] }],
                  padding: 20,
                  flex: 1,
                  backgroundColor: "transparent",
                  alignItems: "center",
                }}
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
          <TouchableHighlight
            style={styles.closeButton}
            onPress={handleOnClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
};
