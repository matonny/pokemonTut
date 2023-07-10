import { Pressable, StyleSheet, Text, View } from "react-native";
import { Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { PokePin } from "../types";
import { removePokePinFromCache } from "../cache";

export interface PinCalloutProps {
  poke: string;
  pinId: number;
  setMapPins: React.Dispatch<React.SetStateAction<PokePin[]>>;
}
export const PinCallout = ({
  poke,
  pinId,
  setMapPins: pinsHook,
}: PinCalloutProps) => {
  return (
    <Callout>
      <View style={styles.container}>
        <Text style={styles.name}>{poke}</Text>
        <Pressable
          onPress={() => {
            removePokePinFromCache(pinId);
            pinsHook((prevPins) => {
              return prevPins?.filter((pin) => pin.timeStamp != pinId);
            });
          }}
        >
          <Icon name="trash-o"></Icon>
        </Pressable>
      </View>
    </Callout>
  );
};
const styles = StyleSheet.create({
  container: {
    minWidth: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    marginRight: 10,
    textTransform: "uppercase",
  },
  icon: {
    marginLeft: 10,
  },
});
