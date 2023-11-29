import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, ScrollView, Alert ,ImageBackground,Dimensions} from 'react-native';
import axios from 'axios'; // make sure to install axios with npm or yarn
import apiExpertRequest from '../API/apiExpertRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InspectionDetailScreen = ({ route, navigation }) => {
  const { report } = route.params;
  const [selectedDate, setSelectedDate] = useState(report.availableStartingDates?.[0]);
  const [modalVisible, setModalVisible] = useState(false);
  


  const confirmDate = async () => {
  
    if (selectedDate) {
      console.log(report._id);
      console.log(selectedDate);
      console.log(await AsyncStorage.getItem('expertId'));

      try {
        const response = await apiExpertRequest.createRequest( {
          report: report._id,
          expert:await AsyncStorage.getItem('expertId'),
          date: selectedDate,
          status: 'pending',

        });
        // Check response status or data if needed
        if (response.status === 200) {
          setModalVisible(true);
          // Optionally navigate back or refresh data
        
        } else {
          // Handle any errors according to your API's response structure
          console.error('שגיאה ', response.data.error);
        }
      } catch (error) {
        console.error('שגיאה ', error.message);
      }
    }
  };
  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>דוח: {report.customer.name}</Text>
        <Text style={styles.text}>עיר: {report.property.cityName}</Text>
        <Text style={styles.text}>רחוב: {report.property.street}</Text>
        <Text style={styles.text}>בניין מס: {report.property.propertyNumber}</Text>
        <Text style={styles.text}>תחום: {report.subject}</Text>
        <Text style={styles.text}>תיאור: {report.description}</Text>
  
        {report.availableStartingDates?.length ? (
          <>
            <Text style={styles.dateText}>בחר אחד מהתאריכים הבאים:</Text>
            <View style={styles.dateContainer}>
            {report.availableStartingDates.map((date, index) => (
  <TouchableOpacity 
    key={index} 
    style={[
      styles.dateButton, 
      selectedDate === date && styles.selectedDateButton // Add this line
    ]} 
    onPress={() => setSelectedDate(date)}
  >
    <Text style={styles.dateButtonText}>{new Date(date).toLocaleDateString()}</Text>
  </TouchableOpacity>
))}
            </View>
            <Text style={styles.selectedDateText}>{`תאריך שבחרת: ${selectedDate ? new Date(selectedDate).toLocaleDateString() : 'None'}`}</Text>
            <TouchableOpacity style={styles.customButton} onPress={confirmDate}>
              <Text style={styles.customButtonText}>שמור</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noDatesText}>No available dates.</Text>
        )}
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>בקשה נשלחה</Text>
              {selectedDate && <Text style={styles.modalInfoText}>{`בחרת בתאריך: ${new Date(selectedDate).toLocaleDateString()}`}</Text>}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible);
                navigation.navigate('InspectionsList'); }}
              >
                <Text style={styles.textStyle}>סגור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#0056b3',
    textAlign: 'center',
  },
  text: {
    textAlign: 'right',
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    lineHeight: 24,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 5,
    backgroundColor: '#e7e7e7',
    borderRadius: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#0277bd',
    textAlign: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  noDatesText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 15,
  },
  customButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  customButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004ba0',
  },
  modalInfoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#007bff',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedDateButton: {
    backgroundColor: 'blue', // Or any color you want for the selected date
    // You can add other styles if needed
  },
});

    export default InspectionDetailScreen;