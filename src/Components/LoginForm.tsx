import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types";
import { StyleSheet, TextInput, View } from "react-native";

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
  const inputFields = ["email", "password", "confirmPassword"];
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="email address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      ></Controller>
    </View>
  );
};
