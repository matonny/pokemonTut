import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { useEffect, useState } from "react";
import { PokemonPin, Press } from "../types";
import { getPokePinsFromCache } from "../cache";
import { PinCallout } from "../Components/PinCallout";
import { PinsContext } from "../Contexts/PinsContext";

export const MapTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [pressData, setPressData] = useState<undefined | Press>(undefined);
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
          pressDetails={pressData}
        />
        <MapView
          style={styles.map}
          onLongPress={(event) => {
            setPressData({
              timeStamp: event.timeStamp,
              position: event.nativeEvent.coordinate,
            });
            setShowModal(true);
          }}
        >
          {storedPins?.map((pin) => {
            return (
              <Marker
                coordinate={pin.position}
                title={pin.pokemon}
                key={pin.timeStamp}
              >
                <PinCallout pokemon={pin.pokemon} pinId={pin.timeStamp} />
              </Marker>
            );
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
