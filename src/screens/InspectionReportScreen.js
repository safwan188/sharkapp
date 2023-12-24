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

import { Alert,ImageBackground,Dimensions ,Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
  
const InspectionReportScreen = ({ route, navigation }) => {

  const { report } = route.params;
  const [images, setImages] = useState([]);
  const [textFields, setTextFields] = useState([]);
  const removeLastPhoto = () => {
    if (images.length > 1) {
      setImages(images.slice(0, -1));
    }
    else{
      setImages([]);
    }
  };

  const removeLastTextField = () => {
    if (textFields.length > 0) {
      setTextFields(textFields.slice(0, -1));
    }
  };
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
    const hebrewCharRegex = /[\u0590-\u05FF\u0030-\u0039]/; // Regular expression for Hebrew characters and numbers (0-9)2
  
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
          contenttype: 'multipart/form-data', 
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status === 200) {
        // Navigate back or perform other success actions
        navigation.navigate('InspectionsList');
        // Show a success alert
        Alert.alert("הצלחה", "דוח עודכן בהצלחה");
        setImages([]);
        setTextFields([]);
      } else {
        // Show an error alert with the API's response message
        Alert.alert("Error", response.data.message || "There was an issue updating the report.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert('שגיאה', 'הייתה בעיה בעדכון הדוח, אנא נסה שנית');
    }
  };

  return (
    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>דוח ביקור </Text>
  
        {/* Button to Add Photos */}
        <TouchableOpacity onPress={selectPhotoTapped} style={styles.button}>
          <Text 
           style={styles.buttonText}>הוסף תמונות </Text>
            <Icon name="add-a-photo" size={24} color="white" />

        </TouchableOpacity>
  
        {/* Display Photos */}
        <View style={styles.imageContainer}>
  {images.map((image, index) => {
    // Check if the image URI is valid before rendering
    if (image && image.uri) {
      return (
        <Image key={index} style={styles.image} source={image} />
      );
    }
    return null; // Return null if the image URI is not valid
  })}
</View>
        {/* Button to Remove Last Photo */}
        {images.length >= 1 && (
          <TouchableOpacity onPress={removeLastPhoto} style={styles.buttonremove}>
            <Text style={styles.buttonText}>הסר תמונה אחרונה </Text>
            <Icon name="delete" size={24} color="white" />
          </TouchableOpacity>
        )}
  
        {/* Display Text Fields */}
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
  
        {/* Button to Add New Text Field */}
        <TouchableOpacity onPress={addNewTextField} style={styles.button} >
          <Text style={styles.buttonText}>הוסף תיאור</Text>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
  
        {/* Button to Remove Last Text Field */}
        {textFields.length >= 1 && (
          <TouchableOpacity onPress={removeLastTextField} style={styles.buttonremove}>
            <Text style={styles.buttonText}>הסר תיאור אחרון</Text>
            <Icon name="delete" size={24} color="white" />
          </TouchableOpacity>
        )}
  
        {/* Button to Submit Report */}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>שלח דוח</Text>
          <Icon name="send" size={24} color="white" />
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
    flexDirection: 'row',
    backgroundColor: '#007bff', // Vibrant blue for primary action
    borderRadius: 15, // Rounded corners
    padding: 12, // Adequate padding
    marginTop: 10, // Space above the button
    marginBottom: 20, // Space below the 
    marginHorizontal: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    
  },
  buttonText: {
    color: 'white', // White text for contrast
    fontSize: 18, // Readable font size
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  buttonremove: {
    flexDirection: 'row',
    backgroundColor: 'red', // Vibrant blue for primary action
    borderRadius: 8, // Rounded corners
    padding: 12, // Adequate padding
    marginTop: 20, // Space above the button
    marginBottom: 20, // Space below the button
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  // Add any additional styles if needed
});

export default InspectionReportScreen;
