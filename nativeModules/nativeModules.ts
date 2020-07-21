import React from "react";
import { NativeModules } from "react-native";

export function nativeModules() {
  const TranscodeModule = NativeModules.RNTranscode;

  return { TranscodeModule };
}
