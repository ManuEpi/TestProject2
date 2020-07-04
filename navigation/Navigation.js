import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import HomeScreen from '../modules/home'

import * as Routes from "./Routes"

const MainNavigator = createSwitchNavigator({
    Home: HomeScreen
}, {
    headerMode: 'none',
    initialRouteName: Routes.Home
});

export default createAppContainer(MainNavigator)
