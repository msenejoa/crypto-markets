# crypto-markets 

A react-native cryptomarket ticker using available api's. This project is a work in progress


## Requirements
- [node.js](https://nodejs.org/en/) 

## Front End Tools 
- [react.JS](https://facebook.github.io/react/) Front end Javascript framework
- [react-native](https://facebook.github.io/react-native/) program mobile apps in react 
- [react-native-pathjs-charts](https://github.com/capitalone/react-native-pathjs-charts) a charting library for react native
- [react-redux](http://redux.js.org/docs/basics/UsageWithReact.html) for state management


<img src="/screenshot-1.jpg" width="500">

Clone the repo: 
```
$ git clone https://github.com/msenejoa/crypto-markets crypto-markets 
$ cd crypto-markets
```
### Install node modules 
```
$ npm install
```


### `npm start`

Runs your app in development mode.

This app was made using [react-native official](https://facebook.github.io/react-native/releases/0.34/)

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

### Todo 

-add timeline feature
-add timeline active button view
-add statistics 
-add default btc view
-add default state tree
-BTC to USD converter
-change scrollview to include prices
