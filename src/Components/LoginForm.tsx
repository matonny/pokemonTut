import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const inputFields = ["email", "password", "confirmPassword"] as Array<
    keyof Inputs
  >;
  const placeholders = ["email address", "password", "confirm password"];
  return (
    <View style={styles.container}>
      {inputFields.map((input, index) => {
        return (
          <Controller
            key={input}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder={placeholders[index]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
                <Text style={styles.error}>{errors[input]?.message}</Text>
              </>
            )}
            name={input}
          ></Controller>
        );
      })}
      <Pressable
        style={styles.submitButton}
        onPress={() => {
          console.log("was");
          console.log(errors);
        }}
      >
        <Icon name="long-arrow-right" size={40} color="white"></Icon>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: "#fd796f",
  },
  input: {
    width: 200,
    margin: 10,
    height: 40,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#6497b1",
    shadowRadius: 4,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 1,
  },
  submitButton: {
    margin: 10,
    width: 200,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#03396c",
    borderRadius: 15,
    shadowColor: "#6497b1",
    shadowRadius: 4,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 1,
  },
});
