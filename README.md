# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the project (please note that app was develop working on iOS simulator. Use iOS simulator, didn't run on android)

   ```bash
    yarn ios
   ```
   
## NOTES FOR REVIEWERS
- I used brand new expo-router which I wasn't familiar with.
Still used it to learn something new.

- Created a small filter component just to prove my experience with reanimated.
Tried to optimize the flatlist using memoization and useCallback, keyExtractor, etc.
- I've could you getItemLayout since every element has the same height, but since there wasn't image, there wasn't hard rendering
- I didn't use any UI library cause of the lack of time.
- I could create a custom loading with react-native-lottie
- more validation
- some unit tests or e2e tests with Maestro CLI

I would me more than happy to explain my decisions and the code in a call.
