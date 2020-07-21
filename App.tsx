import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  NativeEventEmitter,
  Image,
  ScrollView,
} from "react-native";
import { nativeModules } from "./nativeModules/nativeModules";
import { saveToCameraRoll } from "@react-native-community/cameraroll";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { TakePictureOrVideo, ChoosePictureOrVideo } from "./camera.service.rn";

export default function App() {
  const { TranscodeModule } = nativeModules();
  const [isRunning, setIsRunning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [imageUri, setImageUri] = useState<string>();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoUri, setVideoUri] = useState<string>();
  const [isVideoVertical, setIsVideoVertical] = useState(true);
  const [videoHeight, setVideoHeight] = useState(0);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoThumbnailUri, setVideoThumbnailUri] = useState<string>();

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(TranscodeModule);
    const subProgress = eventEmitter.addListener("onProgress", (data) => {
      if (data.percent) {
        setPercent(data.percent);
        if (data.percent === 100) {
          setIsRunning(false);
        }
      }
    });
    const subDone = eventEmitter.addListener("onDone", (data) => {
      if (data.result) {
        setPercent(100);
        setIsRunning(false);
        saveToCameraRoll(data.result, "video");
        console.log("Saved!!!");
        setVideoUri(data.result);
        setPlayVideo(true);
        generateThumbnail(data.result);
      }
    });
    const subError = eventEmitter.addListener("onError", (data) => {
      console.log(data);
    });
    return () => {
      eventEmitter.removeAllListeners("onProgress");
      eventEmitter.removeAllListeners("onDone");
      eventEmitter.removeAllListeners("onError");
    };
  }, []);

  const generateThumbnail = async (videoUri: string) => {
    try {
      console.log(videoUri);
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 15000,
      });
      setVideoThumbnailUri(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={async () => {
            const video = await TakePictureOrVideo({
              options: {
                mediaType: "video",
                durationLimit: 15,
                videoQuality: "high",
              },
              callback: (video) => {
                if (video) {
                  TranscodeModule.transcodeVideo(video.uri, (res) => {
                    console.log(res);
                  });
                  setVideoHeight(video.height);
                  setVideoWidth(video.width);
                  setIsVideoVertical(video.width < video.height);
                }
              },
            });
          }}
        >
          <Text>Take Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={async () => {
            const photo = await ChoosePictureOrVideo({
              options: {
                mediaType: "video",
                durationLimit: 15,
              },
              callback: (video) => {
                if (video) {
                  TranscodeModule.transcodeVideo(video.uri, (res) => {
                    console.log(res);
                  });
                  setVideoHeight(video.height);
                  setVideoWidth(video.width);
                  setIsVideoVertical(video.width < video.height);
                }
              },
            });
          }}
        >
          <Text>Choose Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={async () => {
            const photo = await TakePictureOrVideo({
              options: {
                mediaType: "photo",
                quality: 1.0,
              },
              callback: (photo) => {
                if (photo) {
                  setImageUri(photo.uri);
                }
              },
            });
          }}
        >
          <Text>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={async () => {
            const photo = await ChoosePictureOrVideo({
              options: {
                mediaType: "photo",
              },
              callback: (photo) => {
                if (photo) {
                  setImageUri(photo.uri);
                }
              },
            });
          }}
        >
          <Text>Choose Picture</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{percent === 100 ? "Done" : `${percent}%`}</Text>
      </View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      {videoThumbnailUri && (
        <Image
          source={{ uri: videoThumbnailUri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {videoUri ? (
        <View>
          <Text>{`Video width: ${videoWidth}, height: ${videoHeight}`}</Text>
          <Text>{`VideoIsVertical value: ${isVideoVertical}`}</Text>
          <TouchableOpacity
            onPress={() => {
              setPlayVideo(!playVideo);
            }}
          >
            <Text>{playVideo ? "Stop Video" : "Play Video"}</Text>
          </TouchableOpacity>
          <VideoPlayer
            videoProps={{
              shouldPlay: playVideo,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: videoUri,
              },
            }}
            height={isVideoVertical ? 640 : 240}
            width={360}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
