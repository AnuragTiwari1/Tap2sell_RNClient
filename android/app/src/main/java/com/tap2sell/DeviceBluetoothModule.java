package com.tap2sell;

import android.bluetooth.BluetoothAdapter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceBluetoothModule extends ReactContextBaseJavaModule {

    public DeviceBluetoothModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceBluetooth";
    }

    @ReactMethod
    public void isBluetoothWorking(Promise promise){
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (bluetoothAdapter == null) {
            promise.resolve(false);
        }
        else
        {
            promise.resolve(true);

        }
    }
}
