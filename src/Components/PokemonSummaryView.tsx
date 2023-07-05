import { Image, StyleSheet, Text, View } from "react-native";

interface PokemonSummaryProps {
  name: string;
  frontUrl: string;
}
export const PokemonSummaryView = ({ name, frontUrl }: PokemonSummaryProps) => {
  const styles = StyleSheet.create({
    contaniner: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      textTransform: "uppercase",
      color: "#222222",
      fontSize: 20,
    },
  });
  return (
    <View style={styles.contaniner}>
      <Text style={styles.text}>{name}</Text>
      <Image source={{ width: 100, height: 100, uri: frontUrl }} />
    </View>
  );
};
