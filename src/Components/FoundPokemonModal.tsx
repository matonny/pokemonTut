import React, { Dispatch, useContext, useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addPokemonPinToCache } from "../cache";
import { PinsContext } from "../Containers/MapTab";
import { MapPinsContextType, Press } from "../types";

type FoundPokemonModalProps = {
  display: boolean;
  setDisplay: Dispatch<React.SetStateAction<boolean>>;
  pressDetails: Press | undefined;
};
export const FoundPokemonModal = ({
  display,
  setDisplay,
  pressDetails,
}: FoundPokemonModalProps) => {
  const [pokeName, setPokeName] = useState("");
  const { setMapPins } = useContext(PinsContext) as MapPinsContextType;

  if (!pressDetails) {
    return <></>;
  }
  const closeModal = () => {
    setDisplay(false);
    setPokeName("");
  };

  return (
    <Modal
      visible={display}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setDisplay(false)}
    >
      <View style={styles.modal}>
        <View style={styles.sndModal}>
          <Text style={styles.title}>Add a newfound pokemon!</Text>

          <TextInput
            style={styles.input}
            value={pokeName}
            onChangeText={(event) => setPokeName(event)}
          ></TextInput>

          <View style={styles.btnBar}>
            <View style={styles.btn}>
              <Button title="Close" color="red" onPress={closeModal}></Button>
            </View>
            <View style={styles.btn}>
              <Button
                disabled={pokeName === ""}
                title="Add"
                onPress={() => {
                  const newPin = {
                    pokemon: pokeName,
                    position: pressDetails.position,
                    timeStamp: pressDetails.timeStamp,
                  };
                  addPokemonPinToCache(newPin);
                  setMapPins((prevMapPins) => prevMapPins?.concat([newPin]));
                  closeModal();
                }}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginTop: 10,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sndModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
  },
  btnBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: 100,
  },
  input: {
    height: 40,
    width: 150,
    padding: 12,
    backgroundColor: "#EFEFEF",
    borderWidth: 1,
    borderRadius: 5,
  },
});
