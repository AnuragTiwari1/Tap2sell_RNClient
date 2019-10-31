package com.tap2sell;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class DeviceAudioModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private RecordingThread mRecordingThread;
    private ReactContext reactContext;


    public DeviceAudioModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext=reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceAudio";
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void maybeStartRecording(){
        if(mRecordingThread==null){
            mRecordingThread = new RecordingThread(new AudioDataReceivedListener() {
                @Override
                public void onAudioDataReceived(double data) {
                    WritableMap params = Arguments.createMap();
                    params.putDouble("eventProperty", data);
                    sendEvent(reactContext, "EventReminder", params);
                }
            });
        }
        if (!mRecordingThread.recording()) {
            mRecordingThread.startRecording();
        }
    }

    private void maybeStopRecording(){
        if(mRecordingThread!=null){
            mRecordingThread.stopRecording();
        }
    }

    @ReactMethod
    public void testMicrophone(Promise promise){
        try {
            maybeStartRecording();
            promise.resolve("started recording");

        } catch (Exception e) {
            Log.e("TrackingFlow", "Exception", e);
            promise.reject("something went wrong");
        }
    }

    @Override
    public void onHostResume() { maybeStopRecording(); }

    @Override
    public void onHostPause() { maybeStopRecording(); }

    @Override
    public void onHostDestroy() {
        maybeStopRecording();
    }
}