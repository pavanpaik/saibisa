Ionic Framework App 1.14.0 comes with Ionic Framework 3.9.2. You can find the project into the ionic-3.9.2 folder.

Install Ionic Framework App
$ npm install -g ionic@latest

Browse the App
$ cd ionic2app

Install package.json dependencies
$ npm install

Install Cordova/PhoneGap plugins (Cordova Plugins package.json branch dependencies)
$ ionic state restore

cordova plugin add cordova-plugin-compat
ionic cordova prepare


Test your app on multiple screen sizes and platform types by starting a local development server
$ ionic serve
or
$ ionic serve --lab 

Build iOS
$ ionic state restore
$ ionic platforms add ios
$ ionic build ios --prod

Or with Ionic CLI 3 https://ionicframework.com/docs/cli/

$ ionic cordova platform rm ios
$ ionic cordova platform add ios
$ ionic cordova build ios --prod

Build Android
$ ionic state restore
$ ionic platforms add android
$ ionic build android --prod

ionic cordova build android

Or with Ionic CLI 3 https://ionicframework.com/docs/cli/

$ ionic cordova platform rm android
$ ionic cordova platform add android
$ ionic cordova build android --prod

Build Android (Production)
$ ionic state restore
$ ionic platforms add android
$ ionic build android --release --prod

(make use of the android-armv7* in case of crosswalk usage)
$ cd platforms/android/build/outputs/apk/

$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name

$ /Users/gtsopour/Development/sdk/build-tools/21.1.2/zipalign -v 4 android-release-unsigned.apk ionic2app.apk

/Users/gtsopour should be replaced from your user name.
