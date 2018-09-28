# saibisa

This is a Hybrid application built using ionic framework as front end and wordpress as backend.

## Setup Instructions
```
//install framework components
npm install -g ionic@latest
npm i -D -E @ionic/lab

sudo gem install cocoapods
pod setup

//install general application dependencies
cd ionic2app
npm install

//install mobile/cordova application dependencies
ionic cordova platform add browser --save
ionic cordova platform add ios@4.5.4 --save
ionic cordova platform add android@6.4.0 --save
```

## Local Testing
### Web Testing
```
ionic serve --lab
```

### Mobile Testing
```
//List OS avilable for emulation
ionic cordova emulate ios --list
./platforms/ios/cordova/lib/list-emulator-images

//start the emulator with a specific OS
ionic cordova emulate ios --emulator --livereload --consolelogs --target "iPhone-X"

ionic cordova emulate android --emulator --livereload --consolelogs
```

## Release/Deployment

### Web
```
firebase deploy
```

## Mobile

### Generate Key
```
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

### Build apk
```
ionic cordova build android --prod
ionic cordova build android --release --prod
```

### Sign apk and Release

```
cp ${LOCAL_VAULT}/my-release-key.keystore ./platforms/android/build/outputs/apk/armv7/release/
cd platforms/android/build/outputs/apk/armv7/release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-armv7-release-unsigned.apk alias_name
curl https://raw.githubusercontent.com/maoxm/zipalign/master/zipalign >> zipalign
chmod 775 zipalign
./zipalign -vf 4 android-armv7-release-unsigned.apk saibisa-app.apk
```

Manually publish `saibisa-app.apk` using [play console](https://play.google.com/apps/publish)




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


### Issue 6
Emulator issue with temp fix.

Open file - `/Users/earth/Documents/labs/saibisa/ionic2app/platforms/android/cordova/lib/build.js`

Search for function `findBestApkForArchitecture`

Replace `buildResults.apkPaths`

with 
```
[
        "/Users/earth/Documents/labs/saibisa/ionic2app/platforms/android/build/outputs/apk/armv7/debug/android-armv7-debug.apk",
        "/Users/earth/Documents/labs/saibisa/ionic2app/platforms/android/build/outputs/apk/armv7/release/android-armv7-release-unsigned.apk",
        "/Users/earth/Documents/labs/saibisa/ionic2app/platforms/android/build/outputs/apk/x86/debug/android-x86-debug.apk",
        "/Users/earth/Documents/labs/saibisa/ionic2app/platforms/android/build/outputs/apk/x86/release/android-x86-release-unsigned.apk"
]
```

## Extras
```
cordova plugin add cordova-plugin-compat
ionic cordova platform rm android
ionic cordova platform add android@6.4.0 --save
ionic cordova prepare android

cordova emulate ios --list
```

## Push Notification setup using OneSignal

Working Setup using `onesignal-cordova-plugin` plugin
https://medium.com/appseed-io/how-to-integrate-onesignal-push-notifications-into-an-ionic-3-application-eb2fdc3e6176

Official documentation (has some extra steps for android and ios. Not tested yet.)
https://documentation.onesignal.com/docs/ionic-sdk-setup
https://ionicframework.com/docs/native/onesignal/