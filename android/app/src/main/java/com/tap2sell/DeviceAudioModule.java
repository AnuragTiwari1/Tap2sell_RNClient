package com.tap2sell;

import android.media.AudioManager;
import android.media.MediaPlayer;
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

import java.util.Random;

public class DeviceAudioModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String EVENT_NAME = "micAudioChange";

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
                    sendEvent(reactContext, EVENT_NAME, params);
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

    @ReactMethod
    public void testSpeaker(Promise promise){
        int audioFile= new Random().nextInt(5);
        int fileName;
        if(audioFile==0){
         fileName=R.raw.out000;
        }else if(audioFile==1){
            fileName=R.raw.out001;
        } else if(audioFile==2){
            fileName=R.raw.out002;
        }else if(audioFile==3){
            fileName=R.raw.out003;
        }else {
            fileName=R.raw.out004;
        }
        MediaPlayer mp = MediaPlayer.create(this.reactContext,fileName);
        mp.start();
        promise.resolve(audioFile+1);
    }

    @ReactMethod
    public void isWiredHeadsetConnected(Promise promise) {
        AudioManager mAudioMgr = (AudioManager)reactContext.getSystemService(reactContext.AUDIO_SERVICE);
        if(mAudioMgr.isWiredHeadsetOn()){
            promise.resolve(true);
        }
        else promise.resolve(false);
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