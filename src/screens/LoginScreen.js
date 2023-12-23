import React from 'react';
import { View, StyleSheet, Text, Alert, ImageBackground,KeyboardAvoidingView ,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import apiUser from '../API/apiUsers'; // replace with the path to your apiUser file

import { Dimensions } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLogin = async (username, password) => {
    try {
      const response = await apiUser.LoginUser(username, password);
     await AsyncStorage.setItem('token', response.data.token);
      const name = await AsyncStorage.setItem('name', response.data.name);
      const expertId = await AsyncStorage.setItem('expertId', response.data.expert); 
      Alert.alert( ` ברוך הבא ` +response.data.name);
      navigation.navigate('InspectionsList');
    } catch (error) {
      Alert.alert( 'שגיאה בהתחברות', 'שם משתמש או סיסמא לא נכונים');
      console.error(error);
    }
  };

  return (

    <ImageBackground source={require('../assets/ses.png')} style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
          <View style={styles.screen}>
            <Text style={styles.title}></Text>
            <LoginForm onLogin={handleLogin}  />
          </View>
      </KeyboardAvoidingView>
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
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;