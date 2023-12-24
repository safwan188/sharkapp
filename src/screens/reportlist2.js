import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiReports from '../API/apiReports'; // Ensure this path is correct
import { Card } from 'react-native-elements';

I18nManager.forceRTL(false); // Force RTL layout

const InspectionsListScreen = () => {
  const navigation = useNavigation();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const response = await apiReports.getAllReports();
        setInspections(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('InspectionDetails', { report: item })}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{`דוח: ${item.customer.name}`}</Card.Title>
        <Card.Divider />
        <Text style={styles.detailText}>{`עיר: ${item.property.cityName}`}</Text>
        <Text style={styles.detailText}>{`תחום: ${item.subject}`}</Text>
      </Card>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Failed to load data: {error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      {inspections.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyText}>אין דוחות</Text>
        </View>
      ) : (
        <FlatList
          data={inspections}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  detailText: {
    fontSize: 18,
    color: '#555555',
    textAlign: 'right',
    marginBottom: 5,
  },
  listContainer: {
    paddingVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  emptyText: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
});

export default InspectionsListScreen;