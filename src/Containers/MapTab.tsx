import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { useState } from "react";

export const PokeMap = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <FoundPokemonModal display={showModal} setDisplay={setShowModal} />
      <MapView style={styles.map} onLongPress={() => setShowModal(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
