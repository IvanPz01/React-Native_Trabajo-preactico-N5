import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import PokemonsList from './components/PokemonsList';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="Home" component={AppContent} />
        <Drawer.Screen name="Pokemons" component={PokemonsList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const AppContent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.counter}>{counter}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => setCounter(counter + 1)} />
        <Button title="Decrement" onPress={() => setCounter(counter - 1)} />
        <Button title="Reset" onPress={() => setCounter(0)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    backgroundColor: 'blue',
  }
});
