package com.ollievideo;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.zolad.videoslimmer.*;



import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class RNTranscode extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;


    RNTranscode(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "RNTranscode";
    }

    @ReactMethod
    public void transcodeVideo(String uri, Callback callback) {
        callback.invoke("Starting to Transcode");

        // Idk if the file:/// prefix will always be there and how best to handle it if not
        String uriModified = uri.replaceFirst("file:///", "");

        // There might be a better way to do this, but I am just putting a 1 before the final . in the uri to make the filename unique
        int pos = uriModified.lastIndexOf('.');
        String newUri = uriModified.substring(0, pos) + "1" + uriModified.substring(pos);

        VideoSlimmer.convertVideo(uriModified, newUri, 480, 848, 200 * 360 * 30, new VideoSlimmer.ProgressListener() {
            @Override
            public void onStart() {
            }

            @Override
            public void onFinish(boolean result) {
                if (result) {
                    WritableMap params = Arguments.createMap();
                    params.putString("result", newUri);
                    params.putInt("percent", 100);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onDone", params);
                }
                else {
                    WritableMap params = Arguments.createMap();
                    params.putString("result", null);
                    params.putInt("percent", 100);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onError", params);
                }
            }


            @Override
            public void onProgress(float percent) {
                WritableMap params = Arguments.createMap();
                params.putDouble("percent", percent);
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onProgress", params);
            }
        });

    }
}