import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';

/**
 * App is the root component of the application, rendering the HomeScreen and a status bar.
 */
const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;