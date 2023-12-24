import React, { useState } from 'react';
import { View, StyleSheet, Image, Text,Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import apiUser from '../API/apiUsers'; // replace with the path to your apiUser file
import { I18nManager } from 'react-native';
const LoginScreen2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await apiUser.LoginUser(username, password);
      console.log(response.data);
     await AsyncStorage.setItem('token', response.data.token);
      const name = await AsyncStorage.setItem('name', response.data.name);
      const expertId = await AsyncStorage.setItem('expertId', response.data.expert); 
      Alert.alert( ` ברוך הבא ` +response.data.name);
      navigation.navigate('InspectionsList');
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <View style={styles.container}>
      <Image
    source={require('../assets/logo1.png')}
style={styles.logo}
      />
      <Input
        placeholder='Username'
        
        onChangeText={setUsername}
        containerStyle={styles.input}
      />
      <Input
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.input}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Consider using your brand color
  },
  logo: {
    width: 250,
    height: 220,
    marginBottom: 80,
  },
 
  input: {
    flexDirection: 'column-reverse',
    width: 300,
    marginBottom: 10,
},
  button: {
    marginTop: 50,
    marginBottom: 150,
    backgroundColor: '#3366FF', // Consider using your brand color
    width: 300,
  },
});

export default LoginScreen2;