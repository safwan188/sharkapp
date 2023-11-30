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
      <Text style={{color:'black',textAlign:'right',}}> תעודה מזהה </Text>
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
      <Text style={{color:'black',textAlign:'right'}}>תעודה מזהה ו 3 אחרונים בטלפון</Text>
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
        <Text style={{color:'white',textAlign:'center',fontSize:16}}>התחבר</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    backgroundColor: 'rgba(255, 255, 255,1)',
    borderRadius: 15,
   borderColor: 'blue',
   borderWidth: 1,
    padding: 20,
  },
  logo: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 180, // Set the width of your logo
    height:140, // Set the height of your logo
    marginBottom: 30, // Add some margin below the logo
   borderWidth: 0,
   
   
   padding: 20,
   
    
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
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    justifyContent: 'center',  },
});



export default LoginForm;