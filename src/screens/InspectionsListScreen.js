import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator ,ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiReports from '../API/apiReports'; // Ensure this path is correct
import { Dimensions } from 'react-native';
const InspectionsListScreen = () => {
  const navigation = useNavigation();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe =navigation.addListener('focus', async () => {
      try {
        const response = await apiReports.getAllReports();
        // Store the entire report object
        setInspections(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    });
    
   return unsubscribe; // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [navigation]);

 // Update the renderItem function to include the new detailText style
const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => navigation.navigate('InspectionDetails', { report: item })}
  >
    <Text style={styles.title}>דוח: {item.customer.name}</Text>
    <Text style={styles.detailText}>עיר:{item.property.cityName}</Text>
    <Text style={styles.detailText}>תחום: {item.subject}</Text>
  </TouchableOpacity>
);



  if (error) {
    return (
      <View style={styles.container}>
        <Text>Failed to load data: {error.message}</Text>
      </View>
    );
  }

    return (
      <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
        {inspections.length === 0 ? (
          <View style={styles.container}>
            <Text   style={styles.Text}>אין דוחות</Text>
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
});

export default InspectionsListScreen;
