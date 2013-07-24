package com.promosalpaso.mobile;

//import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class promosalpaso extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 60000);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}