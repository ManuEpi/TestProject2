import {Dimensions, Platform, StatusBar} from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * Handling Notch on device and Return Device real height
 * @returns {number}
 */
export function detectHeightByDevice() {
    if (hasNotch()) {
        return screenHeight + StatusBar.currentHeight
    } else {
        return screenHeight
    }
}

// Detect if the device has notch only for Android because IOS handle it automatically
export function hasNotch() {
    return Platform.OS === 'android' && StatusBar.currentHeight > 24
}
