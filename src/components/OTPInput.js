import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";

function OTPInput(props) {
  const { length, value, disabled, onChange } = props;
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newValue = [...value];
    newValue[index] = text;
    onChange(newValue);
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && value[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={GlobalStyles.centerScreen}>
      <View style={styles.container}>
        {Array.from({ length }).map((_, index) => (
          <TextInput
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            key={index}
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            keyboardType="decimal-pad"
            testID={`OTPInput-${index}`}
            style={[styles.input, value[index] && styles.focusInput]}
            value={value[index]}
            onChangeText={text => {
              handleInputChange(text, index);
              if (text && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
              }
            }}
            onKeyPress={event => handleKeyPress(event, index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    fontSize: 24,
    color: primaryColor.blackPrimary,
    textAlign: "center",
    width: 45,
    height: 55,
    borderRadius: 10,
    borderColor: primaryColor.yellowPrimary,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: primaryColor.whitePrimary
  },
  focusInput: {
    borderColor: primaryColor.darkPrimary,
  }
});

export default OTPInput;
