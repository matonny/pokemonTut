import MapView, { LatLng, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { useEffect, useState } from "react";
import { PokemonPin } from "../types";
import { getPokePinsFromCache } from "../cache";

export const PokeMap = () => {
  const [showModal, setShowModal] = useState(false);
  const [pressData, setPressData] = useState<undefined | LatLng>(undefined);
  const [storedPins, setStoredPins] = useState<undefined | PokemonPin[]>(
    undefined
  );

  useEffect(() => {
    const initialLoad = async () => {
      const pins = await getPokePinsFromCache();
      setStoredPins(pins);
      console.log(pins);
    };

    initialLoad();

    return () => {
      setStoredPins(undefined);
    };
  }, []);
  return (
    <View style={styles.container}>
      <FoundPokemonModal
        display={showModal}
        setDisplay={setShowModal}
        pressPosition={pressData}
      />
      <MapView
        style={styles.map}
        onLongPress={(event) => {
          setPressData(event.nativeEvent.coordinate);
          setShowModal(true);
        }}
      >
        {storedPins?.map((pin) => {
          return <Marker coordinate={pin.position} />;
        })}
      </MapView>
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
