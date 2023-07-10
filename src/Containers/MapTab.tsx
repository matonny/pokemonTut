import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FoundPokemonModal } from "../Components/FoundPokemonModal";
import { useEffect, useState } from "react";
import { PokePin, Press } from "../types";
import { getPokePinsFromCache } from "../cache";
import { PinCallout } from "../Components/PinCallout";

export const MapTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [pressData, setPressData] = useState<undefined | Press>(undefined);
  const [mapPins, setMapPins] = useState<PokePin[]>([]);

  useEffect(() => {
    const initialLoad = async () => {
      const pins = await getPokePinsFromCache();
      setMapPins(pins);
      console.log(pins);
    };

    initialLoad();

    return () => {
      setMapPins([]);
    };
  }, []);
  return (
    <View style={styles.container}>
      <FoundPokemonModal
        display={showModal}
        setDisplay={setShowModal}
        pressDetails={pressData}
        setMapPins={setMapPins}
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
        {mapPins?.map((pin) => {
          return (
            <Marker
              coordinate={pin.position}
              title={pin.pokemon}
              key={pin.timeStamp}
            >
              <PinCallout
                poke={pin.pokemon}
                pinId={pin.timeStamp}
                setMapPins={setMapPins}
              />
            </Marker>
          );
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
