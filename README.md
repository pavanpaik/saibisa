## Setup Instructions

```
npm install -g ionic@latest
npm i -D -E @ionic/lab
```

Browse the App, Install package.json dependencies

```
cd ionic2app
npm install

ionic cordova platform add ios --save
ionic cordova platform add android@6.4.0 --save
ionic cordova prepare
```

```
ionic serve
```


Build Android
```
ionic cordova build android --prod
ionic cordova build android --release --prod
```

```
cd platforms/android/build/outputs/apk/armv7/release
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-armv7-release-unsigned.apk alias_name
curl https://raw.githubusercontent.com/maoxm/zipalign/master/zipalign >> zipalign
chmod 775 zipalign
./zipalign -vf 4 android-armv7-release-unsigned.apk saibisa-app.apk
```

## Issues

### Issue 1
https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/158

Modify the file `platforms\android\cordova-plugin-crosswalk-webview\eqp-xwalk.gradle`

```
dependencies {
    //compile xwalkSpec
    compile 'org.xwalk:xwalk_core_library:23.53.589.4'
}
```

### Issue 2
https://stackoverflow.com/questions/47413647/ionic-android-build-error-all-flavors-must-now-belong-to-a-named-flavor-dimen

Modify the file `platforms\android\build.gradle`
```
android { 
    ...
    flavorDimensions "default"
    ...
} 
```

### Issue 3
https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/205#issuecomment-371669478

Modify the file `platforms\android\build.gradle`
```
configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}
```

### Issue 4

https://github.com/phonegap/phonegap-plugin-barcodescanner/issues/535#issuecomment-325153055

```
./patch.sh
```

### Issue 5
If you dont find zipalign for signing then download the executable from here - 
https://github.com/maoxm/zipalign/blob/master/zipalign


## Extras
```
cordova plugin add cordova-plugin-compat
ionic cordova platform rm android
ionic cordova platform add android@6.4.0 --save
ionic cordova prepare android
```
