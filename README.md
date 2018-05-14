# App

TODO: description

## Installing

TODO: instructions

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for
development and testing purposes.

### Prerequisites

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/en/docs/install)

### One-time Setup

1. Clone this repo
2. `yarn install`

### Running

The app can be run from the sources using the following command:

`yarn dev`

The app can be run with a separate server:

#### Server
`yarn server:dev`

#### Electron
`yarn electron:dev`

##### Debugging Electron Main

Go to chrome://inspect/#devices and click `Open dedicated DevTools for Node`

Add a connection for localhost:5858

Connect after starting eleectron

#### Web
`yarn web:dev`

#### Android

You need the android tools setup and in your path, and `ANDROID_HOME` set in your environmnt, and your device plugged in via usb :(

`yarn native:dev`
`yarn android`

##### Android Simulator

Start the android emulator and ensure it shows up in `adb devices`.
See https://stackoverflow.com/questions/40898934/unable-to-connect-with-remote-debugger for debugging

`emulator @Nexus_7_Android_7`

`yarn native:dev`

`yarn android`

To bring up the dev menu:
`adb shell input keyevent 82`

##### Debugging

Install and run https://github.com/jhen0409/react-native-debugger/

#### IOS

You need xcode, and your device plugged in via usb

`yarn native:dev`
`yarn ios`

##### IOS Simulator

`yarn native:dev`
`yarn ios-sim`

##### Debugging

Install and run https://github.com/jhen0409/react-native-debugger/

### Build

Run `yarn build`.

We use [electron-builder](https://github.com/electron-userland/electron-builder) to create
distributable packages.

### Icons

Use https://github.com/dwmkerr/app-icon to generate icons sizes based on icon.png

`yarn global add react-native-icon && react-native-icon`

## Internationalization

If you want to help to translate the avx-token-app, you can copy the `en.json` file in `/dist/locales/`
and modify the values while leaving the keys as their original English strings. An example for this
would be: `"Skip": "Überspringen",` Translations should automatically show up in options.

## License

[MIT © AVX Token Inc.](LICENSE)
