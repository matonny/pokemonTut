import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../Components/LoginForm";
import { RegisterForm } from "../Components/RegisterForm";

export const UserScreen = () => {
  const [isLogging, setIsLogging] = useState(true);

  const formTitle = isLogging ? "Log in" : "Register";
  const switchMessage = isLogging
    ? ["Don't have an account? ", "Register here"]
    : ["Already have an account?", "Log in here"];
  const chosenForm = isLogging ? <LoginForm /> : <RegisterForm />;
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>{formTitle}</Text>
      {chosenForm}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{switchMessage[0]}</Text>
        <Pressable
          onPress={() => setIsLogging((prevIsLogging) => !prevIsLogging)}
        >
          <Text style={styles.formChange}> {switchMessage[1]}</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b3cde0",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    marginVertical: 20,
    color: "#03396c",
  },
  formChange: {
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textDecorationColor: "#011f4b",
    color: "#011f4b",
  },
});
