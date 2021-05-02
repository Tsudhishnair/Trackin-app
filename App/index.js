import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import OnboardingScreen from './screens/OnBoarding';
import Navbar from './components/Navbar';
import { MainContextProvider } from './contexts/MainContext';
import colors from './config/colors';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstTimeOfUser, setIsFirstTimeUser] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      let userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails === null) {
        setIsFirstTimeUser(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const setUserDetails = async value => {
    try {
      const dataObj = { isFirstTimeOfUser: value };
      await AsyncStorage.setItem('userDetails', JSON.stringify(dataObj));
      setIsFirstTimeUser(false);
    } catch (error) {
      alert(error);
    }
  };

  const screenNames = {
    Home: 'Home',
    Onboarding: 'Onboarding',
  };

  if (isFirstTimeOfUser) {
    return <OnboardingScreen setIsFirstTimeUserValue={setUserDetails} />;
  }

  return (
    <>
      <SafeAreaView style={styles.topContainer} />
      <SafeAreaView style={styles.rootContainer}>
        <NavigationContainer>
          <MainContextProvider>
            <Stack.Navigator
              initialRouteName={screenNames.Home}
              screenOptions={{
                header: props => <Navbar {...props} />,
              }}>
              <Stack.Screen name={screenNames.Home} component={Home} />
            </Stack.Navigator>
          </MainContextProvider>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  topContainer: {
    flex: 0,
    backgroundColor: colors.brandColor,
  },
});
