# Festival App

A React Native mobile application for a music festival, allowing users to browse artists, view the festival schedule, purchase tickets, and navigate the festival grounds.

## 📱 Features

- **Festival Program**: Browse the complete lineup of artists and performances
- **Interactive Map**: Navigate the festival grounds with an interactive map
- **Ticket Purchase**: Buy tickets directly through the app
- **Shopping Cart**: Manage your ticket purchases
- **User Profile**: Create and manage your festival profile
- **Artist Details**: View detailed information about performing artists

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS: macOS with Xcode
- For Android: Android Studio with Android SDK

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Netizor/react_native.tp-festival.git tp-festival
   cd tp-festival
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. Configure the API endpoint:
   - Open `constants/config.ts` and set your IP address:
     - For Expo Go: use your local machine's IP address
     - For Android emulator: use `http://10.0.2.2:3000`
     - For iOS simulator: use `http://127.0.0.1:3000`

2. Start the mock API server:
   - Navigate to the `_api` directory
   - Run the following command to start the JSON server:
     ```bash
     npx json-server --watch db.json --host 0.0.0.0 --port 3000
     ```

## 🏃‍♂️ Running the App

- **Using Expo Go**:
  ```bash
  npx expo start
  ```
  Then scan the QR code with the Expo Go app on your device.

- **On Android Emulator**:
  ```bash
  npx expo run:android
  ```

- **On iOS Simulator**:
  ```bash
  npx expo run:ios
  ```

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/) - Mobile app framework
- [Expo](https://expo.dev/) - React Native toolchain
- [Expo Router](https://docs.expo.dev/router/introduction/) - Navigation library
- [React Navigation](https://reactnavigation.org/) - Navigation components
- [Leaflet](https://leafletjs.com/) (via react-native-leaflet-view) - Interactive maps
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local data storage
- [JSON Server](https://github.com/typicode/json-server) - Mock API server

## 📁 Project Structure

```
tp-festival/
├── _api/                  # Mock API server
├── app/                   # Application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── (drawer)/      # Drawer navigation screens
│   │   │   ├── billets.tsx  # Tickets screen
│   │   │   ├── cart.tsx     # Shopping cart
│   │   │   └── profil.tsx   # User profile
│   │   ├── index.tsx      # Home screen
│   │   ├── menu.tsx       # Menu screen
│   │   ├── plan.tsx       # Map screen
│   │   └── programmation.tsx # Program/schedule screen
├── assets/                # Static assets
├── components/            # Reusable components
├── constants/             # App constants and configuration
├── models/                # TypeScript interfaces/types
└── services/              # API and utility services
```

## 🐛 Known Issues

- The `_expand` option is not working with json-server@1.0.0-beta.3. See [this issue](https://github.com/typicode/json-server/issues/1638) for more details.

## 👥 Contributors

- **Baby Cheickne (See [my profile](https://github.com/Netizor))**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
