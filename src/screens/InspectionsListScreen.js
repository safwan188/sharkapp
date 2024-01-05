import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiReports from '../API/apiReports'; // Ensure this path is correct

const InspectionsListScreen = () => {
  const navigation = useNavigation();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await apiReports.getAllReports();
        setInspections(response.data);
        setError(null); // Reset the error if the fetch is successful
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchReports);
    return unsubscribe; // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('InspectionDetails', { report: item })}
    >
      <Text style={styles.title}>דוח: {item.customer.name}</Text>
      <Text style={styles.detailText}>עיר:{item.property.cityName}</Text>
      <Text style={styles.detailText}>תחום: {item.subject}</Text>
    </TouchableOpacity>
  ), [navigation]);

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Failed to load data: {error.message}</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      {inspections.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.Textempty}>אין דוחות</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={inspections}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)', // A light background color for the screen
  },
  itemContainer: {
    textAlign: 'right',
    backgroundColor: '#E3F2FD', // A light blue background for each item
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3, // Add shadow for Androidcc
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1976D2', // A darker blue color for the title
    marginBottom: 5, // Add some space below the title
  },
  detailText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#424242', // A color for secondary text
    marginBottom: 3, // Space between text lines
  },
  // If you have an ActivityIndicator, style it as well
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textempty: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black', // A slightly lighter color for subtext
    marginBottom: 4, // Consistent spacing for all items
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add styles for the retry button
  retryButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
  },
});

export default InspectionsListScreen;
