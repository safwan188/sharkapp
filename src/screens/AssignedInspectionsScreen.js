import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,ImageBackground,Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiReports from '../API/apiReports'; // Ensure this path is correct
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignedInspectionsScreen = () => {
  const navigation = useNavigation();
  const [assignedInspections, setAssignedInspections] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // Call this function when the screen is focused
      const expertId = await AsyncStorage.getItem('expertId');
      if (expertId) {
        try {
        const inspections = await apiReports.getReportsByExpertId(expertId);
        setAssignedInspections(inspections.data);

        }
        catch (error) {
          Alert.alert( 'שגיאה בטעינת הדוחות', 'אנא נסה שנית');
          console.error(error);
        }
        
      }
    });
    
    return unsubscribe; // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [navigation]);

  const renderItem = ({ item }) => (
  
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('InspectionReport', { report: item })}
    >
      <Text style={styles.title}>דוח: {item.customer.name}</Text>
      <Text style={styles.title}>{item.customer.name}</Text>
      <Text style={styles.detailText}>עיר : {item.property.cityName}</Text>
      <Text style={styles.detailText}>תחום : {item.subject}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      {assignedInspections.length === 0 ? (
        <View style={styles.container}>
        <Text style={styles.Text}>אין דוחות</Text>

        </View>
        
      ) : (
    <View style={styles.container}>
      <FlatList
        data={assignedInspections}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>)}
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
    backgroundColor: 'rgba(255,255,255,0.15)', // A neutral white background
  },
  itemContainer: {
    backgroundColor: 'rgb(255, 255, 153)', // Light yellow color for the item background
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, // Slightly more rounded corners for a modern look
    borderWidth: 1, // A subtle border
    borderColor: '#e0e0e0', // Light grey border color
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker color for better readability
    marginBottom: 5, // Space after the title
  },
  detailText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#555', // A slightly lighter color for subtext
    marginBottom: 4, // Consistent spacing for all items
  },
});

  
export default AssignedInspectionsScreen;
