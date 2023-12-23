import React, { useState ,useRef} from 'react';
import { View, TextInput, Text,Button, StyleSheet, Image,TouchableOpacity,KeyboardAvoidingView,Platform ,TouchableWithoutFeedback,Keyboard} from 'react-native';

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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        {/* Logo Image */}
        <Image 
        source={require('../assets/Picture1.png')} // Replace with the path to your logo file
        style={styles.logo}
        resizeMode="contain" // This ensures the logo is scaled properly
      />
         <Text style={styles.text}>תעודה מזהה</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleUsernameChange}
        value={username}
        placeholder="הקלד תעודה מזהה"
        autoCapitalize="none"
        label='תעודה מזהה'
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
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center', // Center items horizontally
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 1,
    margin: 20,
    height: 400,
  },
  logo: {
    width: 160, // Adjusted width
    height: 100, // Adjusted height
    marginBottom: 20,
    marginTop: 20, // Added top margin
    resizeMode: 'contain', // Ensures the logo is scaled properly
  },
  input: {
    width: '80%', // Relative width
    height: 40,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    textAlign: 'right',
    color: '#424242', // A color for secondary text
    marginBottom: 3, // Space between text lines
  },
  button: {
    width: '50%', // Relative width
    height: 40, // Adjusted height for better touch area
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20, // Added top margin for spacing
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center', // Center text and other content in the button
  },
});



export default LoginForm;