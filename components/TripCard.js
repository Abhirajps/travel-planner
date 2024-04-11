import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TripCard = ({ trip, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image 
        source={require('../assets/baga-sea-beach.jpg')} 
        style={styles.image} 
        resizeMode="cover"  
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{trip.destination}</Text>
        <Text style={styles.dates}>{trip.startDate} - {trip.endDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000", 
    shadowOffset: { 
        width: 0,
        height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dates: {
    color: '#777',
    marginTop: 5,
  },
});

export default TripCard;
