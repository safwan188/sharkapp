import React, { useState ,useRef} from 'react';
import { View, TextInput, Text,Button, StyleSheet, Image,TouchableOpacity } from 'react-native';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef();
  const handleUsernameChange = (text) => {
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(filteredText);
  };

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <View style={styles.container}>
        {/* Logo Image */}
        <Image 
        source={require('../assets/Picture1.png')} // Replace with the path to your logo file
        style={styles.logo}
        resizeMode="contain" // This ensures the logo is scaled properly
      />
      <TextInput
        style={styles.input}
        onChangeText={handleUsernameChange}
        value={username}
        placeholder="הקלד תעודה מזהה"
        autoCapitalize="none"
        returnKeyType='next'
        onSubmitEditing={() => passwordInputRef.current.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="הקלד סיסמא"
        textAlign='right'
        secureTextEntry
        returnKeyType='done'
        onSubmitEditing={handleLogin}
      />

 <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{color:'white',textAlign:'center'}}>התחבר</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
   borderColor: 'blue',
   borderWidth: 1,
  },
  logo: {
      
    
    width: 150, // Set the width of your logo
    height: 120, // Set the height of your logo
    marginBottom: 50, // Add some margin below the logo
   
   

  },
  input: {
    width: 150, // Ensure the input stretches to the width of the container
    height: 40,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign:'right',
  },
  button: {
    width: 75, // Ensure the button stretches to the width of the container
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',  },
});



export default LoginForm;