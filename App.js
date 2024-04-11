import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text } from 'react-native'; 
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'; 
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator(); 

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerTitle}>My Travel Planner</Text>
    </SafeAreaView>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>  
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3399ff',
    padding: 15,
    alignItems: 'center' 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default App;
