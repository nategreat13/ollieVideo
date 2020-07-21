import React, { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from "react-native-image-picker";

export async function TakePictureOrVideo(p: {
  options: ImagePickerOptions;
  callback: (result: ImagePickerResponse | undefined) => void;
}) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    p.callback(undefined);
  }

  ImagePicker.launchCamera(p.options, (result) => {
    p.callback(result);
  });
}

export async function ChoosePictureOrVideo(p: {
  options: ImagePickerOptions;
  callback: (result: ImagePickerResponse | undefined) => void;
}) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    p.callback(undefined);
  }

  ImagePicker.launchImageLibrary(p.options, (result) => {
    p.callback(result);
  });
}
