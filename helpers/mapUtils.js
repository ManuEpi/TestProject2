/**
 * Initialize map location , it will return a new position
 * @param currentLongitude
 * @param currentLatitude
 * @param onGetLocation
 * @returns {Promise<void>}
 */
export async function initializeMapLocation(currentLongitude, currentLatitude, onGetLocation) {

    navigator.geolocation.getCurrentPosition(
        position => {
            let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            };

            let hasToReloadLocation = false;
            if (region.longitude !== currentLongitude || region.latitude !== currentLatitude) {
                hasToReloadLocation = true
            }

            if (hasToReloadLocation) {
                onGetLocation(region)
            }

        },
        error => console.log(error),
        {
            enableHighAccuracy: false,
            timeout: 20000,
        }
    );
}
