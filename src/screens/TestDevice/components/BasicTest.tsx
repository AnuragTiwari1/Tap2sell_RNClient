import React from 'react';
import {BasicSensorTest} from './BasicSensorTest';
import {
  BluetoothModule,
  BatteryModule,
  CameraModule,
} from '../../../NativeModules';
import {requestCameraPermission} from './utils';

export const TestBackCamera = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    pendingText="Testing device back camera"
    failedText="Back Camera didn't worked"
    passText="Back Camera working fine"
    testSensor={() =>
      requestCameraPermission().then(() => {
        return CameraModule.isBackCameraWorking();
      })
    }
    iconType="font-awesome"
    iconName="camera"
    handleStatusChange={handleStatusChange}
  />
);

export const TestFrontCamera = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    pendingText="Testing device front camera"
    failedText="Front Camera didn't worked"
    passText="Front Camera working fine"
    testSensor={async () => {
      try {
        await requestCameraPermission();
        const outcome = CameraModule.isFrontCameraWorking();
        return outcome;
      } catch (error) {
        handleStatusChange('errored');
      }
    }}
    iconType="font-awesome"
    iconName="camera"
    handleStatusChange={handleStatusChange}
  />
);

export const TestBluetooth = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    testSensor={BluetoothModule.isBluetoothWorking}
    iconName="bluetooth-b"
    iconType="font-awesome"
    pendingText="Testing Bluetooth Sensor"
    passText="Bluetooth is working"
    failedText="Bluetooth is failed"
    handleStatusChange={handleStatusChange}
  />
);

export const TestBattery = ({
  handleStatusChange,
}: {
  handleStatusChange: (x: any) => void;
}) => (
  <BasicSensorTest
    testSensor={() =>
      BatteryModule.getBatteryHealth().then(
        (status: string) => status === 'Good',
      )
    }
    iconName="md-battery-charging"
    iconType="ionicon"
    pendingText="Testing Device Battery"
    passText="Battery health is good"
    failedText="Failed to determine battery health"
    handleStatusChange={handleStatusChange}
  />
);
