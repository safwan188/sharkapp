import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import InspectionsListScreen from '../screens/InspectionsListScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';
import AssignedInspectionsScreen from '../screens/AssignedInspectionsScreen';
import InspectionReportScreen from '../screens/InspectionReportScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Create a stack navigator for use within the drawer
function MainStackNavigator() {
  return (
    <Stack.Navigator options={{}}>
      
      <Stack.Screen name="InspectionsList" component={InspectionsListScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="InspectionDetails" component={InspectionDetailScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="AssignedInspections" component={AssignedInspectionsScreen}  options={{ headerShown: false ,}} />
      <Stack.Screen name="InspectionReport" component={InspectionReportScreen}  options={{ headerShown: false ,}} />
      {/* ... other stack screens */}
    </Stack.Navigator>
  );
}

// Now use the drawer navigator in the AppNavigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* The MainStackNavigator contains the rest of your stack screens */}
      <Drawer.Navigator >
        {/* The drawer  navigator contains the drawer screens */}
        <Drawer.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            headerShown: false,
            drawerItemStyle: { display: 'none' } // This hides the screen from the drawer
          }}
        />
        {/* Hide main stack from the drawer */}
          
        <Drawer.Screen 
          name="InspectionsList" 
          component={InspectionsListScreen}  
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

export default AppNavigator;