import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Colors } from "@/constants/colors";
import { postReservation } from "@/api";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

const Modal: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const [email, setEmail] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");

  const makeReservation = useCallback(async () => {
    try {
      if (!email || !telephone) {
        return;
      }
      const payload = {
        eventId: id as string,
        email,
        telephone,
      };
      await postReservation(payload);
      router.back();
      Toast.show({
        type: "success",
        text1: "Reservation made successfully",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        router.back();
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: errorMessage,
        });
      }
    }
  }, [email, id, telephone]);

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={Colors.dark}
        style={styles.input}
        keyboardType={"email-address"}
        enterKeyHint={"next"}
        placeholder="Email"
      />
      <TextInput
        value={telephone}
        onChangeText={setTelephone}
        placeholderTextColor={Colors.dark}
        style={[styles.input, { marginTop: 16 }]}
        keyboardType={"numbers-and-punctuation"}
        placeholder="Telephone"
        enterKeyHint={"done"}
      />
      <Pressable onPress={makeReservation} style={styles.button}>
        <Text style={styles.buttonText}>Book this event</Text>
      </Pressable>
      <Pressable
        onPress={router.back}
        style={[styles.button, styles.secondary]}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  input: {
    alignSelf: "stretch",
    borderColor: Colors.secondary,
    padding: 4,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    alignSelf: "stretch",
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Modal;
