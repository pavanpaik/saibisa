

Build Android
```
ionic cordova platform rm android
ionic cordova platform add android@6.4.0 --save
ionic cordova prepare android
ionic cordova build android --prod
```
https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/158
Open platforms\android\cordova-plugin-crosswalk-webview\eqp-xwalk.gradle

change this:
```
dependencies {
compile xwalkSpec
}
```
to this one:
```
dependencies {
compile 'org.xwalk:xwalk_core_library:23.53.589.4' //xwalkSpec
}
```

https://stackoverflow.com/questions/47413647/ionic-android-build-error-all-flavors-must-now-belong-to-a-named-flavor-dimen

```
android { 
    ...
    flavorDimensions "default"
    ...
} 
```

https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/205#issuecomment-371669478

```
ionic cordova build android --release --prod
cd platforms/android/build/outputs/apk/
```