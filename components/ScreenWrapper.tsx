import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScreenWrapper;
