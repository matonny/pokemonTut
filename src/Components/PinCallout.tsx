import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { MapPinsContextType } from "../types";
import { removePokemonPinFromCache } from "../cache";
import { PinsContext } from "../Contexts/PinsContext";

export interface PinCalloutProps {
  pokemon: string;
  pinId: number;
}
export const PinCallout = ({ pokemon, pinId }: PinCalloutProps) => {
  const { setMapPins } = useContext(PinsContext) as MapPinsContextType;
  return (
    <Callout>
      <View style={styles.container}>
        <Text style={styles.name}>{pokemon}</Text>
        <Pressable
          onPress={() => {
            removePokemonPinFromCache(pinId);
            setMapPins((prevPins) => {
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
