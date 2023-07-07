import { StyleSheet, Text, View } from "react-native";
import { Stats } from "../types";
import { statDisplayNames } from "../utils";

export const StatDisplay = ({
  name,
  value,
}: {
  name: Stats;
  value: number;
  tight?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text>{statDisplayNames[name]}</Text>
      </View>
      <View style={styles.value}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 130,
    borderWidth: 2,
    borderColor: "white",

    margin: 2,
  },
  name: {
    flexGrow: 6,
  },
  value: {
    color: "white",
    borderLeftWidth: 2,
    borderLeftColor: "white",
    padding: 3,
  },
});
