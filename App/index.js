import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Navbar from './components/Navbar';
import { MainContextProvider } from './contexts/MainContext';
import colors from './config/colors';

const Stack = createStackNavigator();

export default function App() {
  const screenNames = {
    Home: 'Home',
  };
  
  return (
    <>
      <SafeAreaView style={styles.topContainer} />
      <SafeAreaView style={styles.rootContainer}>
        <NavigationContainer>
          <MainContextProvider>
            <Stack.Navigator
              initialRouteName="Home"
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
    backgroundColor:'#f1f1f1'
  },
  topContainer: {
    flex: 0,
    backgroundColor: colors.brandColor,
  },
});
