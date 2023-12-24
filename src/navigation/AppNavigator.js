import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component

import { TouchableOpacity } from 'react-native-gesture-handler';

import LoginScreen from '../screens/LoginScreen';
import InspectionsListScreen from '../screens/InspectionsListScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';
import AssignedInspectionsScreen from '../screens/AssignedInspectionsScreen';
import InspectionReportScreen from '../screens/InspectionReportScreen';
import LoginScreen2 from '../screens/Login2';
import InspectionsListScreen2 from '../screens/reportlist2';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Button,Text,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('expertId');
    // Navigate to the Login screen
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error clearing the async storage:', error);
  }
};

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ padding: 40 }}>
        <Button
          title="יציאה"
          onPress={() => logout(props.navigation)}
          icon={<Icon name="logout" size={30} color="#000" />}

        />
      </View>
    </DrawerContentScrollView>
  );
}

const CustomDrawerToggle = ({ navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.toggleDrawer()}
      style={styles.menuButton}
    >
      <Icon name="menu" size={30} color="#000" /> 
    </TouchableOpacity>
  );
};



const Drawer = createDrawerNavigator();



// Now use the drawer navigator in the AppNavigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* The MainStackNavigator contains the rest of your stack screens */}
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          drawerPosition: 'right',
          headerRight: () => <CustomDrawerToggle navigation={navigation} />,
          // Optionally hide the default header left component
          title: 'דוחות פתוחות',
          headerStyle: {
          },
          headerLeft: () => null,
          headerTitleAlign: 'center',

        })}
      >
        {/* The drawer  navigator contains the drawer screens */}
        <Drawer.Screen 
          name="Login" 
          component={LoginScreen2} 
          options={{ 
            headerShown: false,
            drawerItemStyle: { display: 'none' } // This hides the screen from the drawer
          }}
        />
        {/* Hide main stack from the drawer */}
          
        <Drawer.Screen 
          name="InspectionsList" 
          component={InspectionsListScreen2}  
          options={{ 
            
            headerShown: true,
            title: 'דוחות פתוחות',
            headerTransparent: false,
            drawerLabel: 'דוחות פתוחות', // Set drawerLabel to an empty string to hide from the sidebar
          }}
        />
        <Drawer.Screen 
          name="AssignedInspections" 
          component={AssignedInspectionsScreen} 
          options={{ 
            headerShown: true,
            title: 'דוחות שלי',
            headerTransparent: false,
            drawerLabel: 'דוחות שלי', 
          }}
        />
      
        {/* You can add more drawer screens if needed */}
        <Drawer.Screen 
           name="InspectionDetails" 
           component={InspectionDetailScreen} 
           options={{ 
             headerShown: true,
             title: 'פרטי דוח',
             headerTransparent: false,
             drawerItemStyle: { display: 'none' } // This hides the screen from the drawer

           }}
          />
           <Drawer.Screen 
           name="InspectionReport" 
           component={InspectionReportScreen} 
           options={{ 
             headerShown: true,
             title: 'ממצאי בדיקה',
             headerTransparent: false,
             drawerItemStyle: { display: 'none' } // This hides the screen from the drawer

           }}
          />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  menuButton: {
    padding: 5,
    // Add your styling for the button here
  },
  menuText: {
    // Add your styling for the text or icon here
  }
});
export default AppNavigator;