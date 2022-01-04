import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Game from '../pages/Game/Game';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen 
          name="Game" 
          component={Game} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;