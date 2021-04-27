import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Navbar from './components/Navbar';
import { MainContextProvider } from './contexts/MainContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainContextProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: props => <Navbar {...props} />,
          }}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </MainContextProvider>
    </NavigationContainer>
  );
}
