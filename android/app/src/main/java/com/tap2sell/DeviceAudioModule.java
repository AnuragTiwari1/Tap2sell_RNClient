package com.tap2sell;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;
import android.view.KeyEvent;
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
    public static final String BUTTON_EVENT = "buttonPress";

    private RecordingThread mRecordingThread;
    private ReactContext reactContext;
    private int audioFile=-1;
    private MediaPlayer mp;

    private static DeviceAudioModule instance = null;


    public DeviceAudioModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext=reactContext;
    }

    public static DeviceAudioModule initModule(ReactApplicationContext reactContext) {
        instance = new DeviceAudioModule(reactContext);
        return instance;
    }

    public static DeviceAudioModule getInstance() {
        return instance;
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

    public int getIndexedFile(int index){
        int fileName;
        if(index==0){
            fileName=R.raw.out000;
        }else if(index==1){
            fileName=R.raw.out001;
        } else if(index==2){
            fileName=R.raw.out002;
        }else if(index==3){
            fileName=R.raw.out003;
        }else {
            fileName=R.raw.out004;
        }
        return fileName;
    }

    @ReactMethod
    public void stopRecording(){
        maybeStopRecording();
    }

    @ReactMethod
    public void testSpeaker(Promise promise){
        audioFile= new Random().nextInt(5);
        int fileName=getIndexedFile(audioFile);

        mp = MediaPlayer.create(this.reactContext,fileName);
        mp.start();

        promise.resolve(audioFile+1);
    }

    @ReactMethod
    public void replay(Promise promise){
        if(audioFile>=0 && mp!=null){
            mp.start();
            promise.resolve(audioFile+1);
        }else promise.reject("File is lost"+audioFile+1);
    }

    @ReactMethod
    public void isWiredHeadsetConnected(Promise promise) {
        AudioManager mAudioMgr = (AudioManager)reactContext.getSystemService(reactContext.AUDIO_SERVICE);
        if(mAudioMgr.isWiredHeadsetOn()){
            promise.resolve(true);
        }
        else promise.resolve(false);
    }

    public boolean onKeyDownEvent(int i, KeyEvent event) {
        WritableMap params = Arguments.createMap();
         if ((i == KeyEvent.KEYCODE_VOLUME_DOWN)){
            params.putBoolean("volumeDown", true);
            sendEvent(reactContext, BUTTON_EVENT, params);
        } else if ((i == KeyEvent.KEYCODE_VOLUME_UP)){
            params.putBoolean("volumeUp", true);
            sendEvent(reactContext, BUTTON_EVENT, params);
        }
        return false;
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