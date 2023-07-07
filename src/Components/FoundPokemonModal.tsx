import { Dispatch } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export interface FoundPokemonModalProps {
  display: boolean;
  setDisplay: Dispatch<React.SetStateAction<boolean>>;
}
export const FoundPokemonModal = ({
  display,
  setDisplay,
}: FoundPokemonModalProps) => {
  console.log("yikes");
  return (
    <Modal
      visible={display}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setDisplay(false)}
    >
      <View style={styles.modal}>
        <View style={styles.sndModal}>
          <Pressable onPress={() => setDisplay(false)}>
            <Text>Add a newfound pokemon!</Text>
            <Text>Add a newfound pokemon!</Text>
            <Text>Add a newfound pokemon!</Text>
            <Text>Add a newfound pokemon!</Text>
            <Text>Add a newfound pokemon!</Text>
            <Text>Add a newfound pokemon!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sndModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
