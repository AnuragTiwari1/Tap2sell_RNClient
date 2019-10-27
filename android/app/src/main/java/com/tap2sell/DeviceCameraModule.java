package com.tap2sell;

import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Camera;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceCameraModule extends ReactContextBaseJavaModule {
    public DeviceCameraModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceCamera";
    }

    private boolean hasFrontCamera(Context context){
        if (context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FRONT)){
            // this device has a camera
            return true;
        } else {
            // no camera on this device
            return false;
        }
    }

    private boolean hasBackCamera(Context context){
        if (context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
            // this device has a camera
            return true;
        } else {
            // no camera on this device
            return false;
        }
    }

    private Camera openFrontFacingCamera() {
        int cameraCount = 0;
        Camera cam = null;
        Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
        cameraCount = Camera.getNumberOfCameras();
        for (int camIdx = 0; camIdx < cameraCount; camIdx++) {
            Camera.getCameraInfo(camIdx, cameraInfo);
            if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
                try {
                    cam = Camera.open(camIdx);
                } catch (RuntimeException e) {}
            }
        }

        return cam;
    }

    public static Camera getCameraInstance(){
        Camera c = null;
        try {
            c = Camera.open(); // attempt to get a Camera instance
        }
        catch (Exception e){
            System.out.println("Caught an error");
            // Camera is not available (in use or does not exist)
        }
        return c; // returns null if camera is unavailable
    }


    @ReactMethod
    public void isFrontCameraWorking(Promise promise){
        Context context = getReactApplicationContext();
        if(context!=null){
            if(hasFrontCamera(context)){
                Camera camera=openFrontFacingCamera();
                if(camera!=null){
                    camera.release();
                    camera=null;
                    promise.resolve(true);
                }else promise.resolve(false);
            }
            promise.resolve(false);
        }else promise.reject("Unexpected Error");
    }

    @ReactMethod
    public void isBackCameraWorking(Promise promise){
        Context context = getReactApplicationContext();
        if(context!=null){
            if(hasBackCamera(context)){
                Camera camera=getCameraInstance();
                if(camera!=null){
                    camera.release();
                    camera=null;
                    promise.resolve(true);
                }else promise.resolve(false);
            }
            promise.resolve(false);
        }else promise.reject("Unexpected Error");
    }
}
