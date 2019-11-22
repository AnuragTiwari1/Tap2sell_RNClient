package com.tap2sell;

import android.view.KeyEvent;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Tap2Sell";
  }

  @Override
  // catches the onKeyDown button event
  public boolean onKeyDown(int keyCode, KeyEvent event) {

    DeviceAudioModule.getInstance().onKeyDownEvent(keyCode,event);
    return super.onKeyDown(keyCode,event);
  }
}
