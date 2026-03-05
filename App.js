import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { clearAllInPageAnswers } from './src/storage/checkinStorage';

const App = () => {
  useEffect(() => {
    clearAllInPageAnswers();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
};

export default App;
