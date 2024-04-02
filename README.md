# Memories

Memories is an app that lets you collect your photos and showcase them as specific events or moments in your past. For example, you went on a skiing trip to Canada and took a bunch of photos. You’d like to use some or all of those photos to share with others but in a beautifully curated manner. The memories app lets you create a showcase for your photos.

Demo:

https://github.com/paldeep-singh/memories/assets/48742122/32efda1f-05c6-4320-85ca-87d65949b855



## Running the app

The app can be run in a simulator or on an actual Android or iOS device using the [Expo Go app](https://expo.dev/go).

### Requirements

Ensure you have installed the [prerequisites](https://docs.expo.dev/guides/local-app-development/#prerequisites) for your desired OS (iOS or Android).

> Note: I have only tested this app on iOS so far as I do not have an Android device or Android Studio set up.

Once the prerequisites are installed, clone the repository and run `npm install` to install dependencies.

#### Running on a physical device using Expo Go:

1. Ensure your computer and mobile device are connected to the same Wi-Fi network.
2. Install the Expo Go app on your device ([iOS](https://apps.apple.com/us/app/expo-go/id982107779), [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&pli=1))
3. `npm run start`
4. Scan the QR code that appears in the terminal using your device's camera.

#### Running in a simulator

- iOS: `npm run ios`
- Android: `npm run android`

## Running Tests

Tests can be run using `npm run test`.

Tests are written using [jest](https://jestjs.io/)(specifically the [jest-expo](https://www.npmjs.com/package/jest-expo) preset) and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/). [Faker.js](https://fakerjs.dev/) is used to generate fake realistic data for tests.

## Components

Code for components can be found in the `components` folder. Their corresponding tests can be found in `components/__tests__`.

### PhotoFrame

A component for displaying images in a polaroid-style frame. Uses Expo Image.

### Album

A component for displaying a scrollable list of PhotoFrames. Uses FlashList.

### Showcase

A component for displaying an animated showcase of photos using PhotoFrames. Provides an input option for specifying the delay between each image sliding onto the screen.

### Button

A simple Button component making use of React Native's `TouchableOpacity` component.

## Technologies/Libraries Used

### [React Native](https://reactnative.dev/) & [Expo](https://docs.expo.dev/faq/)

The app has been built with React Native and Expo. Expo provides a suite of tools that make it easier to develop React Native applications. This app was created from the `create-expo-app` [Typescript template](https://docs.expo.dev/guides/typescript/#get-started), making it an [Expo-managed](https://docs.expo.dev/archive/managed-vs-bare/) app (one where devs can focus on writing JS/TS and offload the rest of the complexity of managing React Native apps to Expo tools and services).

### [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)

A performant replacement for React Native's `Image` component that is able to prefetch images and cache them in memory, allowing them to be quickly loaded for the showcase.

### [Expo StatusBar](https://docs.expo.dev/versions/latest/sdk/status-bar/)

Provides slightly different defaults to React Native's StatusBar API that work better in Expo environments. Included in Expo-managed apps by default.

### [FlashList](https://docs.expo.dev/versions/latest/sdk/flash-list/)

A performant drop-in replacement for React Native's `Flatlist` component.

### [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

Provides programattic acess to device safe-area inset information to ensure content is not blocked behind notches, status bars, etc..

### [Prettier](https://prettier.io/)

Opinionated code formatter.

### [ESLint](https://eslint.org/)

Static analyser to identify code quality issues.

### [prettier-eslint](https://github.com/prettier/prettier-eslint)

Formats code using Prettier before fixing linting errors with ESLint.
