import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle
} from "react-native";

import { colours } from "../colours/colours";

interface IButton {
  onPress: () => void;
  text: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: colours.Moonstone,
    width: "50%",
    alignItems: "center",
    height: 30,
    justifyContent: "center"
  },
  buttonText: {
    color: colours["Rich black"]
  }
});

export const Button = ({
  onPress,
  text,
  containerStyle,
  textStyle
}: IButton): JSX.Element => {
  return (
    <TouchableOpacity
      testID="test-button"
      onPress={onPress}
      style={[styles.button, containerStyle]}
    >
      <Text style={(styles.buttonText, textStyle)}>{text}</Text>
    </TouchableOpacity>
  );
};
