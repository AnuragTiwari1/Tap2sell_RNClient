import {PermissionsAndroid} from 'react-native';

export async function requestCameraPermission() {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  } catch (err) {
    alert('Camera permission error');
  }
}

export async function requestMicPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
  } catch (err) {
    alert('Microphone permission error');
  }
}
