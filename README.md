# saibisa

This is a hybrid mobile application (android and ios) built using ionic framework as front end and firebase as backend (using flame UI).

[Demo Link](https://saibisa-101.firebaseapp.com)

## Setup Instructions

### Install framework components
```
npm install -g ionic@latest
npm i -D -E @ionic/lab

sudo gem install cocoapods
pod setup
```

### Install general application dependencies
```
npm install
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

//start the emulator with a specific OS
ionic cordova emulate ios --emulator --livereload --consolelogs --target "iPhone-X"

ionic cordova emulate android --emulator --livereload --consolelogs
```


## Release/Deployment

### Web
```
npm upgrade -g firebase-tools

firebase deploy
```

### Mobile

#### Generate Icons and Splash screen

#### Generate Key
This is a one time process. The same key has to be used to sign the app before submitting to playstore.
```
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

#### Build apk
Note - Using `--prod` flag hangs the build because of a [known issue](https://github.com/ionic-team/ionic-app-scripts/issues/1426).

Until we get a permanent fix use the first command to generate prod build.
```
ionic cordova build android --aot --minifyjs --minifycss --release
ionic cordova build android --release --prod
```


### Sign apk and Release

Update version
-- package.json
-- config.json


```
rm node_module
npm install
```

```
cp ${LOCAL_VAULT}/my-release-key.keystore ./platforms/android/build/outputs/apk/release/

cd ./platforms/android/app/build/outputs/apk/release/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

curl https://raw.githubusercontent.com/maoxm/zipalign/master/zipalign >> zipalign

chmod 775 zipalign

./zipalign -vf 4 app-release-unsigned.apk saibisa-app.apk
```

Manually publish `saibisa-app.apk` using [play console](https://play.google.com/apps/publish)