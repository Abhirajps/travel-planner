import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth'; 
import TripCard from '../components/TripCard';


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
const firestore = getFirestore(app);
const auth = getAuth(app); 

const HomeScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'trips'), where('userId', '==', auth.currentUser ? auth.currentUser.uid : null)), 
      (querySnapshot) => {
        const updatedTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrips(updatedTrips);
      }
    );

    return () => unsubscribe();
  }, [auth]); 

  const handleAddTrip = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'trips'), {
        userId: auth.currentUser.uid,
        destination,
        startDate,
        endDate,
      });
      console.log('Trip added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding trip: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Trips</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <FlatList 
        data={trips}
        renderItem={({ item }) => (
          <TripCard trip={item} onPress={() => navigation.navigate('TripDetails', { tripId: item.id })} />
        )}
        keyExtractor={item => item.id} 
        style={styles.tripList}
      />

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Add Trip</Text>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date"
          value={endDate}
          onChangeText={setEndDate}
        />
        <Button title="Add Trip" onPress={handleAddTrip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tripList: {
    flex: 1, 
  },
  formContainer: {
    marginTop: 20,
  },
  formLabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;