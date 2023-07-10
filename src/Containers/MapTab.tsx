import MapView, { LatLng, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { createContext, useEffect, useState } from "react";
import { MapPinsContextType, PokemonPin } from "../types";
import { getPokePinsFromCache } from "../cache";

export const PinsContext = createContext<undefined | MapPinsContextType>(
  undefined
);

export const MapTab = () => {
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
    <PinsContext.Provider
      value={{ mapPins: storedPins, setMapPins: setStoredPins }}
    >
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
            return <Marker coordinate={pin.position} title={pin.pokemon} />;
          })}
        </MapView>
      </View>
    </PinsContext.Provider>
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
