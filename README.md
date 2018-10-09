# saibisa

This is a Hybrid application built using ionic framework as front end and wordpress as backend.

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
firebase deploy
```

### Mobile

#### Generate Key
This is a one time process. The same key has to be used to sign the app before submitting to playstore.
```
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

#### Build apk
Note - Currently `--prod` flag needs to be rempved for this step to work.
```
ionic cordova build android --prod
ionic cordova build android --release --prod
```


### Sign apk and Release

```
cp ${LOCAL_VAULT}/my-release-key.keystore ./platforms/android/app/build/outputs/apk/release/

cd ./platforms/android/app/build/outputs/apk/release/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

curl https://raw.githubusercontent.com/maoxm/zipalign/master/zipalign >> zipalign

chmod 775 zipalign

./zipalign -vf 4 app-release-unsigned.apk saibisa-app.apk
```

Manually publish `saibisa-app.apk` using [play console](https://play.google.com/apps/publish)