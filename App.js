import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './navigation/Navigation'
import NavigationService from './navigation/NavigationService'
import {StatusBar} from 'expo-status-bar';

function App() {
    return (
        <View>
            <StatusBar translucent backgroundColor="transparent"/>
            <Navigation
                ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}>
            </Navigation>
        </View>
    );
}

export default App;
