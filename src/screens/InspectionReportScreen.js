import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import apiReports from '../API/apiReports';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert,ImageBackground,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
   const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true, // Include this line to get base64 image
    };
const InspectionReportScreen = ({ route, navigation }) => {
  const { report } = route.params;
  const [images, setImages] = useState([]);
  const [textFields, setTextFields] = useState([]);

  const selectPhotoTapped = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Assuming `response.assets` is an array of selected images
        response.assets.forEach(asset => {
          const source = { uri: asset.uri };
          setImages(prevImages => [...prevImages, source]);
        });
      }
    });
  };

  const addNewTextField = () => {
    setTextFields([...textFields, { text: '' }]);
  };

  const updateTextField = (index, newText) => {
    const hebrewCharRegex = /[\u0590-\u05FF]/; // Regular expression for Hebrew characters
  
    if (newText.split('').every(char => hebrewCharRegex.test(char) || char.trim() === '')) {
      const newTextFields = [...textFields];
      newTextFields[index].text = newText;
      setTextFields(newTextFields);
    } else {
      Alert.alert('Invalid Input', 'תכתוב בעברית בבקשה');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Append images to formData
      images.forEach((image, index) => {
        formData.append('findingsPhotos', {
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
          uri: image.uri.startsWith('file://') ? image.uri : `file://${image.uri}`,
        });
      });
  
      // Append findings text to formData as individual strings
      textFields.forEach((field, index) => {
        // Append each text field as a separate entry
        formData.append(`findings[${index}]`, field.text);
      });
  
      const reportId = report._id; // Replace with actual report ID variable
      const updateUrl = `https://shark-server-9cc777312ecd.herokuapp.com/api/reports/findings/${reportId}`;
        const token = await AsyncStorage.getItem('token');
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const responseJson = await response.json();
      console.log(responseJson);
      Alert.alert('הצלחה', 'הדוח עודכן בהצלחה');
      navigation.navigate('AssignedInspections');
    } catch (error) {
      console.error('There was an error submitting the report: ', error);
      Alert.alert('שגיאה', 'הייתה בעיה בעדכון הדוח, אנא נסה שנית');
    }
  };
  
  
  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>דוח ביקור </Text>
      <TouchableOpacity onPress={selectPhotoTapped} style={styles.button}>
        <Text style={styles.buttonText}>הוסף תמונות</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} style={styles.image} source={image} />
        ))}
      </View>
      {textFields.map((field, index) => (
        <View key={index} style={styles.textFieldContainer}>
          <TextInput
            style={styles.textField}
            onChangeText={(text) => updateTextField(index, text)}
            value={field.text}
            placeholder={` תיאור ${index + 1}`}
          />
        
        
        </View>
      ))}
      <TouchableOpacity onPress={addNewTextField} style={styles.button}>
        <Text style={styles.buttonText}>הוסף תיאור</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>שלח דוח</Text>
      </TouchableOpacity>

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
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.85)', // Slightly more opaque for better readability
  },
  title: {
    fontSize: 28, // Slightly larger and more prominent
    fontWeight: 'bold',
    marginBottom: 30, // More space below the title
    color: '#004ba0', // A strong, consistent color for the title
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center images in the view
    marginBottom: 20,
  },
  image: {
    width: 110, // Slightly larger images
    height: 110,
    margin: 5,
    borderRadius: 10, // More pronounced rounded corners
    borderWidth: 1, // Add a border for better definition
    borderColor: '#ddd',
  },
  textFieldContainer: {
    marginBottom: 15,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#cccccc', // Subtler border color
    backgroundColor: '#fff', // Pure white background
    borderRadius: 8, // Consistent rounded corners
    padding: 10, // Comfortable padding
    fontSize: 16, // Readable font size
    color: '#333', // Standard text color for better contrast
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff', // Vibrant blue for primary action
    borderRadius: 8, // Rounded corners
    padding: 12, // Adequate padding
    marginTop: 10, // Space above the button
    marginBottom: 20, // Space below the button
  },
  buttonText: {
    color: 'white', // White text for contrast
    fontSize: 18, // Readable font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Add any additional styles if needed
});

export default InspectionReportScreen;
