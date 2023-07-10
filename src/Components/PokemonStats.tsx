import { StyleSheet, Text, View } from "react-native";
import { PokemonDetails, Stats } from "../types";
import { StatDisplay } from "./StatDisplay";

export const PokemonStats = ({
  stats,
  weight,
}: Pick<PokemonDetails, "stats" | "weight">) => {
  return (
    <View style={styles.vertContainer}>
      <StatDisplay value={weight} name="Weight" />
      <View style={styles.horContainer}>
        <View style={styles.vertContainer}>
          <StatDisplay value={stats[0].base_stat} name={stats[0].stat.name} />
          <StatDisplay value={stats[2].base_stat} name={stats[2].stat.name} />
          <StatDisplay value={stats[4].base_stat} name={stats[4].stat.name} />
        </View>
        <View style={styles.vertContainer}>
          <StatDisplay value={stats[1].base_stat} name={stats[1].stat.name} />
          <StatDisplay value={stats[3].base_stat} name={stats[3].stat.name} />
          <StatDisplay value={stats[5].base_stat} name={stats[5].stat.name} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  vertContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  horContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
