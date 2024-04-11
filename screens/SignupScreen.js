import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBHpqui4uoEgZMVgk7XFBvHw8G6QPfRSWU",
      authDomain: "travelplanner-2a023.firebaseapp.com",
      databaseURL: "https://travelplanner-2a023-default-rtdb.firebaseio.com",
      projectId: "travelplanner-2a023",
      storageBucket: "travelplanner-2a023.appspot.com",
      messagingSenderId: "258029210142",
      appId: "1:258029210142:web:80b4c7f2303f85273bbc0f"
    };
    const app = initializeApp(firebaseConfig);
    setInitialized(true);
  }, []);

  const auth = getAuth();

  const handleSignup = () => {
    if (!initialized) {
      return; 
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Login');
        console.log('User account created!');
        
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none" 
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <Button title="Sign Up" onPress={handleSignup} />

      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15,
    width: '80%' 
  },
  label: {
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5 
  },
  errorText: {
    marginTop: 10,
    color: 'red'
  }
});

export default SignupScreen;
