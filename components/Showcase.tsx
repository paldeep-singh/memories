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
  Easing
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
  SafeAreaProvider
} from "react-native-safe-area-context";

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
  photoFrameContainer: {
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

const LoadingIndicator = (): JSX.Element => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Showcase loading...</Text>
    <ActivityIndicator
      testID="loading-indicator"
      color={colours["Misty rose"]}
    />
  </View>
);

const ShowcaseControls = ({
  startShowcase,
  setShowcaseDuration
}: {
  startShowcase: () => void;
  setShowcaseDuration: (duration: number) => void;
}): JSX.Element => (
  <KeyboardAvoidingView style={styles.modalButtonContainer} behavior="padding">
    <TextInput
      testID="duration-input"
      inputMode="numeric"
      placeholder="Delay (ms), default: 1000"
      placeholderTextColor={colours["Payne's grey"]}
      style={styles.durationInput}
      onChangeText={(text) =>
        !text
          ? setShowcaseDuration(1000)
          : setShowcaseDuration(parseInt(text, 10))
      }
    />
    <Button text="Showcase" onPress={startShowcase} />
  </KeyboardAvoidingView>
);

interface IShowcaseContent extends IAlbum {
  dismiss: () => void;
  duration: number;
}

const ShowcaseContent = ({
  images,
  name,
  dismiss,
  duration
}: IShowcaseContent): JSX.Element => {
  const insets = useSafeAreaInsets();
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
      outputRange: [screenHeight, insets.top + styles.headerText.fontSize + 10]
    })
  );

  const imageRotation = rotationProgress.map((value) =>
    value.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-25deg", "25deg"]
    })
  );

  // Animate images sliding in from bottom
  useEffect(() => {
    setTimeout(() => {
      Animated.sequence(
        slideProgress.map((progress, index) => {
          const even = index % 2 === 0;
          const rotateValue = Math.min(Math.random(), 0.8);

          return Animated.parallel([
            Animated.timing(progress, {
              toValue: index === 0 ? 1 : 1 - index * (1 / images.length),
              duration,
              useNativeDriver: false,
              easing: Easing.in(Easing.bezier(0.03, 0.93, 0.71, 0.99)) // Slow down animation towards end
            }),
            Animated.timing(rotationProgress[index], {
              toValue: even ? rotateValue : -rotateValue,
              duration: duration / 2,
              useNativeDriver: false,
              easing: Easing.in(Easing.bezier(0.03, 0.93, 0.71, 0.99)) // Slow down animation towards end
            })
          ]);
        })
      ).start();
    }, 300); // Slight delay to allow modal to open before animation starts
  });

  const onDismiss = () => {
    // Straighten images and slide them out
    Animated.sequence([
      Animated.parallel(
        rotationProgress.map((progress) =>
          Animated.timing(progress, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
          })
        )
      ),
      Animated.parallel(
        slideProgress.map((progress) =>
          Animated.timing(progress, {
            toValue: -1,
            duration: 500,
            useNativeDriver: false
          })
        )
      )
    ]).start(() => {
      dismiss();
    });
  };

  return (
    <>
      <Text style={styles.headerText}>{name}</Text>
      {images.map(({ url, caption, date }, index) => (
        <Animated.View
          key={`slideshow-image-${index}`}
          style={[
            styles.photoFrameContainer,
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
            testID={`showcase-image-${index}`}
          />
        </Animated.View>
      ))}
      <Button
        text="Close"
        onPress={onDismiss}
        containerStyle={styles.closeButton}
      />
    </>
  );
};

export const Showcase = ({ images, name }: IAlbum): JSX.Element => {
  const [startShowcase, setStartShowcase] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showcaseDuration, setShowcaseDuration] = useState(1000);

  useEffect(() => {
    Promise.all(images.map(({ url }) => Image.prefetch(url))).then(() => {
      setLoading(false);
    });
  }, []); //Only prefetch images on first render

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ShowcaseControls
          startShowcase={() => setStartShowcase(true)}
          setShowcaseDuration={setShowcaseDuration}
        />
      )}
      <Modal visible={startShowcase} animationType="slide">
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <ShowcaseContent
              images={images}
              name={name}
              dismiss={() => setStartShowcase(false)}
              duration={showcaseDuration}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </>
  );
};
