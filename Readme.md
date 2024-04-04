# Just Ask A QuesTok

This project is a simplified version of a TikTok-style video player, allowing users to view short videos, swipe up to see the next video, and double-tap to 'like' a video. The project is split into two main parts: a React Native frontend app and a Node.js/Express backend server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (https://nodejs.org/)
- Expo CLI for React Native development (`npm install -g expo-cli`)
- A text editor or IDE of your choice
- Git for version control

### Installing

#### Backend Setup

1. Clone the repository to your local machine.
2. Navigate to the backend directory: `cd services`
3. Install the necessary npm packages: `npm install`
4. Start the server: `npm start` or `node server.js`
5. The server will start on `http://localhost:3000`.

#### Frontend Setup

1. Navigate back to the frontend (root) directory: `cd ..`
2. Install the necessary npm packages: `npm install`
3. Start the Expo development server: `expo start`
4. Follow the on-screen instructions to open the app on an iOS/Android simulator or your physical device using the Expo Go app.

### Usage

- The app displays a list of videos fetched from the backend server.
- Swipe up to navigate to the next video.
- Double-tap on a video to 'like' it. Likes are updated in real-time and persisted on the backend.

## Built With

- [React Native](https://reactnative.dev/) - The framework used for the mobile app
- [Expo](https://expo.io/) - Open-source platform for making universal native apps
- [Node.js](https://nodejs.org/) - JavaScript runtime for the backend
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [cors](https://www.npmjs.com/package/cors) - Node.js package for providing a Connect/Express middleware that can be used to enable CORS

## Authors

- **Catalin Magirescu** - [catalin3003](https://github.com/catalin3003)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
