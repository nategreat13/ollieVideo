import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export async function TakePhoto(): Promise<string | undefined> {
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
    return;
  }

  const image = await ImagePicker.launchCameraAsync();
  if (!image.cancelled) {
    return JSON.stringify({
      uri: image.uri,
      width: image.width,
      height: image.height,
    });
  }
  return undefined;
}

export async function SelectPhotoFromLibrary(): Promise<string | undefined> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  const image = await ImagePicker.launchImageLibraryAsync();
  if (!image.cancelled) {
    return JSON.stringify({
      uri: image.uri,
      width: image.width,
      height: image.height,
    });
  }
  return undefined;
}

export async function TakeVideo(): Promise<string | undefined> {
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
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    quality: 1.0,
    videoExportPreset: ImagePicker.VideoExportPreset.H264_960x540,
  });
  if (!result.cancelled) {
    return JSON.stringify({
      uri: result.uri,
      width: result.width,
      height: result.height,
    });
  }

  return undefined;
}

export async function SelectVideoFromLibrary(): Promise<string | undefined> {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CAMERA_ROLL
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  const video = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  });
  if (!video.cancelled) {
    return JSON.stringify({
      uri: video.uri,
      width: video.width,
      height: video.height,
    });
  }
  return undefined;
}
