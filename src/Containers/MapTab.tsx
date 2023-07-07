import MapView, { LatLng } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { useState } from "react";

export const PokeMap = () => {
  const [showModal, setShowModal] = useState(false);
  const [pressData, setPressData] = useState<null | LatLng>(null);
  return (
    <View style={styles.container}>
      <FoundPokemonModal
        display={showModal}
        setDisplay={setShowModal}
        pressDetails={pressData}
      />
      <MapView
        style={styles.map}
        onLongPress={(event) => {
          setPressData(event.nativeEvent.coordinate);
          setShowModal(true);
        }}
      />
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
