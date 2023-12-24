import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView

} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUser from '../API/apiUsers';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component


const LoginScreen2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const handleLogin = async () => {
    try {
      const response = await apiUser.LoginUser(username, password);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('name', response.data.name);
      await AsyncStorage.setItem('expertId', response.data.expert); 
      Alert.alert(`Welcome ${response.data.name}`);
      navigation.navigate('InspectionsList');
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', 'Please check your username and password');
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    {Platform.OS === 'android' && <StatusBar backgroundColor="transparent" translucent />}
    <ScrollView contentContainerStyle={styles.scrollView}>
  
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <Input
      rightIcon={<Icon name="person" size={24} color="#888" />}
  placeholder="שם משתמש" // Your placeholder in Hebrew or any RTL language
  onChangeText={setUsername}
  containerStyle={styles.input}
  textAlign="right" // Ensures text aligns to the right
  placeholderTextColor="#888" // Optional: to improve placeholder visibility
/>
      <Input
        rightIcon={<Icon name="lock" size={24} color="#888" />}
        placeholder='סיסמה'
        secureTextEntry
        value={password}
        textAlign='right'
        onChangeText={setPassword}
        containerStyle={styles.input}
      />
      <Button
        icon={<Icon name="login" size={24} color="white" />}
        title="התחבר"
        onPress={handleLogin}
        buttonStyle={styles.button}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    marginBottom: 150,
    height: 220,
  },
  logoReduced: {
    width: 150,
    height: 132,
    marginBottom: 20, // Reduced margin
  },
  inputContainer: {
    width: 300,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3366FF',
    width: 300,
  },
});

export default LoginScreen2;
